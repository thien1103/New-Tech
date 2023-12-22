import {Button, Form,   Input, Table} from "antd";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

  const NotificationPage = (props) => {
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
        topicName: "",
        sender: "",
        content: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        sendDate:"",
  
      },
      {
        topicName: "",
        sender: "",
        content: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
        sendDate:"",
  
      },
    ];
    const columns = [
        
            {
              title: "Tiêu đề",
              dataIndex: "topicName",
              key: "topicName",
              align: "center",
            },
            {
                title: "Nội dung",
                dataIndex: "content",
                key: "content",
                align: "center",
              },
            {
              title: "Người gửi",
              dataIndex: "sender",
              key: "sender",
              align: "center",
            },
            {
                title: "Ngày gửi",
                dataIndex: "sendDate",
                key: "sendDate",
                align: "center",
                render: (_, record) =>
                  record.dateOfBirth && dayjs("12/07/2002 10:06:06").format("DD/MM/YYYY"),
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
      > <h2 className="text-center font-bold text-xl bg-blue-400">THÔNG BÁO</h2>
        <div className=" mb-2 pb-2 border-b-[1px] border-black border-solid">
        </div>
        <div className="">
          <Table dataSource={data} columns={columns} bordered></Table>
        </div>
      </div>
    );
  };
  
  export default NotificationPage;
  