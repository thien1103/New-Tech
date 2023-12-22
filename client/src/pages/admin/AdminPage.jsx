import { useState } from "react";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ToolOutlined,
  ContainerOutlined,
  UserAddOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, theme } from "antd";
import { Avatar } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logoSideBar from "/src/assets/logo2.png" ;
const { Header, Content, Footer, Sider } = Layout;
import authService from "../../services/auth.service";


const AdminPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    authService.logout();
  };

  const location = useLocation();
  const sliced_text = location.pathname.split("/")[2];
  const handleContents = (data) => {
    switch (data.key) {
      case "account-management":
        navigate(`/admin/${data.key}`);
        break;
      case "thesis-management":
      navigate(`/admin/${data.key}`);
      break;
      case "major-management":
        navigate(`/admin/${data.key}`);
        break;
      case "course-management":
        navigate(`/admin/${data.key}`);
        break;  
      default:
        break;
    }
  };
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const siderItems = [
    getItem("Quản lý Tài Khoản", "account-management", <ToolOutlined />),
    getItem("Quản Lý Đề Tài", "thesis-management", <ContainerOutlined />),
    getItem("Quản lý Chuyên Ngành", "major-management", <UserOutlined />),
    getItem("Quản lý Niên Khóa", "course-management", <TeamOutlined />),
   // getItem("Quản lý đợt đăng kí đề tài", "create-account", <UserAddOutlined />),

    // getItem("", "5", <FileOutlined />),
  ];
  const onClick = ({ key }) => {
    switch (key) {
      case "1":
        handleLogout();
        break;
      default:
        break;
    }
  };
  const items = [
    {
      icon: <LogoutOutlined />,
      label: "Log out",
      key: "1",
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className=" absolute h-full w-full">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={() => {}}
        onCollapse={() => {}}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical flex justify-center  items-center hover:cursor-pointer relative top-5 left-6 w-3/4 h-[150px] bg-slate-400 rounded-full text-lg font-bold text-white"><img src={logoSideBar} style={{ width: '80px'}}></img></div>
        <Menu
          style={{marginTop: '30px'}}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={sliced_text}
          items={siderItems}
          onClick={(e) => handleContents(e)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
          }}
          className=" flex justify-between items-center pl-4 pr-4"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown
            menu={{
              items,
              onClick,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Avatar
                size={{
                  xs: 40,
                  sm: 50,
                  md: 50,
                  lg: 50,
                  xl: 50,
                  xxl: 50,
                }}
                src="https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg"
                className=" cursor-pointer hover:opacity-60"
              />
            </a>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Thesis Management @ Team PVDK <br/>
          Contributed by team 147
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
