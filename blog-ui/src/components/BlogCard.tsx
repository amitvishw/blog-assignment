import { Card } from "antd";
import { Link } from "react-router-dom";
import { IBlog } from "../types/blog";

interface IProps {
  blog: IBlog;
  loading: boolean;
}

const BlogCard = ({ blog, loading }: IProps) => {
  return (
    <div>
      <Link to={`/blogs/${blog.uuid}`}>
        <Card hoverable loading={loading}>
          <Card.Meta
            title={blog.title}
            description={blog.content.slice(0, 200)}
          />
        </Card>
      </Link>
    </div>
  );
};

export default BlogCard;
