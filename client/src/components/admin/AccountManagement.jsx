import { Menu } from "antd";
import { useState } from 'react';
import InstructorAccount from "./InstructorAccount";
import UserAccount from "./UserAccount";


const AccountManagement = (props) => {
  const { bg } = props;
  const [selectedMenuItem, setSelectedMenuItem] = useState('user-account');
  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };
  let content;
  if (selectedMenuItem === 'user-account') {
    content = <div><UserAccount/></div>;
  } else if (selectedMenuItem === 'instructor-account') {
    content = <div><InstructorAccount/></div>;
  }
  return (
    
    <div style={{ border: '1px solid #ccc', padding: '16px' }}>
    <Menu onClick={handleMenuClick} selectedKeys={[selectedMenuItem]} mode="horizontal">
      <Menu.Item key="user-account">Tài khoản sinh viên</Menu.Item>
      <Menu.Item key="instructor-account">Tài khoản giảng viên</Menu.Item>
    </Menu>
    <div style={{ marginTop: '16px' }}>{content}</div>  
  </div>

  );
};

export default AccountManagement;
