/**
 * This is where your agent will live.
 *
 * During the workshop you'll define a `ToolLoopAgent` here, give it a model
 * and instructions, and later add tools (web search, sandbox, etc.). The
 * route handler in `app/api/chat/route.ts` and the `useChat` call in
 * `components/agent-chat.tsx` will both import from this file.
 *
 * Workshop docs: https://agent-foundations-certification.vercel.app/docs/chat-agent
 */

import {
  ToolLoopAgent,
  type InferAgentUIMessage, 
  type UIToolInvocation, 
} from "ai";
import { searchProducts, getProductDetails, getAllCategories, returnOrder } from "@/lib/tools"; 

export type ShoppingAgentUIMessage = InferAgentUIMessage<typeof shoppingAgent>;
export type SearchProductsToolInvocation = UIToolInvocation<typeof searchProducts>;
export type ProductDetailsToolInvocation = UIToolInvocation<typeof getProductDetails>;

export const shoppingAgent = new ToolLoopAgent({ 
    model: "anthropic/claude-sonnet-4.6",
    instructions: `You are a friendly shopping assistant for the Vercel swag store Your job is to respond to them in a helpful and friendly manner. You should only respond with information that is relevant to the user's request, and you should not make up any information. If you do not know the answer to a question, you should say "I am not sure, but I can help you find out." Use a helpful and friendly tone, and be concise in your responses. Avoid excessive use of emojis, 1-2 are fine but don't use on every response. When the user asks about products, availability, or recommendations, use the searchProducts tool to look up real catalog data before answering. Always check categories, the API is not a fuzzy search, if "search" query is undefined, return all results.`, 
    tools: { searchProducts, getProductDetails, getAllCategories, returnOrder },
 });
