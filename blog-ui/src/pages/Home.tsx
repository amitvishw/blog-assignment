import { Layout, Row, Col, Pagination, Typography, Empty, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { blogSlice } from "../sagas/blogSaga";
import IReactState from "../types/ReactState";
import BlogCard from "../components/BlogCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNumber: 1,
  });

  const blogState = useSelector((state: IReactState) => state.blogState);
  const {
    blogs,
    totalCount,
    fetchBlogsSuccess,
    fetchBlogsLoading,
    fetchBlogsError,
    fetchBlogsErrorMessage,
  } = blogState;

  useEffect(() => {
    dispatch(blogSlice.actions.fetchBlogsAction(pagination));
  }, [pagination]);

  return (
    <Layout.Content>
      <Row style={{ padding: "4rem" }} gutter={[16, 16]} justify="center">
        {blogs.map((blog) => (
          <Col span={6}>
            <BlogCard blog={blog} loading={fetchBlogsLoading} />
          </Col>
        ))}
        <Col>
          <Typography.Paragraph>
            {fetchBlogsError && fetchBlogsErrorMessage}
          </Typography.Paragraph>
          <Typography.Paragraph>
            {fetchBlogsSuccess && totalCount === 0 && (
              <Empty description={<span>No Data</span>}>
                <Button type="primary">
                  <Link to="/blogs/create">Create Blog</Link>
                </Button>
              </Empty>
            )}
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row style={{ padding: "2rem" }} justify="center">
        <Col>
          <Pagination
            defaultCurrent={1}
            current={pagination.pageNumber}
            total={totalCount}
            pageSize={pagination.pageSize}
            onChange={(page, pageSize) => {
              setPagination({
                pageSize,
                pageNumber: page,
              });
            }}
          />
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default Home;
