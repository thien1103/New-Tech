import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", values);

      if (response.status === 200) {
        const { token, user, userType } = response.data;
        // Redirect to the desired page based on user type
        if (userType === "manager") {
          navigate("/admin");
          message.success("Login successfully");
        } else if (userType === "student") {
          navigate("/user");
          message.success("Login successfully");
        } else if (userType === "instructor") {
          navigate("/instructor");
          message.success("Login successfully");
        }
      } else if (response.status === 401) {
        console.error("Login failed");
        // Handle login failure, show error message, etc.
        // You can use the Ant Design message component to display the error message
        message.error("Please input value");
      }
    } catch (error) {
      console.error(error);
      // Handle any network or server errors
      message.error("Uncorrect email or password. Please try again");

    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Invalid email or password");
  };

  return (
    <div className=" w-[500px] h-[500px] flex flex-col rounded-[49px] pl-10 pr-10 pt-6 pb-6  bg-[#F6FBF9] ">
      <div className=" flex flex-col justify-center items-center gap-2">
        <p className=" text-[30px] font-bold ">Sign in</p>
        <p className=" text-sm font-normal">Welcome to our community!</p>
      </div>
      <div className=" flex flex-col justify-center items-center  h-[400px] ">
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ width: "100%" }}
          className=" flex flex-col gap-4"
        >
          <Form.Item
            label="Email Address"
            name="email"
            style={{ width: "100%", fontSize: "16px" }}
            rules={[
              {
                required: true,
                message: "Please input your email address!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item className=" flex justify-center items-center w-full">
            <Button
              type="default"
              htmlType="submit"
              className=" bg-[#8FD1D1] rounded-[24px] w-[300px] h-[60px] text-white font-medium text-xl"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;