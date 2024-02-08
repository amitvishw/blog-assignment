import { Layout, Form, Button, Input, Row, Col, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IReactState from "../types/ReactState";
import { blogSlice } from "../sagas/blogSaga";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [doNavigate, setNavigate] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogState = useSelector((state: IReactState) => state.blogState);
  const { blog, createBlogSuccess, createBlogLoading, createBlogError } =
    blogState;

  useEffect(() => {
    if (createBlogSuccess && doNavigate && blog) {
      navigate(`/blogs/${blog.uuid}`);
    }
    if (createBlogError) {
      notification.error({
        key:"error",
        message: "Error",
        description: "Failed to crete blog, please try again.",
        duration: 1,
      });
    }
  }, [createBlogSuccess, createBlogError, doNavigate]);

  const onFinish = (values: any) => {
    dispatch(blogSlice.actions.createBlogAction(values));
    setNavigate(true);
  };

  return (
    <Layout.Content>
      <Row style={{ padding: "4rem" }} justify="center">
        <Col span={20}>
          <Form
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Blog title is required." }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
              rules={[
                { required: true, message: "Blog content can not be empty." },
              ]}
            >
              <Input.TextArea rows={20} />
            </Form.Item>
            <Row justify="end">
              <Col>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={createBlogLoading}
                    loading={createBlogLoading}
                  >
                    Publish
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default CreateBlog;
