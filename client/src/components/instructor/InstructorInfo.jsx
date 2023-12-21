import { useState, useEffect } from "react";
import { Button, Form, Input, Image } from "antd";
import axios from "axios";

const InstructorInfo = ({ instructorID, bg }) => {
  const [instructorInfo, setInstructorInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const instructorID = '1';
  
    const fetchInstructorInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/instructors/instructors/${instructorID}`);
        const instructorData = response.data.instructor;
        setInstructorInfo(instructorData);

        // Fetch specialization name
        const specializationId = instructorData.specialization;
        if (specializationId) {
          const specializationResponse = await axios.get(`http://localhost:8000/instructors/instructor/getSpecializationById/${specializationId}`);
          const specializationData = specializationResponse.data;
          setInstructorInfo(prevState => ({
            ...prevState,
            specialization: {
              ...prevState.specialization,
              name: specializationData.specializationName
            }
          }));
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInstructorInfo();
  }, [instructorID]);
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
                
                <Input size="large" readOnly value={instructorInfo.instructorID} />
                <div></div>
              </Form.Item>
              <Form.Item label="Full Name" name="fullname">
                <Input size="large" readOnly value={instructorInfo.name} /> <div/>
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input size="large" readOnly value={instructorInfo.email} />  <div/>
              </Form.Item>
              {/* Add more form items for the first column */}
            </Form>
          </div>
          <div>
            <Form name="box" layout="vertical" style={{ width: "100%" }} className="gap-4">
              <Form.Item label="Phone" name="phone">
                <Input size="large" readOnly value={instructorInfo.phone} /> <div/>
              </Form.Item>
              <Form.Item label="specialization" name="specialization">
                <Input size="large" readOnly value={instructorInfo.specialization?.name || ''
                } /><div/>
              </Form.Item>  
              <Form.Item label="Password" name="password">
                <Input.Password size="large" readOnly value={instructorInfo.password} /><div/>
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
export default InstructorInfo;