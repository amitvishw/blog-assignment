import { Sequelize } from "sequelize";

export class Database {
  public static sequelize: Sequelize = new Sequelize(
    process.env.PG_DATABASE || "blog-db",
    process.env.PG_USER || "pguser",
    process.env.PG_PASSWORD || "pgpassword",
    {
      host: process.env.PG_HOST || "localhost",
      dialect: "postgres",
    },
  );
  public static async init(): Promise<boolean> {
    try {
      await Database.sequelize.authenticate();
      await Database.sequelize.sync({ alter: true });
      console.log("Connection has been established successfully.");
      return true;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return false;
    }
  }

  public static async disconnect(): Promise<void> {
    await Database.sequelize?.close();
  }
}

export default Database;
