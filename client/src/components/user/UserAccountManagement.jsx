import { Menu } from "antd";
import { useState } from 'react';
import UserInfo from "./UserInfo";
import EditUserInfo from "./EditUserInfo";


const UserAccountManagement = (props) => {
  const { bg } = props;
  const [selectedMenuItem, setSelectedMenuItem] = useState('user-info');
  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };
  let content;
  if (selectedMenuItem === 'user-info') {
    content = <div><UserInfo/></div>;
  } else if (selectedMenuItem === 'edit-info') {
    content = <div><EditUserInfo/></div>;
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

export default UserAccountManagement;
