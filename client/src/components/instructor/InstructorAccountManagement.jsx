import { Menu } from "antd";
import { useState } from 'react';
import InstructorInfo from "./InstructorInfo";
import EditInstructorInfo from "./EditInstructorInfo";


const InstructorAccountManagement = (props) => {
  const { bg } = props;
  const [selectedMenuItem, setSelectedMenuItem] = useState('user-info');
  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };
  let content;
  if (selectedMenuItem === 'user-info') {
    content = <div><InstructorInfo/></div>;
  } else if (selectedMenuItem === 'edit-info') {
    content = <div><EditInstructorInfo/></div>;
  }
  return (
    
    <div style={{ border: '1px solid #ccc', padding: '16px' }}>
    <Menu onClick={handleMenuClick} selectedKeys={[selectedMenuItem]} mode="horizontal">
      <Menu.Item key="user-info">Thông tin cá nhân</Menu.Item>
      <Menu.Item key="edit-info">Chỉnh sửa thông tin</Menu.Item>
    </Menu>
    <div style={{ marginTop: '16px' }}>{content}</div>  
  </div>

  );
};

export default InstructorAccountManagement;
