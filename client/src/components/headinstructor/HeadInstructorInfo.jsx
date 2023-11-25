import { Button, Form, Input, Image} from "antd";
const HeadInstructorInfo = (props) => {
  const { bg } = props;
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
<p className="font-bold text-3xl">Head Instructor Information</p>
    <div className=" mb-2 pb-2 border-b-[1px] border-black border-solid"></div>
    <div className="grid grid-cols-3 gap-4">
      <div>
      <Image
      width={300}
      height={400}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
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
            <Input size="large" readOnly/>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
           
          >
            <Input size="large" readOnly/>
          </Form.Item>
          <Form.Item
            label="Date Of Birth"
            name="dateOfBirth"
            
          >
            <Input size="large" readOnly/>
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
            <Input size="large" readOnly/>
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            
          >
            <Input size="large" readOnly/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            
          >
            <Input size="large" readOnly/>

          </Form.Item>
          {/* Add more form items for the second column */}
        </Form>
      </div>
    </div>
    <Form.Item className="flex justify-center items-center w-full">
      
    </Form.Item>
    </div>
    </div>
  
    );
  };
  
  export default HeadInstructorInfo;