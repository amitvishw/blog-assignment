import "./App.css";
import { Layout } from "antd";
import Header from "./components/Header";
import CreateBlog from "./pages/CreateBlog";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/blogs/create" element={<CreateBlog />} />
          <Route path="/blogs/:blogId" element={<Blog />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
