import {
  Modal,
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Table,
} from "antd";
import { EyeOutlined, FileAddOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const ThesisManagement = (props) => {
  const { bg } = props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [selectSpecializations, setSelectSpecializations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Selectnstructor, setSelectnstructor] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const getalldissertations = await axios.get(
        "http://localhost:8000/managers/getalldissertations"
      );

      const updatedData = await Promise.all(
        getalldissertations.data.dissertation.map(async (item, index) => {
          const instructor = await fetchInstructorName(item.InstructorID);
          const assignedInstructorIDs = item.defenseReview.map(
            (review) => review.assignedInstructorID
          );

         
          const assignedInstructors = await fetchAssignedInstructorName(
            assignedInstructorIDs
          );
          const specialization = await fetchSpecializationName(
            item.specializationID[0] // Assuming there's only one specialization ID
          );

          return {
            key: index,
            thesisID: item.dissertationID,
            thesisName: item.Name,  
            time: "15 weeks",
            instructor: instructor.instructorName || "",
            assignedInstructors: assignedInstructors || [],
            specialization: specialization.specializationName || "",
            
            instructorId: item.InstructorID || "",
            dissertationId: item._id || "",
          };
        })
      );

      setData(updatedData);
    } catch (error) {
      console.error(error);
      console.log(data);
    }
  };

  const fetchInstructorName = async (InstructorID) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/managers/getInstructorNameById/${InstructorID}`
      );
      console.log(response.data); // Log the data received from the API
      return response.data || {};
    } catch (error) {
      console.error(error);
      return {};
    }
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

  const fetchAssignedInstructorName = async (assignedInstructorIDs) => {
    try {
      const instructorNames = await Promise.all(
        assignedInstructorIDs.map(async (id) => {
          const response = await axios.get(
            `http://localhost:8000/managers/getInstructorNameById/${id}`
          );
          return response.data.instructorName || "";
        })
      );
      return instructorNames;
    } catch (error) {
      console.error(error);
      return [];
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
    fetchSpecializationName();
  }, []);

  const handleFormSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      console.log("Data to be sent:", values);
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/managers/postDissertation/create",
        values
      );

      if (response.status === 201) {
        setLoading(false);
        closeModal();
        message.success("Dissertation created successfully");
        fetchData();
      } else {
        message.error("Failed to create Dissertation");
      }
    } catch (error) {
      console.error("Error in creating Dissertation:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Backend error message:", error.response.data.message);
      }
      message.error("Failed to create Dissertation");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchDataSpecialization = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/managers/getAllSpecializations"
      );
      const specializationData = response.data.specialization;
      setSelectSpecializations(specializationData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataSpecialization();
  }, []);

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

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleAdd = () => {
    // Show the edit modal
    openModal();
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleReset = () => {
    setSearchParams({});
    form.resetFields();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "thesisID",
      key: "thesisID",
      align: "center",
    },
    {
      title: "Thesis Name",
      dataIndex: "thesisName",
      key: "thesisName",
      align: "center",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "center",
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor",
      key: "instructor",
      align: "center",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
      align: "center",
    },
    {
      title: "Assigned Instructor",
      dataIndex: "assignedInstructors",
      key: "assignedInstructors",
      align: "center",
      render: (assignedInstructors) => (
        <ul>
          {assignedInstructors.map((instructor, index) => (
            <li key={index}>{instructor}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 100,
      render: (_, record) => {
        return (
          <div className="flex justify-center">
            <Button className="mr-2" type="default" onClick={() => {}}>
              Edit
            </Button>
            <Button type="default" danger onClick={() => {}}>
              Delete
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
      <div className=" mb-2 pb-2 border-b-[1px] border-black border-solid">
        <Form layout="inline" onFinish={handleSearch} form={form}>
          <Form.Item label="Tên đề tài" name="thesisName">
            <Input defaultValue={searchParams.get("thesisName")}></Input>
          </Form.Item>
          <Form.Item label="ID" name="email">
            <Input defaultValue={searchParams.get("ID")}></Input>
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
      </div>
      <div className="">
        <Table
          dataSource={data}
          columns={columns}
          bordered
          rowKey="thesisID"
        ></Table>
        <Button
          className="justify-center align-center flex bg-green-700 text-white hover:!text-white hover:!border-none max-w-max"
          onClick={() => handleAdd()}
        >
          <span>
            <FileAddOutlined /> &ensp; Thêm đề tài
          </span>
        </Button>
      </div>
      <Modal
        title="Thêm Đề Tài"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width={500}
        bodyStyle={{ height: "300px", overflow: "auto" }}
        style={{
          position: "relative",
          top: 50,
        }}
      >
        <div>
          <Form className="mt-10" form={form} onFinish={handleFormSubmit}>
            <span>Dissertation ID</span>
            <Form.Item name="dissertationID" >
              <Input />
            </Form.Item>
            <span>Dissertation Name</span>
            <Form.Item name="Name" >
              <Input />
            </Form.Item>
            <span>Description</span>
            <Form.Item name="Description" >
              <Input />
            </Form.Item>
            <span>Thời gian thực hiện </span>
            <Form.Item name="Time" >
              <Input />
            </Form.Item>
            <span>Instructor</span>
            <Form.Item name="instructorId" >
              <Select defaultValue="" className="mt-1">
                {Selectnstructor.map((instructors) => (
                  <Option
                    key={instructors._id}
                    value={instructors._id}
                  >
                    {instructors.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span>Chọn chuyên ngành</span>
            <Form.Item name="specializationId">
              <Select defaultValue="" className="mt-1">
                {selectSpecializations.map((specialization) => (
                  <Option key={specialization._id} value={specialization._id}>
                    {specialization.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Button
              className="justify-center align-center flex bg-green-700 text-white hover:!  text-white hover:!border-none max-w-max top-6   left-40 relative"
              onClick={() => handleFormSubmit()}
              loading={loading}
            >
              <span>Xác nhận</span>
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ThesisManagement;
