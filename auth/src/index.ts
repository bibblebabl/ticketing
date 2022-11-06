import express from "express";
import { json } from "body-parser";

import { usersRouter } from "./routes/users";

const app = express();
app.use(json());

app.use("/api/users", usersRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000!!!!!!!!");
});
