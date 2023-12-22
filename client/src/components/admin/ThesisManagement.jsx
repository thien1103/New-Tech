import {
  Modal,
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Table,

} from "antd";
import { EyeOutlined, FileAddOutlined,  } from "@ant-design/icons";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const { Option } = Select;
const DescriptionItem = ({ title, content }) => (
  <div className=" mb-[7px] text-[14px] leading-[1.5715] ">
    <p className=" inline-block mr-[8px]">{title}:</p>
    {content}
  </div>
);
const ThesisManagement = (props) => {
  const { bg } = props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
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
  const data = [
    {
      ID: " ",
      thesisName: "",
      specialization: "",
      time: "",
    },
    {
      ID: " ",
      thesisName: "",
      specialization: "",
      time: "",
    },
    
  ];
  const columns = [
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
      title: "Chuyên ngành",
      dataIndex: "major",
      key: "major",
      align: "center",
    },
    {
      title: "GVHD",
      dataIndex: "gvhd",
      key: "gvhd",
      align: "center",
    },
    {
      title: "Thời gian thực hiện",
      dataIndex: "time",
      key: "time",
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
        <Table dataSource={data} columns={columns} bordered></Table>
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
                bodyStyle={{ height: '300px', overflow: 'auto' }}
                style={{
                    position: "relative",
                    top: 50,

                }}
            >
                <div>
                    <Form className="mt-10">
                        <Form.Item>
                            <span>Tên đề tài</span>
                            <Input/>
                            <span>Mô tả</span>
                            <Input/>
                            <span>Chọn giáo viên hướng dẫn</span>
                            <Select defaultValue="" className="mt-1">
                                <Option value="nguyenVanA">Nguyen Van A</Option>
                                <Option value="nguyenVanB">Nguyen Van B</Option>
                                <Option value="nguyenVanC">Nguyen Van C</Option>
                            </Select>
                            <span>Chọn chuyên ngành</span>
                            <Select defaultValue="" className="mt-1">
                                <Option value="nguyenVanA">Nguyen Van A</Option>
                                <Option value="nguyenVanB">Nguyen Van B</Option>
                                <Option value="nguyenVanC">Nguyen Van C</Option>
                            </Select>
                            <span>Thời gian thực hiện</span>
                            <Input/>
                            <Button
                                className="justify-center align-center flex bg-green-700 text-white hover:!  text-white hover:!border-none max-w-max top-40 left-40 relative"
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

export default ThesisManagement;
