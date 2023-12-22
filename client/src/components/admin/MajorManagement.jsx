import { Button, Form,message, Input, Table, Modal,Popconfirm } from "antd";
import {  useSearchParams } from "react-router-dom";
import {PlusCircleOutlined} from "@ant-design/icons"; 

import  { useState,useEffect } from 'react';
import axios from "axios";

const MajorManagement = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // State for controlling modal visibility
  const { bg } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [editspecialization, setEditSpecialization] = useState({});
  const [selectedRowForDeletion, setSelectedRowForDeletion] = useState(null);
  

   //Modal Edit
   const openModalEdit = () => {
    setIsModalEditVisible(true);
  };

  const closeModalEdit = () => {
    setIsModalEditVisible(false);
    setLoading(false);
    setEditSpecialization({}); // Reset editInstructor state
  };

  
  const handleEdit = (record) => {
    setEditSpecialization(record);
    openModalEdit();
  };
  

  
 
  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleDelete = async (record) => {
    try {
      setSelectedRowForDeletion(record);  
      const response = await axios.delete(
        `http://localhost:8000/managers/delete-specialization/${record._id}`
      );
  
      if (response.status === 200) {
        setLoading(false);
        message.success("specialization deleted successfully");
        fetchData();
      } else {
        message.error("Failed to delete specialization");
      }
    } catch (error) {
      console.error("Error in deleting specialization:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Backend error message:", error.response.data.message);
      }
      message.error("Failed to delete specialization");
    } finally {
      setLoading(false);
    }
  };
  const handleFormEdit = async () => {
    try {
      const values = form.getFieldsValue();
      console.log("Data to be sent:", values);
      setLoading(true);
  
      const response = await axios.put(
        `http://localhost:8000/managers/edit-specialization/${editspecialization._id}`,
        values
      );
  
      if (response.status === 200) {
        setLoading(false);
        closeModalEdit();
        message.success("specialization updated successfully");
        fetchData();
      } else {
        message.error("Failed to update specialization");
      }
    } catch (error) {
      console.error("Error in updating specialization:", error);
      if (
        error.response &&
        error.response.data &&
        console.log(data),
        error.response.data.message
      ) {
        console.error("Backend error message:", error.response.data.message);
      }
      message.error("Failed to update specialization");
    } finally {
      setLoading(false);
    }
  };
  const handleFormSubmit = async () => {
    try {
      const values = await form.getFieldsValue();
      console.log("Data to be sent:", values);
      setLoading(true);
  
      const response = await axios.post(
        "http://localhost:8000/managers/add-specialization",
        values
      );
  
      if (response.status === 201) {
        setLoading(false);
        closeModal();
        message.success("specialization created successfully");
        fetchData();
      } else {
        message.error("Failed to create specialization");
      }
    } catch (error) {
      console.error("Error in creating specialization:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Backend error message:", error.response.data.message);
      }
      message.error("Failed to create specialization");
    } finally {
      setLoading(false);
    }
  };
      useEffect(() => {
        fetchData();
      }, []);
  
  
  
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8000/managers/getAllSpecializations/");
          const specializations = response.data.specialization;
      
          const updatedData = specializations.map(specializationData => {
            const {  ...rest } = specializationData;
            return { ...rest };
          });
      
          setData(updatedData);
        } catch (error) {
          console.error(error);
        }
      };

      
  
  
  const columns = [
    {
      title: "Chuyên ngành",
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
              title="Are you sure you want to delete this specialization?"
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
        <Table
          dataSource={data}
          columns={columns}
          bordered
        ></Table>
      </div>
      <Button
        className="justify-center align-center flex bg-green-700 text-white hover:!text-white hover:!border-none max-w-max"
        onClick={openModal}
      >
        <span>
          <PlusCircleOutlined /> &ensp; Thêm Chuyên Ngành
        </span>
      </Button>

      {/* Modal for the CreateCouncil component */}
      <Modal
                title="Thêm Chuyên Ngành"
                visible={isModalVisible}
                onCancel={closeModal}
                footer={null}
                width={500}
                bodyStyle={{ height: '300px', overflow: 'auto' }}
                style={{
                    position: "relative",
                    top: 50,

                }}
            >
                <div>
                    <Form Form className="mt-10" form={form} onFinish={handleFormSubmit}>
                     <span>Specialization Name</span>   
                    <Form.Item name="name" >
                    <Input />
                    </Form.Item>
                    <span>Description Specialization</span>   
                    <Form.Item name="description" >
                      <Input />
                    </Form.Item>

                            <Button
                                className="justify-center align-center flex bg-green-700 text-white hover:!text-white hover:!border-none max-w-max top-10 left-40 relative"
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
        title="Edit Chuyên nghành"
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
          <span>Specialization Name</span>  
            <Form.Item name="name" >
              <input value={editspecialization.name} readOnly/> 
            </Form.Item>
            <span>description Specialization</span>  
            <Form.Item name="description">
              <Input defaultValue={editspecialization.description} />
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

export default MajorManagement;
