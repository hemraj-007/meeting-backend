"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLlmHealth = checkLlmHealth;
exports.extractActions = extractActions;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({
    apiKey: process.env.LLM_API_KEY
});
/** Lightweight check that the LLM API is reachable and the key is valid. */
async function checkLlmHealth() {
    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: "Reply with exactly: OK" }],
        temperature: 0,
        max_tokens: 10
    });
    const content = completion.choices[0]?.message?.content;
    if (typeof content !== "string" || content.trim().length === 0) {
        throw new Error("No valid response from LLM");
    }
}
async function extractActions(text) {
    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            {
                role: "user",
                content: `
Extract action items from the meeting transcript.

Return ONLY valid JSON like:
[
  { "task": string, "owner": string | null, "dueDate": string | null }
]

Transcript:
"""${text}"""
        `
            }
        ],
        temperature: 0
    });
    const content = completion.choices[0]?.message?.content;
    if (typeof content !== "string") {
        throw new Error("No valid response from LLM");
    }
    const jsonStr = extractJsonArray(content);
    return JSON.parse(jsonStr);
}
function extractJsonArray(raw) {
    const trimmed = raw.trim();
    // Strip markdown code block if present
    const withoutCodeBlock = trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    const start = withoutCodeBlock.indexOf("[");
    const end = withoutCodeBlock.lastIndexOf("]");
    if (start === -1 || end === -1 || end <= start) {
        throw new Error("LLM response did not contain a JSON array");
    }
    return withoutCodeBlock.slice(start, end + 1);
}
//# sourceMappingURL=llm.service.js.map