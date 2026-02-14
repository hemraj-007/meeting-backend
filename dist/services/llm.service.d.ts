/** Lightweight check that the LLM API is reachable and the key is valid. */
export declare function checkLlmHealth(): Promise<void>;
export declare function extractActions(text: string): Promise<{
    task: string;
    owner: string | null;
    dueDate: string | null;
}[]>;
//# sourceMappingURL=llm.service.d.ts.map