import { Button, Form, Input } from "antd";

  const CreateCouncil = () => {
    const onFinish = (values) => {
      console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    }; 

  return (
  <div className="creat-council-box max-w-300">
    <div className=" flex flex-col justify-center items-center gap-2">
        <p className=" text-[30px] font-bold">Thêm Niên Khóa</p>
      </div>
      <div className=" flex flex-col justify-center items-center  h-[500px]  ">
        <Form
          name="box"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: "100%" ,
          marginTop: "30px",}}
          className=" flex flex-col gap-4"
        >
          <Form.Item
            label="A"
            name="councilID"
            style={{ width: "100%", fontSize: "16px" }}
            rules={[
              {
                required: true,
                message: "Please input the council ID!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="B"
            name="selectIntructor1"
            rules={[
              {
                required: true,
                message: "Please input the instructor name!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="C"
            name="selectIntructor2"
            rules={[
              {
                required: true,
                message: "Please input the instructor name!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="D"
            name="selectIntructor3"
            rules={[
              {
                required: true,
                message: "Please input the instructor name!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item className=" flex justify-center items-center w-full">
            <Button
              type="default"
              htmlType="submit"
              className=" bg-[#8FD1D1] rounded-[24px] w-[300px] h-[60px] text-white font-medium text-xl"
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
      </div>
  
  );
};

export default CreateCouncil;
