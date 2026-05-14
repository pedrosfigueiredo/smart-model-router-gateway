import { OpenRouter } from "@openrouter/sdk";
import { config, type ModelConfig } from "./config.ts";
import { type ChatGenerationParams } from "@openrouter/sdk/models";

export type LLMResponse = {
  model: string;
  content: string;
};

export class OpenRouterService {
  private client: OpenRouter;
  private config: ModelConfig;

  constructor(configOverride?: ModelConfig) {
    this.config = { ...config, ...configOverride };
    this.client = new OpenRouter({
      apiKey: this.config.apiKey,
      httpReferer: this.config.httpReferer,
      xTitle: this.config.xTitle,
    });
  }

  async generate(prompt: string): Promise<LLMResponse> {
    const response = await this.client.chat.send({
      model: this.config.models[0],
      messages: [
        { role: "system", content: this.config.systemPrompt },
        { role: "user", content: prompt },
      ],
      stream: false,
      temperature: this.config.temperature,
      max_tokens: this.config.maxTokens,
      provider: this.config.provider as ChatGenerationParams["provider"],
    });

    console.log("Full response from OpenRouter:", response);
    const content = String(response.choices.at(0)?.message.content ?? "");

    return {
      model: response.model,
      content,
    };
  }
}
