import { useState, useEffect } from "react";
import { Table, Button } from "antd";
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
          const specialization = await fetchSpecializationName(item.specializationID);
          return {
            key: index,
            thesisID: item.dissertationID,
            thesisName: item.Name,
            time: "15 weeks",
            instructor: instructor.instructorName || "",
            assignedInstructors: assignedInstructors || [],
            specialization: specialization.specializationName || "",
          };
        })
      );
  
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInstructorName = async (InstructorID) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/students/getInstructorNameById/${InstructorID}`
      );
      console.log(response.data);
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
    console.log(instructorNames);
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
      console.log(response.data);
      return response.data || {}; // Return the object directly
    } catch (error) {
      console.error(error);
      return {};
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
      render: (assignedInstructors) => {
        return (
          <div>
            {assignedInstructors.map((instructor, index) => (
              <div key={index}>{instructor}</div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Đăng kí",
      dataIndex: "register",
      key: "register",
      align: "center",
      width: 100,
      render: (_, record) => {
        
          return (
            <div className="flex justify-center">
              <Button className="mr-2" type="default" onClick={() => {}}>
                Đăng kí
              </Button>
            </div>
          );
      },
    },
  ];

  return (
    <div style={{ padding: 24, minHeight: 360, background: bg }}>
      <div>
        <Table dataSource={data} columns={columns} bordered />
      </div>
    </div>
  );
};

export default SelectTopic;