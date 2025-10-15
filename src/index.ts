import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  //c 는 서버자체임
  return c.text("Hello Hono!");
});

app.get("/test1", async (c) => {
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

app.post("/test1", async (c) => {
  let result: { success: boolean; data: any; msg: string } = {
    success: true,
    data: null,
    msg: ``,
  };
  try {
    const body = await c?.req?.parseBody(); //? 런타임에러 방지하기 위해 넣음 null safety 라는 용어임
    let q = body["q"];
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
