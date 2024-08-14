import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

import { IPromocodeResponse, ISignUpRequest, ISignUpResponse } from './sign-up.interface';
import { signUpService } from './sign-up.service';

export const promoCodeCalculation: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { code } = req.body;
		const result = await signUpService.promoCodeCalculation(code);
		// console.log(result);
		sendResponse<IPromocodeResponse>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'Promo code fetch successful',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const signUp: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const payload = req.body as ISignUpRequest;

		const result = await signUpService.signUp(payload);
		// console.log(result);
		sendResponse<ISignUpResponse>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'payment successful',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
