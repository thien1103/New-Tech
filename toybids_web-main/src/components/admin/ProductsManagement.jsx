import { Avatar, Button, Form, Input, Table } from "antd";
import dayjs from "dayjs";
import { redirect, useSearchParams } from "react-router-dom";
const ProductsManagement = (props) => {
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
      dataIndex: "thesisID",
      key: "thesisID",
      align: "center",
    },
    {
      title: "Tên Đề Tài",
      dataIndex: "thesisName",
      key: "thesisName",
      align: "center",
    },
    /***{
      title: "Image",
      dataIndex: "productImage",
      key: "productImage",
      align: "center",
      render: (_, record) => (
        <Avatar
          src={
            "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg"
          }
        />
      ),
    },***/
    {
      title: "ID Sinh Viên",
      dataIndex: "studentID",
      key: "studentID",
      align: "center",
    },
    {
      title: "ID Giảng Viên",
      dataIndex: "instructorID",
      key: "instructorID",
      align: "center",
    },
    {
      title: "ID Hội Đồng",
      dataIndex: "councilID",
      key: "councilID",
      align: "center",
    },
    {
      title: "Ngày Đăng Kí",
      dataIndex: "registerDate",
      key: "registerDate",
      align: "center",
      render: (_, record) =>
        record.registerDate && dayjs(record.registerDate).format("DD/MM/YYYY"),
    },
    {
      title: "Hạn chót",
      dataIndex: "deadline",
      key: "deadline",
      align: "center",
      render: (_, record) =>
        record.deadline && dayjs(record.deadline).format("DD/MM/YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      className: "flex justify-center",
      width: 100,
      render: (_, record) => {
        var status = " ";
        var bgcss = "";
        switch (record.status) {
          case 1:
            status = "Active";
            bgcss = "bg-green-500";
            break;
          case 2:
            status = "Waiting";
            bgcss = "bg-yellow-500";
            break;
          case 3:
            status = "Rejected";
            bgcss = "bg-red-500";
            break;
          default:
            break;
        }
        return <p className={`${bgcss} p-1 rounded-md  w-[80px]`}>{status}</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 100,
      render: (_, record) => {
        if (record.status === 2) {
          return (
            <div className="flex justify-center">
              <Button className="mr-2" type="default" onClick={() => {}}>
                Active
              </Button>
              <Button type="default" danger onClick={() => {}}>
                Reject
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
          <Form.Item label="Tên đề tài" name="thesisName">
            <Input defaultValue={searchParams.get("thesisName")}></Input>
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
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                {record.description}
              </p>
            ),
          }}
        ></Table>
      </div>
    </div>
  );
};

export default ProductsManagement;
