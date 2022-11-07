import express from "express";
import { json } from "body-parser";

import { usersRouter } from "./routes/users";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors";

const app = express();
app.use(json());

app.use("/api/users", usersRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on port 3000!!!!!!!!");
});
