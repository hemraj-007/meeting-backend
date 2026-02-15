import type { Request, Response } from "express";
export declare function processTranscript(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getTranscriptHistory(req: Request, res: Response): Promise<void>;
export declare function deleteTranscript(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=transcript.controller.d.ts.map