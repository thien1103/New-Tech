import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Table,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const DescriptionItem = ({ title, content }) => (
  <div className=" mb-[7px] text-[14px] leading-[1.5715] ">
    <p className=" inline-block mr-[8px]">{title}:</p>
    {content}
  </div>
);
const SelectThesis = (props) => {
  const { bg } = props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
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
  const data = [
    {
      thesisID: "1",
      thesisName: "Rắn Săn Mồi AI Game",
      time: "15 weeks",
      userName: "Nguyễn Văn A",
      specialization: "Artificial Intelligence",
    },
    {
      thesisID: "2",
      thesisName: "Xây dựng trang web bán hàng thông minh",
      time: "15 weeks",
      userName: "Lê Thị B",
      specialization: "Software Technology",
    },
    {
      thesisID: "3",
      thesisName: "Kết nối mạng lưới Internet nội bộ",
      time: "15 weeks",
      userName: "Đào Văn C",
      specialization: "Information System",
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
      title: "Thời gian thực hiện",
      dataIndex: "time",
      key: "time",
      align: "center",
    },
    {
      title: "Nhóm sinh viên",
      dataIndex: "userName",
      key: "userName",
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
              <Button className="mr-2" type="default" onClick={() => {}}>
                Đăng kí
              </Button>
            </div>
          );
      },
    },
    {
      title: "Morde detail",
      key: "moredetail",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined
            onClick={showDrawer}
            className=" hover:text-blue-400 cursor-pointer"
          />
        </Space>
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
      </div>
      <div className="">
        <Table dataSource={data} columns={columns} bordered></Table>
        <Drawer
          width={640}
          placement="right"
          // closable={false}
          onClose={onClose}
          open={open}
          // extra={
          //   <Space>
          //     <Button onClick={onClose}>Cancel</Button>
          //   </Space>
          // }
        >
          <p
            className=" block mb-[16px] text-[16px] leading-[1.5175]"
            style={{
              marginBottom: 24,
            }}
          >
            This is page for the topic details
          </p>
          
        </Drawer>
      </div>
    </div>
  );
};

export default SelectThesis;