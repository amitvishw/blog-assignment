import "dotenv/config";
import app from "./src/App";

const PORT = parseInt(process.env.PORT || "5000");

app.listen(PORT, "0.0.0.0", async () => {
  console.info(`Server is running on: ${PORT}`);
});
