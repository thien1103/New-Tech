import {
    Modal,
    Button,
    Form,
    message,
    Table,
    Select,
} from "antd";
const { Option } = Select;
import { useState, useEffect } from "react";
import axios from "axios";


const ScheduleInstructor = (props) => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const { bg } = props;
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [Selectnstructor, setSelectnstructor] = useState([]);
    const [selectedInstructors, setSelectedInstructors] = useState([]);
    const [selectedDissertationId, setSelectedDissertationId] = useState(null); // State to hold the selected dissertation ID





    const fetchInstructorName = async (InstructorID) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/students/getInstructorNameById/${InstructorID}`
            );
            return response.data || {}; // Return the object directly
        } catch (error) {
            console.error(error);
            return {};
        }
    };

    const fetchSpecializationName = async (specializationId) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/instructors/getSpecializationById/${specializationId}`
            );
            return response.data || {}; // Return the object directly
        } catch (error) {
            console.error(error);
            return {};
        }
    };



    useEffect(() => {
        fetchDataDissertation();
    }, []);

    const fetchDataDissertation = async () => {
        try {
            const availableDissertationsResponse = await axios.get(
                "http://localhost:8000/students/student/available-dissertations"
            );

            const updatedData = await Promise.all(
                availableDissertationsResponse.data.map(async (item, index) => {
                    const instructor = await fetchInstructorName(item.InstructorID);
                    const specialization = await fetchSpecializationName(
                        item.specializationID
                    );
                    return {
                        key: index,
                        dissertationId: item._id || "", // Placeholder for dissertation ID
                        dissertationID: item.dissertationID || "",
                        name: item.Name || "",
                        instructor: instructor.instructorName || "",
                        specialization: specialization.specializationName || "",

                    };

                })

            );

            setData(updatedData);
        } catch (error) {
            console.error(error);
        }
    };
    const openEditModal = (record) => { // Receive the record when the button is clicked
        setSelectedDissertationId(record.dissertationId); // Set the selected dissertation ID
        setIsEditModalVisible(true);
    };

    const closeEditModal = () => {
        setIsEditModalVisible(false);
    };

    const fetchAllInstructor = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/instructors/getallinstructors`
            );
            const instructorDatas = response.data.instructors;
            setSelectnstructor(instructorDatas);
        } catch (error) {
            console.error(error);
            return {};
        }
    };
    useEffect(() => {
        fetchAllInstructor();
    }, []);

    const handleConfirmation = async () => {
        try {
            // Ensure selectedInstructors is not empty and contains valid IDs
            if (selectedInstructors.length === 0 || selectedInstructors.includes("")) {
                console.error('No valid instructors selected.');
                return;
            }
    
            const instructorIds = selectedInstructors.filter(id => id !== ""); // Filter out empty strings if any
    
            const dissertationId = selectedDissertationId;
    
            console.log('Dissertation ID:', dissertationId);
            console.log('Instructor IDs:', instructorIds);
    
            const response = await axios.post(`http://localhost:8000/instructors/assign-reviewers/${dissertationId}/${JSON.stringify(instructorIds)}`);
    
            if (response.status === 200) {
                console.log('Assigned reviewers successfully!');
                message.success('Assigned reviewers successfully!');
                closeEditModal();
            } else {
                console.error('Failed to assign reviewers.');
            }
        } catch (error) {
            console.error("Error in creating Dissertation:", error);
            message.error('Assigned reviewers failed!');
        }
    };
    


    const columns = [
        {

            dataIndex: "dissertationId",
            key: "dissertationId",
            align: "center",
            render: () => null, // Render function that returns null, effectively hiding the content

        },
        {
            title: "ID",
            dataIndex: "dissertationID",
            key: "dissertationID",
            align: "center",
        },
        {
            title: "Tên đề tài",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            align: "center",
        },
        {
            title: "GVHD",
            dataIndex: "instructor",
            key: "instructor",
            align: "center",
        },
        {
            title: "Chuyên ngành",
            dataIndex: "specialization",
            key: "specialization",
            align: "center",
        },
        {
            title: "Đăng kí",
            dataIndex: "register",
            key: "register",
            align: "center",
            width: 100,
            render: (_, record) => {

                return (
                    <div className="flex justify-center">
                        <Button className="mr-2" type="default" onClick={() => openEditModal(record)}>
                            Chọn GVPB
                        </Button>
                    </div>
                );
            },
        },

    ];


    return (
        <div
            className="flex flex-col"
            style={{
                padding: 24,
                minHeight: 360,
                background: bg,
            }}
        >
            <div className="">
                <Table dataSource={data} columns={columns} bordered></Table>
            </div>

            <Modal
                title="Phân Công Giảng Viên Phản Biện Cho Đề Tài"
                visible={isEditModalVisible}
                onCancel={closeEditModal}
                footer={null}
                width={500}
                bodyStyle={{ height: '420px', overflow: 'auto' }}
                style={{
                    position: "relative",
                    top: 50,
                }}
            >
                <div>
                    <Form className="mt-10">
                        <Form.Item>
                            <div className="mt-5">Chọn Giảng Viên1:</div>
                            <Select
                                defaultValue=""
                                className="mt-5"
                                onChange={(value) => {
                                    // Update selected instructors
                                    setSelectedInstructors((prevSelected) => [...prevSelected, value]);
                                }}
                            >
                                {Selectnstructor.map((instructor) => (
                                    <Option key={instructor._id} value={instructor._id}>
                                        {instructor.name}
                                    </Option>
                                ))}
                            </Select>

                            <div className="mt-5">Chọn Giảng Viên2:</div>
                            <Select
                                defaultValue=""
                                className="mt-5"
                                onChange={(value) => {
                                    // Update selected instructors
                                    setSelectedInstructors((prevSelected) => [...prevSelected, value]);
                                }}
                            >
                                {Selectnstructor.map((instructor) => (
                                    <Option key={instructor._id} value={instructor._id}>
                                        {instructor.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mt-5">Chọn Giảng Viên3:</div>
                            <Select
                                defaultValue=""
                                className="mt-5"
                                onChange={(value) => {
                                    // Update selected instructors
                                    setSelectedInstructors((prevSelected) => [...prevSelected, value]);
                                }}
                            >
                                {Selectnstructor.map((instructor) => (
                                    <Option key={instructor._id} value={instructor._id}>
                                        {instructor.name}
                                    </Option>
                                ))}
                            </Select>
                            <Button
                                className="justify-center align-center flex bg-green-700 text-white hover:!text-white hover:!border-none max-w-max top-4 left-40 relative"
                                onClick={handleConfirmation}
                            >
                                <span>
                                    Xác nhận
                                </span>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default ScheduleInstructor;
