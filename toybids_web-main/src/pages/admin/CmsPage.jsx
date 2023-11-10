import { useState } from "react";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  ToolOutlined,
  ContainerOutlined,
  UserAddOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Flex, Layout, Menu, theme } from "antd";
import { Avatar } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logoSideBar from "/src/assets/logo2.svg" ;
const { Header, Content, Footer, Sider } = Layout;

const CmsPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  const location = useLocation();
  const sliced_text = location.pathname.split("/")[2];
  const handleContents = (data) => {
    switch (data.key) {
      case "account":
        navigate(`/admin/${data.key}`);
        break;
      case "product":
        navigate(`/admin/${data.key}`);
        break;
      case "user-profile":
        navigate(`/admin/${data.key}`);
        break;
      case "council-management":
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
    getItem("Quản lý Tài Khoản", "account", <ToolOutlined />),
    getItem("Quản Lý Đề Tài", "product", <ContainerOutlined />),
    getItem("Thông Tin Cá Nhân", "user-profile", <UserOutlined />),
    getItem("Tạo Tài Khoản", "statistic", <UserAddOutlined />),
    getItem("Quản lý hội đồng", "council-management", <TeamOutlined />),
    getItem("Tạo Hội Đồng", "none2", <UsergroupAddOutlined />),
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
        <div className="demo-logo-vertical flex justify-center  items-center hover:cursor-pointer relative top-5 left-12 w-1/2 h-[100px] bg-slate-400 rounded-full text-lg font-bold text-white"><img src={logoSideBar} style={{ width: '80px'}}></img></div>
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
          {/*- {params.id === "1" && <AccountManagement bg={colorBgContainer} />}
          {params.id === "2" && <ProductsManagement bg={colorBgContainer} />}
          {params.id === "3" && <ReportManagement bg={colorBgContainer} />}
          {params.id === "4" && <StatisticManagement bg={colorBgContainer} />} */}
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

export default CmsPage;
