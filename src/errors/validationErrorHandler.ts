import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interface/error.interface';
import { IGenericErrorResponse } from '../interface/errorResponse';

const validationErrorHandler = (error: mongoose.Error.ValidationError): IGenericErrorResponse => {
	const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
		(el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
			return {
				path: el?.path,
				message: el?.message,
			};
		}
	);
	const statusCode = 400;
	return {
		statusCode,
		message: 'Validation error',
		errorMessage: errors,
	};
};

export default validationErrorHandler;
