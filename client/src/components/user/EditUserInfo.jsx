import { useState, useEffect } from "react";
import { Button, Form, Input, Image, message } from "antd";
import axios from "axios";

const UserInfo = ({ studentID, bg }) => {
  const [studentInfo, setStudentInfo] = useState({});
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student information from the backend API
    const fetchStudentInfo = async () => {
      try {
        const studentID = '1';
        const response = await axios.get(`http://localhost:8000/students/students/${studentID}`);
        setStudentInfo(response.data.student);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentInfo();
  }, [studentID]);

  const handleSave = async () => {
    try {
      const studentID = '1';
      const values = await form.validateFields();
      const response = await axios.put(`http://localhost:8000/students/editprofile/${studentID}`, values);
      if (response.status === 200) {
        message.success("Update Successfully");
      } 
    }
     catch (error) {
      console.error(error);
      message.error("Update Failed");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col" style={{ padding: 24, minHeight: 360, background: bg, justifyContent: "center", alignItems: "center" }}>
      <div className="flex flex-col">
        <p className="font-bold text-3xl">Student Information</p>
        <div className="mb-2 pb-2 border-b-[1px] border-black border-solid"></div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Image width={300} height={400} src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
          </div>
          <div>
            <Form
              name="box"
              layout="vertical"
              style={{ width: "100%" }}
              className="gap-4"
              form={form}
              initialValues={studentInfo} // Set initial values from studentInfo
            >
              <div className="grid grid-cols-3 gap-4">
                <div>

                  <Form.Item label="Account ID" name="studentID" style={{ fontSize: "16px" }}>
                    <Input size="large" value={studentInfo.studentID} readOnly /> <div/>
                  </Form.Item>
                  <Form.Item label="Full Name" name="name">
                    <Input size="large" name="name" onChange={handleInputChange} />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input size="large" name="email" onChange={handleInputChange} />
                  </Form.Item>

                </div>
                <div>
                  <Form.Item label="Phone" name="phone">
                    <Input size="large" name="phone" onChange={handleInputChange} />

                  </Form.Item>
                  <Form.Item label="Class" name="classs">
                    <Input size="large" name="classs" onChange={handleInputChange} />
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Input.Password size="large" name="password" onChange={handleInputChange} />
                  </Form.Item>
                </div>
              </div>
              <Form.Item>
                <Button type="default" onClick={handleSave}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;