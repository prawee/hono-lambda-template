import { Hono } from "hono";

const app = new Hono().basePath("/api");

app.use(async (c, next) => {
  console.log("running middleware first");
  await next();
});

app.get("/", (c) => c.text("(GET) - User Service!!"));
app.post("/", (c) => c.text("(POST) - User Service!!"));
app.put("/", (c) => c.text("(PUT) - User Service!!"));
app.patch("/", (c) => c.text("(PATCH) - User Service!!"));
app.delete("/", (c) => c.text("(DELETE) - User Service!!"));

export default app;
