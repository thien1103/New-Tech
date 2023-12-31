import {
    Avatar,   Button,   Col,    Divider,   Drawer,   Form,   Input,  Row,Space, Table} from "antd";
  import { EyeOutlined, UserAddOutlined } from "@ant-design/icons";
  import dayjs from "dayjs";
  import { useState } from "react";
  import { useSearchParams } from "react-router-dom";
  const DescriptionItem = ({ title, content }) => (
    <div className=" mb-[7px] text-[14px] leading-[1.5715] ">
      <p className=" inline-block mr-[8px]">{title}:</p>
      {content}
    </div>
  );
  const ContactInformation = (props) => {
    const { bg } = props;
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
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
        userAvatar:
          "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg",
        userFullName: "Nguyen Van A",
        userEmail: "test@gmail.com",
        phone: "0123456789",
        dateOfBirth: "12/07/2002 10:06:06",
        status: 1,
        address: "123 Nguyen Van A",
        major: "C",
  
      },
      {
        userAvatar:
          "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg",
        userFullName: "Nguyen Van B",
        userEmail: "test123@gmail.com",
        phone: "0123456789",
        dateOfBirth: "25/05/2002 10:06:06",
        status: 3,
        address: "123 Nguyen Van B",
        major: "B",
  
      },
      {
        userAvatar:
          "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg",
        userFullName: "Nguyen Van C",
        userEmail: "test3333@gmail.com",
        phone: "0123456789",
        dateOfBirth: "07/07/2002 10:06:06",
        status: 2,
        address: "123 Nguyen Van C",
        major: "A",
  
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
        dataIndex: "userAccountID",
        key: "userAccountID",
        align: "center",
      },
      {
        title: "Tên Giảng Viên",
        dataIndex: "userFullName",
        key: "userFullName",
        align: "center",
      },
      {
        title: "Email",
        dataIndex: "userEmail",
        key: "userEmail",
        align: "center",
      },
      {
        title: "Số điện thoại",
        dataIndex: "phone",
        key: "phone",
        align: "center",
      },
      {
        title: "Địa chỉ",
        dataIndex: "address",
        key: "address",
        align: "center",
      },
      {
        title: "Chuyên ngành",
        dataIndex: "major",
        key: "major",
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
        title: "Thêm chi tiết",
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
      </div>
    );
  };
  
  export default ContactInformation;
  