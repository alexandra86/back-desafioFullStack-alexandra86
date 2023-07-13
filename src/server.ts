import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log("Server is running!");
    });
  })
  .catch((error) => {
    console.log(error);
  });
