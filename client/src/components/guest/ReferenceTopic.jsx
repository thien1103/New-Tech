import {  Button,   Form,   Input,  Table} from "antd";
import { useSearchParams } from "react-router-dom";

  
  const ReferenceTopic = (props) => {
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
        topicID: "1",
        topicName: "Single Shot Detection In Deep Learning",
        description: "",
  
      },
      {
        topicID: "2",
        topicName: "Pytorch In Deep Learning",
        description: "",
  
      },
    ];
    const columns = [
        {
          title: "ID",
          dataIndex: "topicID",
          key: "topicID",
          align: "center",
        },
        {
          title: "Tên Đề Tài",
          dataIndex: "topicName",
          key: "topicName",
          align: "center",
        },
        {
          title: "Mô tả",
          dataIndex: "description",
          key: "description",
          align: "center",
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
            <Form.Item label="ID" name="topicID">
              <Input defaultValue={searchParams.get("topicID")}></Input>
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
        </div>
      </div>
    );
  };
  
  export default ReferenceTopic;
  