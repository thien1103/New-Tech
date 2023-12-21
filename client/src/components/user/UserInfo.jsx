import { useState, useEffect } from "react";
import { Button, Form, Input, Image } from "antd";
import axios from "axios";

const UserInfo = ({ studentID, bg }) => {
  const [studentInfo, setStudentInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentID = '1'
    // Fetch student information from the backend API
    const fetchStudentInfo = async () => {
      try {
  
        const response = await axios.get(`http://localhost:8000/students/students/${studentID}`);
        console.log(response.data);
        setStudentInfo(response.data.student);
        console.log(studentInfo.studentCode);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentInfo();
  }, [studentID]);
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
            <Form name="box" layout="vertical" style={{ width: "100%" }} className="gap-4">
              <Form.Item label="Account ID" name="userAccountID" style={{ fontSize: "16px" }}>
                
                <Input size="large" readOnly value={studentInfo.studentID} />
                <div></div>
              </Form.Item>
              <Form.Item label="Full Name" name="fullname">
                <Input size="large" readOnly value={studentInfo.name} /> <div/>
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input size="large" readOnly value={studentInfo.email} />  <div/>
              </Form.Item>
              {/* Add more form items for the first column */}
            </Form>
          </div>
          <div>
            <Form name="box" layout="vertical" style={{ width: "100%" }} className="gap-4">
              <Form.Item label="Phone" name="phone">
                <Input size="large" readOnly value={studentInfo.phone} /> <div/>
              </Form.Item>
              <Form.Item label="Class" name="class">
                <Input size="large" readOnly value={studentInfo.classs} /> <div/>
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input.Password size="large" readOnly value={studentInfo.password} /><div/>
              </Form.Item>
              {/* Add more form items for the second column */}
            </Form>
          </div>
        </div>
        <Form.Item className="flex justify-center items-center w-full"></Form.Item>
      </div>
    </div>
  );
  };
  
  export default UserInfo;