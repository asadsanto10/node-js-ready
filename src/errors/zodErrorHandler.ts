import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessage } from '../interface/error.interface';
import { IGenericErrorResponse } from '../interface/errorResponse';

const zodErrorHandler = (error: ZodError): IGenericErrorResponse => {
	const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => ({
		path: issue?.path[issue.path.length - 1],
		message: issue?.message,
	}));

	const statusCode = 400;
	return {
		statusCode,
		message: 'Validation error',
		errorMessage: errors,
	};
};

export default zodErrorHandler;
