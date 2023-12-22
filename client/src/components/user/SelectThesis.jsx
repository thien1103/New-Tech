import { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";

const SelectTopic = ({ bg }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const availableDissertationsResponse = await axios.get(
        "http://localhost:8000/students/student/available-dissertations"
      );

      const updatedData = await Promise.all(
        availableDissertationsResponse.data.map(async (item, index) => {
          const instructor = await fetchInstructorName(item.InstructorID);
          const assignedInstructorIDs = item.defenseReview.map(
            (review) => review.assignedInstructorID
          );
          const assignedInstructors = await fetchAssignedInstructorName(
            assignedInstructorIDs
          );
          const specialization = await fetchSpecializationName(
            item.specializationID
          );
          const student = await fetchStudentInfo();
          return {
            key: index,
            thesisID: item.dissertationID,
            thesisName: item.Name,
            time: "15 weeks",
            instructor: instructor.instructorName || "",
            assignedInstructors: assignedInstructors || [],
            specialization: specialization.specializationName || "",
            studentId: student.student._id || "", // Placeholder for student ID
            instructorId: item.InstructorID || "", // Placeholder for instructor ID
            dissertationId: item._id || "", // Placeholder for dissertation ID
 
          };
          
        })
        
      );
        
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  const studentID = "2";     ///////////////////Khoa đổi ID chỗ này bằng local storage, dùng field studentID
  const fetchStudentInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/students/students/${studentID}`
      );
      return response.data || {}; // Return the object directly
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  const fetchInstructorName = async (InstructorID) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/students/getInstructorNameById/${InstructorID}`
      );
      return response.data || {}; // Return the object directly
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  const fetchAssignedInstructorName = async (assignedInstructorIDs) => {
    try {
      const instructorNames = await Promise.all(
        assignedInstructorIDs.map(async (id) => {
          const response = await axios.get(
            `http://localhost:8000/students/getInstructorNameById/${id}`
          );
          return response.data.instructorName || "";
        })
      );
      return instructorNames;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchSpecializationName = async (specializationId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/instructors/getSpecializationById/${specializationId}`
      );
      return response.data || {}; // Return the object directly
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  const handleRegister = async (studentId, instructorId, dissertationId) => {
    try {
      const requestData = {
        studentId,
        instructorId,
        dissertationId,
      };

      console.log("Data sent to API:", requestData);

      const response = await axios.post(
        `http://localhost:8000/students/students/${studentId}/dissertations/${dissertationId}/register`,
        requestData
      );

      if (response.status === 200) {
        console.log("Đăng ký đề tài thành công. Chờ xét duyệt");
        // Handle success case
        message.success("Successfully register disseratation");
      } else {
        console.error("Failed to register dissertation");
        // Handle error case
        message.error("Fail to register disseratation");

      }
    } catch (error) {
      console.error("Error in registering dissertation:", error);
      message.error("Fail to register disseratation");
      // Handle error case
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "thesisID",
      key: "thesisID",
      align: "center",
    },
    {
      title: "Thesis Name",
      dataIndex: "thesisName",
      key: "thesisName",
      align: "center",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "center",
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor",
      key: "instructor",
      align: "center",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
      align: "center",
    },
    {
      title: "Assigned Instructor",
      dataIndex: "assignedInstructors",
      key: "assignedInstructors",
      align: "center",
      render: (assignedInstructors) => (
        <ul>
          {assignedInstructors.map((instructor, index) => (
            <li key={index}>{instructor}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() =>
            handleRegister(
              record.studentId,
              record.instructorId,
              record.dissertationId
            )
          }
        >
          Đăng Kí
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  );
};

export default SelectTopic;