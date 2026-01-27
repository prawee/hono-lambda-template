import { Hono } from "hono";

import defaultRoute from "./routes/default";

const app = new Hono().basePath("/api");

app.use(async (c, next) => {
  console.log("running middleware first");
  await next();
});

app.route("/", defaultRoute);

export default app;
