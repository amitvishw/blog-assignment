import { Layout, Form, Button, Input, Row, Col } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IReactState from "../types/ReactState";
import { blogSlice } from "../sagas/blogSaga";

const CreateBlog = () => {
  const dispatch = useDispatch();

  const blogState = useSelector((state: IReactState) => state.blogState);
  const { blog } = blogState;

  useEffect(() => {
    if (blog) {
      console.log(blog)
    }
  }, [blog]);

  const onFinish = (values: any) => {
    dispatch(blogSlice.actions.createBlogAction(values));
  };

  return (
    <Layout.Content>
      <Row justify="center">
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
                  <Button type="primary" htmlType="submit">
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
