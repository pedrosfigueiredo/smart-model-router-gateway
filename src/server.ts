import Fastify from "fastify";

export const createServer = () => {
  const app = Fastify({ logger: false });

  app.post(
    "/chat",
    {
      schema: {
        body: {
          type: "object",
          required: ["question"],
          properties: {
            question: { type: "string", minLength: 5 },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { question } = request.body as { question: string };
        reply.send({ answer: `You asked: ${question}` });
      } catch (error) {
        console.error("Error handling /chat request:", error);
        reply
          .status(500)
          .send({ error: "An error occurred while processing your request." });
      }
    },
  );
  return app;
};
