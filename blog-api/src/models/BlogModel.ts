import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { IBlog, IBlogCreateData } from "../types/blog";
import Database from "../database/Database";

class BlogModel extends Model<
  InferAttributes<BlogModel>,
  InferCreationAttributes<BlogModel>
> {
  declare id: CreationOptional<number>;
  declare uuid: string;
  declare title: string;
  declare content: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  public async createBlog(data: IBlogCreateData): Promise<IBlog> {
    const blog = await BlogModel.create(data);
    return blog.dataValues;
  }
}

BlogModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.STRING,
      unique: true,
    },
    title: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize: Database.sequelize, tableName: "blogs" },
);

export default BlogModel;
