import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import app from "../src/app.js";

test("GET / responde Hola Mundo", async () => {
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  const body = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/`, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve({ status: res.statusCode, data }));
    }).on("error", reject);
  });

  server.close();

  assert.equal(body.status, 200);
  assert.equal(body.data, "Hola Mundo");
});
