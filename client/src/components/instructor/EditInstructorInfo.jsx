import { useState, useEffect } from "react";
import { Button, Form, Input, Image, message } from "antd";
import axios from "axios";

const EditInstructorInfo = ({ instructorID, bg }) => {
  const [instructorInfo, setInstructorInfo] = useState({});
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student information from the backend API
    const user = JSON.parse(localStorage.getItem('user'));
    const instructorID = user.id;
    const fetchInstructorInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/instructors/instructors/${instructorID}`);
        const instructorData = response.data.instructor;
        setInstructorInfo(instructorData);

        // Fetch specialization name
        const specializationId = instructorData.specialization;
        console.log(specializationId);
        if (specializationId) {
          const specializationResponse = await axios.get(`http://localhost:8000/instructors/getSpecializationById/${specializationId}`);
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

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const instructorID = user.id;
      const values = await form.validateFields();
      const response = await axios.put(`http://localhost:8000/instructors/update-instructor/${instructorID}`, values);
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
    setInstructorInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col" style={{ padding: 24, minHeight: 360, background: bg, justifyContent: "center", alignItems: "center" }}>
      <div className="flex flex-col">
        <p className="font-bold text-3xl">Edit instructor Information</p>
        <div className="mb-2 pb-2 border-b-[1px] border-black border-solid"></div>
        <div className="grid grid-cols-3 gap-4 ">
          <div>
            <Image width={300} height={400} src="https://static.tuoitre.vn/tto/i/s626/2015/09/22/vo-su-nguyen-van-dung-1442885937.jpg?fbclid=IwAR2mln6cV4WcLmurwRrLfg1Jb-c3L-e2_xtlTQyAhSMFAr1lq1ugXOi6n4g" />
          </div>
          <div>
            <Form
              name="box"
              layout="vertical"
              style={{ width: "100%" }}
              className="gap-4"
              form={form}
              initialValues={instructorInfo} // Set initial values from studentInfo
            >
              <div className="grid grid-cols-3 gap-4 ">
                <div>
                  <Form.Item label="Account ID" name="instructorID" style={{ fontSize: "16px" }}>
                    <Input size="large" value={instructorInfo.instructorID} readOnly /> <div/>
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
                  <Form.Item label="specialization" name="specialization" style={{ fontSize: "16px" }}>
                    <Input size="large" value={instructorInfo.specialization?.name || ''
                  } readOnly /> <div/>
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
  
  export default EditInstructorInfo;