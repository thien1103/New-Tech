import { Layout, Menu, Button } from "antd";

const { Header, Content, Footer } = Layout;

const CustomLayout = () => {
  return (
    <Layout className="flex flex-col">
      <Header>
        <div className="logo">
          <img src="path_to_your_image" alt="Poster" />
        </div>
        <Menu
          style={{ height: 100 }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["tab1"]}
        >
          <Menu.ItemGroup>
            <Menu.Item key="tab1">Tab 1</Menu.Item>
            <Menu.Item key="tab2">Tab 2</Menu.Item>
            <Menu.Item key="tab3">Tab 3</Menu.Item>
            <Menu.Item key="tab4">Tab 4</Menu.Item>
          </Menu.ItemGroup>
        </Menu>
        <Button className="relative left-80 bg-blue-500" type="default">
          Login
        </Button>
      </Header>
      <Content>CONTENT</Content>
      <Footer>FOOTER</Footer>
    </Layout>
  );
};

export default CustomLayout;