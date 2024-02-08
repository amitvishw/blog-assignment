import "./App.css";
import { Layout } from "antd";
import Header from "./components/Header";
import CreateBlog from "./pages/CreateBlog";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/blogs/create" element={<CreateBlog />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
