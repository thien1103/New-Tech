import { Button, Form, Input, Table, Modal } from "antd";
import {  useSearchParams } from "react-router-dom";
import { PlusCircleOutlined} from "@ant-design/icons"; 
import CreateCouncil from "../../pages/admin/other/CreateCouncil";
import  { useState } from 'react';

const CourseManagement = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // State for controlling modal visibility
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
  const handleReset = () => {
    setSearchParams({});
    form.resetFields();
  };
  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const data = [
    {
      key: "",
      thesisName: "",
      //productImage:
      //  "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg", 
      studentID: "",
      instructorID: "35501677",
      councilID: "1",
      registerDate: "07/05/2002",
      deadline: "02/02/2023",
      status: 1,
      description: "Project DASA",
    },
  
  ];
  const columns = [
  
    {
      title: "ID",
      dataIndex: "userAccountID",
      key: "userAccountID",
      align: "center",
    },
    {
      title: "Niên khóa",
      dataIndex: "userFullName",
      key: "userFullName",
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
          <Form.Item label="Niên khóa" name="course">
            <Input defaultValue={searchParams.get("course")}></Input>
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
        ></Table>
      </div>
      <Button
        className="justify-center align-center flex bg-green-700 text-white hover:!text-white hover:!border-none max-w-max"
        onClick={openModal}
      >
        <span>
          <PlusCircleOutlined /> &ensp; Thêm Niên Khóa
        </span>
      </Button>

      {/* Modal for the CreateCouncil component */}
      <Modal
                title="Thêm Niên Khóa"
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
                    <Form className="mt-10">
                        <Form.Item>
                            <Input/>
                            
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

export default CourseManagement;
