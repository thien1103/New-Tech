 import {
    Col,
    Divider,
    Row,
  } from "antd";

  const Items = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      align: "center",
    },]
const UserProfile = (props) => {
return (
<div className="">
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
              <Items/>
            </Col>
            <Col span={12}>
              <Items
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Items/>
            </Col>
            <Col span={12}>
              <Items  />
            </Col>
          </Row>
         
        </div>
);
};

export default UserProfile



