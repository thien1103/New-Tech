import {
    Button,
    Form,
    Table,
  } from "antd";
  import { useState,useEffect } from "react";
  import axios from "axios";
 
  const ThesisApprovement = (props) => {
    const { bg } = props;
    const [form] = Form.useForm();    
    const [data, setData] = useState([]);



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



    useEffect(() => {
      fetchDataDissertation();
    }, []);
  
    const fetchDataDissertation = async () => {
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
            return {
              key: index,
              dissertationId: item._id || "", // Placeholder for dissertation ID
              dissertationID: item.dissertationID || "",
              name: item.Name || "",
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

    const handleApprove = async (dissertationId, decision) => {
      try {
        const response = await axios.post(
          `http://localhost:8000/instructors/department-heads/dissertations/${dissertationId}`,
          { decision }
        );
    
        if (response.status === 200) {
          // Process successful response
          console.log('Dissertation status updated successfully');
          // Optionally, update the state or UI as needed after successful update
        } else {
          console.error('Failed to update dissertation status');
        }
      } catch (error) {
        console.error('Error occurred while updating dissertation status:', error);
      }
    };

    
    const columns = [
      {

        dataIndex: "dissertationId",
        key: "dissertationId",
        align: "center",
        render: () => null, // Render function that returns null, effectively hiding the content

      },
      {
        title: "ID",
        dataIndex: "dissertationID",
        key: "dissertationID",
        align: "center",
      },
      {
        title: "Tên đề tài",
        dataIndex: "name",
        key: "name",
        align: "center",
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
        align: "center",
      },
      {
        title: "GVPB",
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
        title: "GVHD",
        dataIndex: "instructor",
        key: "instructor",
        align: "center",
      },
      {
        title: "Chuyên ngành",
        dataIndex: "specialization",
        key: "specialization",
        align: "center",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        width: 100,
        render: (_, record) => {
          return (
            <div className="flex justify-center">
              <Button
                className="mr-2"
                type="default"
                onClick={() => handleApprove(record.dissertationId, 'accept')}
              >
                Duyệt
              </Button>
              <Button
                type="default"
                danger
                onClick={() => handleApprove(record.dissertationId, 'reject')}
              >
                Từ Chối
              </Button>
            </div>
          );
        },
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
        <div className="">
          <Table dataSource={data} columns={columns} bordered rowKey="dissertationID"></Table>
        
        </div>
      </div>
    );
  };
  
  export default ThesisApprovement;
  