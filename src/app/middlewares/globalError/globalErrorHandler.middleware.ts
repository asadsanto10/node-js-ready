/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AxiosError } from 'axios';
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import variable from '../../../config';
import ApiError from '../../../errors/apiError';
import validationErrorHandler from '../../../errors/validationErrorHandler';
import zodErrorHandler from '../../../errors/zodErrorHandler';
import { IGenericErrorMessage } from '../../../interface/error.interface';
import { errorlogger } from '../../../shared/logger';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
	variable.nodeENV === 'production'
		? console.log(error)
		: console.log(`Global error handler:::: ${error}`);
	// console.log(error);
	// console.log(error?.response?.data);
	errorlogger.error(error);

	let statusCode = 500;
	let message: string | null = 'something went wrong!';
	let errorMessage: IGenericErrorMessage[] = [];

	if (error?.name === 'ValidationError') {
		const validationError = validationErrorHandler(error);
		statusCode = validationError?.statusCode;
		message = validationError?.message;
		errorMessage = validationError?.errorMessage;
	} else if (error instanceof ZodError) {
		const zodError = zodErrorHandler(error);
		statusCode = zodError?.statusCode;
		message = zodError?.message;
		errorMessage = zodError?.errorMessage;
	} else if (error instanceof AxiosError) {
		message = error?.response?.data?.message;
		errorMessage = error?.message
			? [
					{
						path: '',
						message: error?.response?.data?.message,
					},
			  ]
			: [];
	} else if (error instanceof ApiError) {
		statusCode = error?.statusCode;
		message = error.message;
		errorMessage = error?.message
			? [
					{
						path: '',
						message: error?.message,
					},
			  ]
			: [];
	} else if (error instanceof Error) {
		message = error?.message;
		errorMessage = error?.message
			? [
					{
						path: '',
						message: error?.message,
					},
			  ]
			: [];
	}

	res.status(statusCode).json({
		status: false,
		message,
		errorMessage,
		stack: variable.nodeENV !== 'production' ? error?.stack : undefined,
	});

	next();
};

export default globalErrorHandler;
