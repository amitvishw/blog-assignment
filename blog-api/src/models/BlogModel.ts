import { Model, DataTypes } from "sequelize";
import { IBlog } from "../types/blog";
import Database from "../database/Database";

class BlogModel extends Model<IBlog> {}

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
