
/** trang quang trọng lấy sample */
import { Button, DatePicker, Form, Input, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
const CreateAccount = (props) => {
  const { bg } = props;
  return (
    <div
      className="flex flex-col"
      style={{
        padding: 24,
        minHeight: 360,
        background: bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    > <div className="flex flex-col">
    <p className="font-bold text-3xl">Create Account</p>
    <div className="mb-2 pb-2 border-b-[1px] border-black border-solid"></div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Form
          name="box"
          layout="vertical"
          style={{ width: "100%" }}
          className="gap-4"
        >
          <Form.Item
            label="Account ID"
            name="userAccountID"                        //index
            style={{ fontSize: "16px" }}
            rules={[
              {
                required: true,
                message: "Please input the Account ID!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please input data!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input data!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          
          {/* Add more form items for the first column */}
        </Form>
      </div>
      <div>
        <Form
          name="box"
          layout="vertical"
          style={{ width: "100%" }}
          className="gap-4"
        >
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input data!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input data!",
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
                message: "Please input data!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          {/* Add more form items for the second column */}
        </Form>
      </div>
      <Form.Item
            label="Date Of Birth"
            name="dateOfBirth"
            rules={[
              {
                required: true,
                message: "Please select a day!",
              },
            ]}
          >
            <DatePicker size="large" />
          </Form.Item>

          <Form.Item
            label="User Avatar"
            name="userAvatar"
            rules={[
              {
                required: true,
                message: "Please upload an image!",
              },
            ]}
          >
            <Upload>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
          </Form.Item>
    </div>
    <Form.Item className="flex justify-center items-center w-full">
      <Button
        type="default"
        htmlType="submit"
        className="bg-[#8FD1D1] rounded-[24px] w-[300px] h-[60px] text-white font-medium text-xl"
      >
        Create Account
      </Button>
    </Form.Item>
  </div>
  </div>

  );
};

export default CreateAccount;
