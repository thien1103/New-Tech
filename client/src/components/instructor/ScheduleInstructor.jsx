import {
    Modal,
    Button,
    Form,
    Input,
    Table,
    Select,
} from "antd";
const { Option } = Select;
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ScheduleInstructor = (props) => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);// State for controlling modal visibility
    const { bg } = props;
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const handleSearch = async (values) => {
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                // Kiểm tra xem thuộc tính có bằng undefined không
                if (values[key] === undefined) {
                    // Gán thuộc tính bằng ""
                    values[key] = "";
                }
            }
        }
        setSearchParams(values);
    };
    const openEditModal = () => {
        setIsEditModalVisible(true);
    };

    const closeEditModal = () => {
        setIsEditModalVisible(false);
    };

    const openDanhSachModal = () => {
        setIsSelectModalVisible(true);
    };

    const closeDanhSachModal = () => {
        setIsSelectModalVisible(false);
    };

    const handleReset = () => {
        // Reset logic
    };

    const handleEdit = (record) => {
        // Perform any necessary logic for editing the record
        console.log('Edit clicked for record:', record);

        // Show the edit modal
        setSelectedRecord(record);
        openEditModal();
    };

    const handleSelect = (record) => {
        // Perform any necessary logic for selecting the GVPB
        console.log('Select GVPB clicked for record:', record);

        // Show the select modal
        setSelectedRecord(record);
        openEditModal();
    };

    const data1 = [
        {
            thesisID: "",
            thesisName: "",
            userName: "",
            instructorName: "",
            specialization: "",
        },
        {
            thesisID: "",
            thesisName: "",
            userName: "",
            instructorName: "",
            specialization: "",
        },
        {
            thesisID: "",
            thesisName: "",
            userName: "",
            instructorName: "",
            specialization: "",
        },
    ];
    const columns1 = [
        {
            title: "ID",
            dataIndex: "thesisID",
            key: "thesisID",
            align: "center",
        },
        {
            title: "Tên đề tài",
            dataIndex: "thesisName",
            key: "thesisName",
            align: "center",
        },
        {
            title: "Nhóm sinh viên",
            dataIndex: "userName",
            key: "userName",
            align: "center",
        },
        {
            title: "GVHD",
            dataIndex: "instructorName",
            key: "instructorName",
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
                        <Button className="mr-2" type="default" onClick={() => handleSelect(record)}>
                            Chọn GVPB
                        </Button>
                    </div>
                );
            },
        },

    ];
    const data2 = [
        {
            thesisID: "",
            thesisName: "",
            userName: "",
            instructorName: "",
            specialization: "",
            gvpb: "Nguyen Van A",
        },
        {
            thesisID: "",
            thesisName: "",
            userName: "",
            instructorName: "",
            specialization: "",
            gvpb: "Nguyen Van B",
        },
        {
            thesisID: "",
            thesisName: "",
            userName: "",
            instructorName: "",
            specialization: "",
            gvpb: "Nguyen Van C",
        },
    ];
    const columns2 = [
        {
            title: "ID",
            dataIndex: "thesisID",
            key: "thesisID",
            align: "center",
        },
        {
            title: "Tên đề tài",
            dataIndex: "thesisName",
            key: "thesisName",
            align: "center",
        },
        {
            title: "Nhóm sinh viên",
            dataIndex: "userName",
            key: "userName",
            align: "center",
        },
        {
            title: "GVHD",
            dataIndex: "instructorName",
            key: "instructorName",
            align: "center",
        },
        {
            title: "Chuyên ngành",
            dataIndex: "specialization",
            key: "specialization",
            align: "center",
        },
        {
            title: 'GVPB',
            dataIndex: 'gvpb',
            key: 'gvpb',
            align: 'center',
            render: (text, record) => (
                <span>
                    {text}
                    <Button type="default" className="ml-4" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                </span>
            ),
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
            <div className=" mb-2 pb-2 border-b-[1px] border-black border-solid">
                <Form layout="inline" onFinish={handleSearch} form={form}>
                    <Form.Item label="Thesis name" name="thesisName">
                        <Input defaultValue={searchParams.get("thesisName")}></Input>
                    </Form.Item>
                    <Form.Item label="Thesis ID" name="thesisID">
                        <Input defaultValue={searchParams.get("thesisID")}></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">Search</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className=" bg-red-600 text-white hover:!text-white hover:!border-none"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
                <div className="mt-5 mb-5 text-xl font-bold">Danh sách các đề tài đã được duyệt</div>
            </div>
            <div className="">
                <Table dataSource={data1} columns={columns1} bordered></Table>
                <Button
                    className="justify-center align-center flex bg-green-700 text-white hover:!text-white hover:!border-none max-w-max"
                    onClick={openDanhSachModal}
                >
                    <span>
                        Danh sách đề tài đã phân GVPB
                    </span>
                </Button>
            </div>

            {/* Select Modal */}
            <Modal
                title="Danh sách đề tài đã được phân GVPB"
                visible={isSelectModalVisible}
                onCancel={closeDanhSachModal}
                footer={null}
                width={1000}
                style={{
                    position: "relative",
                    top: 50,
                }}
            >
                {selectedRecord ? (
                    <div className="overflow-x-auto mt-10">
                        <Table dataSource={data2} columns={columns2} bordered />
                    </div>
                ) : (
                    <div>No record selected</div>
                )}
            </Modal>

            {/* Edit Modal */}
            <Modal
                title="Phân Công Giảng Viên Phản Biện Cho Đề Tài"
                visible={isEditModalVisible}
                onCancel={closeEditModal}
                footer={null}
                width={500}
                bodyStyle={{ height: '300px', overflow: 'auto' }}
                style={{
                    position: "relative",
                    top: 50,

                }}
            >
                <div>
                    <Form className="mt-10">
                        <Form.Item>
                            <span>Chọn Giảng Viên:</span>
                            <Select defaultValue="" className="mt-1">
                                <Option value="nguyenVanA">Nguyen Van A</Option>
                                <Option value="nguyenVanB">Nguyen Van B</Option>
                                <Option value="nguyenVanC">Nguyen Van C</Option>
                            </Select>
                            <Button
                                className="justify-center align-center flex bg-green-700 text-white hover:!text-white hover:!border-none max-w-max top-40 left-40 relative"
                                onClick={() => {}}
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
