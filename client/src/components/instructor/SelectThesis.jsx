import { Button, Select, Form, Input,message} from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import axios from "axios";
const {Option} = Select;


const SelectThesis = (props) => {
  const { bg } = props;
  const [form] = Form.useForm();
  const [Selectnstructor, setSelectnstructor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectSpecializations, setSelectSpecializations] = useState([]);


 
  const fetchAllInstructor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/instructors/getallinstructors`
      );
      const instructorDatas = response.data.instructors;
      setSelectnstructor(instructorDatas);
    } catch (error) {
      console.error(error);
      return {};
    }
  };
  useEffect(() => {
    fetchAllInstructor();
  }, []);


  const fetchDataSpecialization = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/managers/getAllSpecializations"
      );
      const specializationData = response.data.specialization;
      setSelectSpecializations(specializationData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataSpecialization();
  }, []);


  const handleFormSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      console.log("Data to be sent:", values);
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/managers/postDissertation/create",
        values
      );

      if (response.status === 201) {
        setLoading(false);
        message.success("Dissertation created successfully");
    //    fetchData();
      } else {
        message.error("Failed to create Dissertation");
      }
    } catch (error) {
      console.error("Error in creating Dissertation:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Backend error message:", error.response.data.message);
      }
      message.error("Failed to create Dissertation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col"
      style={{
        padding: 24,
        minHeight: 360,
        background: bg,
      }}
    >
      <div className="flex justify-center items-center">
          <Form className="w-1/3 flex-col justify-center items-center" form={form} onFinish={handleFormSubmit}>
            <span>Dissertation ID</span>
            <Form.Item  name="dissertationID" >
              <Input />
            </Form.Item>
            <span>Dissertation Name</span>
            <Form.Item name="Name" >
              <Input />
            </Form.Item>
            <span>Description</span>
            <Form.Item name="Description" >
              <Input />
            </Form.Item>
            <span>Thời gian thực hiện </span>
            <Form.Item name="Time" >
              <Input />
            </Form.Item>
            <span>Instructor</span>
            <Form.Item name="instructorId" >
              <Select defaultValue="" className="mt-1">
                {Selectnstructor.map((instructors) => (
                  <Option
                    key={instructors._id}
                    value={instructors._id}
                  >
                    {instructors.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span>Chọn chuyên ngành</span>
            <Form.Item name="specializationId">
              <Select defaultValue="" className="mt-1">
                {selectSpecializations.map((specialization) => (
                  <Option key={specialization._id} value={specialization._id}>
                    {specialization.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Button
              className="justify-center align-center flex bg-green-700 text-white hover:!  text-white hover:!border-none max-w-max relative left-40"
              onClick={() => handleFormSubmit()}
              loading={loading}
            >
              <span>Xác nhận</span>
            </Button>
          </Form>
        </div>
    </div>
  );
};

export default SelectThesis;