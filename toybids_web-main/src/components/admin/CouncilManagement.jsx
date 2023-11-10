import { Button, Form, Input, Table } from "antd";
import {  useSearchParams } from "react-router-dom";
import {UsergroupAddOutlined} from "@ant-design/icons"; 
const CouncilManagement = (props) => {
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

  const data = [
    {
      key: 1,
      thesisName: "Rắn Săn Mồi Application",
      //productImage:
      //  "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg", 
      studentID: "20110031",
      instructorID: "35501677",
      councilID: "1",
      registerDate: "07/05/2002",
      deadline: "02/02/2023",
      status: 1,
      description: "Project DASA",
    },
    {
      key: 2,
      thesisName: "BFS, DFS, A Star",
      //productImage:
      //  "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg",
      studentID: "20110534",
      instructorID: "35220349",
      councilID: "3",
      registerDate: "07/05/2002",
      deadline: "02/02/2023",
      status: 2,
      description: "Mô hình Nami cực múp",
    },
    {
      key: 3,
      thesisName: "Develop Tourch ViSion Model",
      //productImage:
      //  "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg",
      studentID: "20450369",
      instructorID: "35553288",
      councilID: "2",
      registerDate: "07/05/2002",
      deadline: "02/02/2023",
      status: 3,
      description: "Creating Model In Reinforcement Learning For AI Open Day Event",
    },
  ];
  const columns = [
    {
      title: "ID",
      dataIndex: "councilID",
      key: "councilID",
      align: "center",
    },
    {
      title: "Giảng viên 1",
      children: [
        { 
          title: "ID",
          dataIndex: "instructorID",
          key: 1,
          align: "center",
        },
        {
          title: "Tên GV",
          dataIndex: "instructorName",
          key: 1,
          align: "center",
        },
      ],
    },
    {
      title: "Giảng viên 2",
      children: [
        {
          title: "ID",
          dataIndex: "instructorID",
          key: 2,
          align: "center",
        },
        {
          title: "Tên GV",
          dataIndex: "instructorName",
          key: 2,
          align: "center",
        },
      ],
    },
    {
      title: "Giảng viên 3",
      children: [
        {
          title: "ID",
          dataIndex: "instructorID",
          key: 3,
          align: "center",
        },
        {
          title: "Tên GV",
          dataIndex: "instructorName",
          key: 3,
          align: "center",
        },
      ],
    },
 
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 100,
      render: (_, record) => {
        if (record.councilID !== "") {
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
        } else {
          return <div className=""></div>;
        }
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
          <Form.Item label="ID hội đồng" name="councilID">
            <Input defaultValue={searchParams.get("councilID")}></Input>
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
              onClick={""}
            > 
              <span><UsergroupAddOutlined/> &ensp; Tạo hội đồng</span>
        </Button>
    </div>
  );
};

export default CouncilManagement;
