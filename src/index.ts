import { createServer } from "./server.ts";
import { config } from "./config.ts";
import { OpenRouterService } from "./openrouterService.ts";

const openRouterService = new OpenRouterService(config);
const app = createServer(openRouterService);

await app.listen({ port: config.port, host: "0.0.0.0" });
console.log(`server running at ${config.port}`);

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
