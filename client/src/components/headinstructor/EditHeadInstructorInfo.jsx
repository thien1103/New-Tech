import {  Button, Form, Input, Upload, message} from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import  React,{ useState } from 'react';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

const EditInstructorInfo = (props) => {
  const { bg } = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div
    >
      {loading ? <LoadingOutlined style={{ fontSize: 24, }}/> : <PlusOutlined style={{ fontSize: 24, }}/>}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Avatar 
      </div>
    </div>
  );
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
<p className="font-bold text-3xl">Edit Information</p>
    <div className=" mb-2 pb-2 border-b-[1px] border-black border-solid"></div>
    <div className="grid grid-cols-3 gap-4">
      <div>
      <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
      </div>
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
           
          >
            <Input size="large" readOnly/>
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="fullname"
           
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
           
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Date Of Birth"
            name="dateOfBirth"
            
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
            
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            
          >
            <Input size="large" />

          </Form.Item>
          {/* Add more form items for the second column */}
        </Form>
      </div>
    </div>
    <Form.Item className="flex justify-center items-center w-full">
    <Button
        type="default"
        htmlType="submit"
        className="bg-[#8FD1D1] rounded-[24px] w-[200px] h-[50px] text-white font-medium text-xl relative top-6"
      >
        Edit
      </Button>
    </Form.Item>
    </div>
    </div>
  
    );
  };
  
  export default EditInstructorInfo;