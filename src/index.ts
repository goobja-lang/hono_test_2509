import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  //c 는 서버자체임
  return c.text("Hello Hono!");
});

app.get("/test1", (c) => {
  let result: { success: boolean; data: any; msg: string } = {
    success: true,
    data: null,
    msg: ``,
  };
  try {
    let q = c?.req?.query("q");
    result.data = q;
    return c.json(result);
  } catch (error: any) {
    return c.json(result);
  }
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
