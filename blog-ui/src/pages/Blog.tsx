import { Layout, Row, Col, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IReactState from "../types/ReactState";
import { blogSlice } from "../sagas/blogSaga";
import { useParams } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const blogState = useSelector((state: IReactState) => state.blogState);
  const { blog, fetchBlogByIdError, fetchBlogByIdErrorMessage } = blogState;
  const { blogId } = params;

  useEffect(() => {
    dispatch(blogSlice.actions.fetchBlogByIdAction(blogId));
  }, []);

  return (
    <Layout.Content>
      <Row justify="center">
        <Col span={20}>
          <Typography.Title>{blog?.title}</Typography.Title>
          <Typography.Paragraph>{blog?.content}</Typography.Paragraph>
          <Typography.Paragraph>
            {fetchBlogByIdError && fetchBlogByIdErrorMessage}
          </Typography.Paragraph>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default Blog;
