import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Layout.Header>
      <Menu mode="horizontal" theme="dark">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="create">
          <Link to="/blogs/create">+ New Blog</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
