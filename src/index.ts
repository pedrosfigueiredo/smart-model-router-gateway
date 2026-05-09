import { createServer } from "./server.ts";

const app = createServer();

const address = await app.listen({ port: 3000, host: "127.0.0.1" });
app.log.info(`Server is running at ${address}`);

process.on("SIGTERM", async () => {
  await app.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  await app.close();
  process.exit(0);
});

app
  .inject({
    method: "POST",
    url: "/chat",
    payload: {
      question: "What is the capital of France?",
    },
  })
  .then((response) => {
    console.log("Status code from /chat:", response.statusCode);
    console.log("Response from /chat:", response.payload);
  })
  .catch((error) => {
    console.error("Error during test request to /chat:", error);
  });
