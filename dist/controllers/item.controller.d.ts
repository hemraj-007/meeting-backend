import type { Request, Response } from "express";
export declare function getItems(req: Request, res: Response): Promise<void>;
export declare function createItem(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateItem(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteItem(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=item.controller.d.ts.map