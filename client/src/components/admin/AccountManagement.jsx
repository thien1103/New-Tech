import { Menu,Modal, Button, Form, Input, Table, Select, message, Popconfirm } from "antd";
import { useState } from "react";
import InstructorAccount from "./InstructorAccount";
import UserAccount from "./UserAccount";


const AccountManagement = (props) => {
  const { bg } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("user-account");
  const [editStudent, setEditStudent] = useState({});
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModalEdit = () => {
    setIsModalEditVisible(true);
  };

  const closeModalEdit = () => {
    setIsModalEditVisible(false);
    setLoading(false);
    setEditStudent({}); // Reset editInstructor state
  };

  const handleEdit = (record) => {
    setEditStudent(record);
    openModalEdit();
  }

  const fetchData = async() => {
    try{
      const response = await axios.get("http://localhost:8000/managers/getallStudents");
      const students = response.data.students;
      const updatedData = [];

      for(const studentData of students){
        const student_id = studentData._id;
        try{
          const responseStudent = await axios.get(`http://localhost:8000/managers/getstudent/${student_id}`);
          const selectedStudentData = responseStudent.data;
          const updatedStudentData = {
            ...studentData,
            selectedStudentData
          };
          updatedData.push(updatedStudentData);
        }catch(error){
          console.log(error);
        }
      }
      setData(updatedData);
    }catch(error){
      console.log(error);
    }
  }

  const handleFormEdit = async() => {
    try{
      const values = form.getFieldValue();
      console.log("Data to be sent:", values);
      setLoading(true);
      const studentID = '658617c9a71e3704cdd57900'

      const response = await axios.put(
        `http://localhost:8000/managers/putstudents/update/${studentID}`,values
      );

      if (response.status === 200) {
        setLoading(false);
        closeModalEdit();
        message.success("Instructor updated successfully");
        fetchData();
      } else {
        message.error("Failed to update instructor");
      }

    }catch(error){
      console.error("Error in updating Student:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Backend error message:", error.response.data.message);
      }
      message.error("Failed to update student");
    }finally{
      setLoading(false);
    }
  }




  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };
  let content;
  if (selectedMenuItem === "user-account") {
    content = (
      <div>
        <UserAccount />
      </div>
    );
  } else if (selectedMenuItem === "instructor-account") {
    content = (
      <div>
        <InstructorAccount />
      </div>
    );
  }
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px" }}>
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[selectedMenuItem]}
        mode="horizontal"
      >
        <Menu.Item key="user-account">Tài khoản sinh viên</Menu.Item>
        <Menu.Item key="instructor-account">Tài khoản giảng viên</Menu.Item>
      </Menu>
      <div style={{ marginTop: "16px" }}>{content}</div>

      <div>
      <Modal
        title="Edit Giảng Viên"
        visible={isModalEditVisible}
        onCancel={closeModalEdit}
        footer={null}
        width={500}
        bodyStyle={{ height: '500px', overflow: 'auto' }}
        style={{
          position: "relative",
          top: 50,
        }}
      >
      </Modal>
      </div>
    </div>
  );
};

export default AccountManagement;
