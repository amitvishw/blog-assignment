import "dotenv/config";
import app from "./src/App";
import { Database } from "./src/database/Database";

const PORT = parseInt(process.env.PORT || "4000");

app.listen(PORT, "0.0.0.0", async () => {
  await Database.init();
  console.info(`Server is running on: ${PORT}`);
});
