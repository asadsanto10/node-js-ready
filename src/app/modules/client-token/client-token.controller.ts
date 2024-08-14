import { RequestHandler } from 'express';

export const getClientTokenFromBt: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		// const result = await clientTokenService.getToken();
		// sendResponse<IClientToken>(res, {
		// 	statusCode: httpStatus.OK,
		// 	status: true,
		// 	message: 'token fetch successfully',
		// 	data: result,
		// });
	} catch (error) {
		next(error);
	}
};
