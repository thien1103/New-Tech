import {Modal,Avatar,Button,Col,Divider,Drawer,Form,Input,Row,Space,Table,} from "antd";
  import { UserAddOutlined, EyeOutlined } from "@ant-design/icons";
  import { useState } from "react";
  import { useSearchParams } from "react-router-dom";
  const DescriptionItem = ({ title, content }) => (
    <div className=" mb-[7px] text-[14px] leading-[1.5715] ">
      <p className=" inline-block mr-[8px]">{title}:</p>
      {content}
    </div>
  );
  const InstructorAccount = (props) => {
    const { bg } = props;
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const openModal = () => {
      setIsModalVisible(true);
  };

  const closeModal = () => {
      setIsModalVisible(false);
  };
  const handleAdd = () => {
    // Show the edit modal
    openModal();
};
    const [isModalVisible, setIsModalVisible] = useState(false);


    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const handleSearch = async (values) => {
      for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          // Kiểm tra xem thuộc tính có bằng undefined không
          if (values[key] === undefined) {
            // Gán thuộc tính bằng ""
            values[key] = "";
          }
        }
      }
      setSearchParams(values);
    };


    const handleReset = () => {
      setSearchParams({});
      form.resetFields();
    };
    const data = [
      {
        instructorAvatar:
          "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg",
        instructorFullName: "",
        userEmail: "",
        phone: "",
        dateOfBirth: "",
        address: "",
        city: "",
        country: "",
  
      },
      {
        instructorAvatar:
          "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg",
        instructorFullName: "",
        userEmail: "",
        phone: "",
        dateOfBirth: "",
        address: "",
        city: "",
        country: "",
  
      },
      
    ];
    const columns = [
      {
        title: "Avatar",
        dataIndex: "userAvatar",
        key: "userAvatar",
        align: "center",
        render: (_, record) => (
          <Avatar
            src={
              "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg"
            }
          />
        ),
      },
      {
        title: "ID",
        dataIndex: "instructorAccountID",
        key: "instructorAccountID",
        align: "center",
      },
      {
        title: "Fullname",
        dataIndex: "instructorName",
        key: "instructorName",
        align: "center",
      },
      {
        title: "Email",
        dataIndex: "instructorEmail",
        key: "instructorEmail",
        align: "center",
      },
      {
        title: "Phone",
        dataIndex: "instructorPhone",
        key: "instructorPhone",
        align: "center",
      },
      {
        title: "Address",
        dataIndex: "instructorAddress",
        key: "instructorAddress",
        align: "center",
      },
      {
        title: "Major",
        dataIndex: "major",
        key: "major",
        align: "center",
      },
      {
        title: "Password",
        dataIndex: "password",
        key: "password",
        align: "center",
      },
    
      /***{
        title: "Reputation",
        dataIndex: "reputation",
        key: "reputation",
        align: "center",
        render: (_, record) => {
          let color = "";
          if (record.reputation >= 8) {
            color = "green";
          } else if (record.reputation >= 5) {
            color = "yellow";
          } else {
            color = "red";
          }
          return <Tag color={color}>{record.reputation}</Tag>;
        },
      }, ***/
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center",
        width: 100,
        render: (_, record) => {
    
            return (
              <div className="flex justify-center">
                <Button className="mr-2" type="default" onClick={() => {}}>
                  Edit
                </Button>
                <Button type="default" danger onClick={() => {}}>
                  Delete
                </Button>
              </div>
            );
          
        },
      },
      {
        title: "Morde detail",
        key: "moredetail",
        align: "center",
        render: (_, record) => (
          <Space size="middle">
            <EyeOutlined
              onClick={showDrawer}
              className=" hover:text-blue-400 cursor-pointer"
            />
          </Space>
        ),
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
        <div className=" mb-2 pb-2 border-b-[1px] border-black border-solid">
          <Form layout="inline" onFinish={handleSearch} form={form}>
            <Form.Item label="Name" name="fullName">
              <Input defaultValue={searchParams.get("fullName")}></Input>
            </Form.Item>
            <Form.Item label="ID" name="ID">
              <Input defaultValue={searchParams.get("ID")}></Input>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Search</Button>
            </Form.Item>
            <Form.Item>
              <Button
                className=" bg-red-600 text-white hover:!text-white hover:!border-none"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="">
          <Table dataSource={data} columns={columns} bordered></Table>
          <Button
        className="justify-center align-center flex bg-green-700 text-white hover:!text-white hover:!border-none max-w-max"
        onClick={() => handleAdd()}
      >
        <span>
          <UserAddOutlined /> &ensp; Thêm giảng viên
        </span>
      </Button>
          <Drawer
            width={640}
            placement="right"
            // closable={false}
            onClose={onClose}
            open={open}
            // extra={
            //   <Space>
            //     <Button onClick={onClose}>Cancel</Button>
            //   </Space>
            // }
          >
            <p
              className=" block mb-[16px] text-[16px] leading-[1.5175]"
              style={{
                marginBottom: 24,
              }}
            >
              User Profile
            </p>
            <p className="site-description-item-profile-p">Personal</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Full Name" content="Lily" />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Account"
                  content="AntDesign@example.com"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="City" content="HangZhou" />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Country" content="China🇨🇳" />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Birthday" content="February 2,1900" />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Website" content="-" />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Message"
                  content="Make things as simple as possible but no simpler."
                />
              </Col>
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">Contacts</p>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Email" content="AntDesign@example.com" />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Phone Number"
                  content="+86 181 0000 0000"
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Github"
                  content={
                    <a href="http://github.com/ant-design/ant-design/">
                      github.com/ant-design/ant-design/
                    </a>
                  }
                />
              </Col>
            </Row>
          </Drawer>
        </div>
        <Modal
                title="Thêm Giảng Viên"
                visible={isModalVisible}
                onCancel={closeModal}
                footer={null}
                width={500}
                bodyStyle={{ height: '300px', overflow: 'auto' }}
                style={{
                    position: "relative",
                    top: 50,

                }}
            >
                <div>
                    <Form className="mt-10">
                        <Form.Item>
                            <span>something here</span>
                                <Input/>
                            
                            <Button
                                className="justify-center align-center flex bg-green-700 text-white hover:!text-white hover:!border-none max-w-max top-40 left-40 relative"
                                onClick={() => {}}
                            >
                                <span>
                                   Xác nhận
                                </span>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
      </div>
    );
  };
  
  export default InstructorAccount;
  