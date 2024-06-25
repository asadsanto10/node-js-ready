import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest =
	(schema: AnyZodObject) =>
	async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
		try {
			await schema.parseAsync({
				body: req.body as Record<string, unknown>,
				query: req.query,
				params: req.params,
				cookies: req.cookies as Record<string, unknown>,
			});
			next();
		} catch (error) {
			next(error);
		}
	};
