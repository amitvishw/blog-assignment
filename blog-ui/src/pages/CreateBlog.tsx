import { Layout, Form, Button, Input, Row, Col } from "antd";

const CreateBlog = () => {
  const onFinish = (values: any) => {
    console.log(values)
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
