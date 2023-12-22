import { Modal, Button, Form, Input, Table, Select, message, Popconfirm  } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
const { Option } = Select;

const InstructorAccount = (props) => {
  const { bg } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [selectSpecializations, setSelectSpecializations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [editInstructor, setEditInstructor] = useState({});
  const [selectedRowForDeletion, setSelectedRowForDeletion] = useState(null);


  //Modal Edit
  const openModalEdit = () => {
    setIsModalEditVisible(true);
  };

  const closeModalEdit = () => {
    setIsModalEditVisible(false);
    setLoading(false);
    setEditInstructor({}); // Reset editInstructor state
  };

  
  const handleEdit = (record) => {
    setEditInstructor(record);
    openModalEdit();
  };


  //Modal add
  const openModalAdd = () => {
    setIsModalAddVisible(true);
  };

  const closeModalAdd = () => {
    setIsModalAddVisible(false);
  };
  const handleAdd = () => {
    // Show the add modal
    openModalAdd();
  };

  const handleFormEdit = async () => {
    try {
      const values = form.getFieldValue();
      console.log("Data to be sent:", values);
      setLoading(true);
  
      const response = await axios.put(
        `http://localhost:8000/managers/putinstructors/update/${editInstructor._id}`,
        values
      );
  
      if (response.status === 200) {
        setLoading(false);
        closeModalEdit();
        message.success("Instructor updated successfully");
        fetchData();
      } else {
        message.error("Failed to update instructor");
      }
    } catch (error) {
      console.error("Error in updating Instructor:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Backend error message:", error.response.data.message);
      }
      message.error("Failed to update instructor");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      console.log("Data to be sent:", values);
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/managers/postinstructors/create",
        values
      );

      if (response.status === 201) {
        setLoading(false);
        closeModalAdd();
        message.success("Instructor created successfully");
        fetchData();
      } else {
        message.error("Failed to create instructor");
      }
    } catch (error) {
      console.error("Error in creating Instructor:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Backend error message:", error.response.data.message);
      }
      message.error("Failed to create instructor");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/managers/getallinstructors");
      const instructors = response.data.instructors;
      const updatedData = [];

      for (const instructorData of instructors) {
        const specializationId = instructorData.specialization;
        try {
          const specializationResponse = await axios.get(`http://localhost:8000/instructors/getSpecializationById/${specializationId}`);
          const specializationData = specializationResponse.data;
          const updatedInstructorData = {
            ...instructorData,
            specialization: specializationData.specializationName,
          };
          updatedData.push(updatedInstructorData);
        } catch (error) {
          console.error(error);
        }
      }

      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };


  const fetchDataSpecialization = async () => {
    try {
      const response = await axios.get("http://localhost:8000/managers/getAllSpecializations");
      const specializationData = response.data.specialization;
      setSelectSpecializations(specializationData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataSpecialization();
  }, []);

  const handleDelete = async (record) => {
    try {
      setSelectedRowForDeletion(record);  
      const response = await axios.delete(
        `http://localhost:8000/managers/deleteInstructor/delete/${record.instructorID}`
      );
  
      if (response.status === 200) {
        setLoading(false);
        message.success("Instructor deleted successfully");
        fetchData();
      } else {
        message.error("Failed to delete instructor");
      }
    } catch (error) {
      console.error("Error in deleting instructor:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Backend error message:", error.response.data.message);
      }
      message.error("Failed to delete instructor");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    // Your columns configuration (ID, Fullname, Email, Phone, Specialization, Password, Action)
    // Modify these columns to match the structure of the fetched instructor data
    {
      title: "ID",
      dataIndex: "instructorID",
      key: "instructorID",
      align: "center",
    },
    {
      title: "Fullname",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
      align: "center",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      align: "center",
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
            <Button className="mr-2" type="default" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this instructor?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="default" danger>
                Delete
              </Button>
            </Popconfirm>
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
        <Table dataSource={data} columns={columns} bordered rowKey="instructorID" />
        <Button
          className="justify-center align-center flex bg-green-700 text-white hover:!text-white hover:!border-none max-w-max"
          onClick={() => handleAdd()}
        >
          <span>
            <UserAddOutlined /> &ensp; Thêm giảng viên
          </span>
        </Button>

      </div>
      <Modal
        title="Thêm Giảng Viên"
        visible={isModalAddVisible}
        onCancel={closeModalAdd}
        footer={null}
        width={500}
        bodyStyle={{ height: '500px', overflow: 'auto' }}
        style={{
          position: "relative",
          top: 50,

        }}
      >
        <div>
          <Form className="mt-10" form={form} onFinish={handleFormSubmit}>
            <Form.Item name="instructorID" label="Instructor ID">
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Instructor Name">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item name="specializationId" label="Specialization">
              <Select defaultValue="" className="mt-1">
                {selectSpecializations.map((specialization) => (
                  <Option key={specialization._id} value={specialization._id}>
                    {specialization.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input.Password />
            </Form.Item>
            <Button
              className="justify-center align-center flex bg-green-700 text-white hover:!text-white hover:!border-none max-w-max top-6 relative"
              onClick={() => handleFormSubmit()}
              loading={loading}
            >
              <span>
                Xác nhận
              </span>
            </Button>
          </Form>
        </div>
      </Modal>

      <Modal
        title="Edit Giảng Viên"
        visible={isModalEditVisible}
        onCancel={closeModalEdit}
        footer={null}
        width={500}
        bodyStyle={{ height: '500px', overflow: 'auto' }}
        style={{
          position: "relative",
          top: 50,
        }}
      >
        <div>
          <Form className="mt-10" form={form} onFinish={handleFormEdit}>
            <Form.Item name="instructorID" label="Instructor ID">
              <Input value={editInstructor.instructorID} readOnly /> <div/>
            </Form.Item>
            <Form.Item name="name" label="Instructor Name">
              <Input defaultValue={editInstructor.name} />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input defaultValue={editInstructor.email} />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input defaultValue={editInstructor.phone} />
            </Form.Item>
            <Form.Item name="specializationId" label="Specialization">
              <Select defaultValue={editInstructor.specialization} className="mt-1">
                {selectSpecializations.map((specialization) => (
                  <Option key={specialization._id} value={specialization._id}>
                    {specialization.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input.Password defaultValue={editInstructor.password} />
            </Form.Item>
            <Button
              className="justify-center align-center flex bg-green-700 text-white hover:!text-white hover:!border-none max-w-max top-6 relative"
              onClick={() => handleFormEdit()}
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

export default InstructorAccount;
