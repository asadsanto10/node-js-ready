import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import variable from '../../../config';
import ApiError from '../../../errors/apiError';
import { verifyToken } from '../../../helpers/jwt.helper';

export interface AuthRequest extends Request {
	user: JwtPayload;
}

const auth = (req: AuthRequest, _res: Response, next: NextFunction): void => {
	try {
		// get authorization token
		const token = req.headers.authorization;

		if (!token) {
			throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
		}

		const finaltoken = token.split(' ')[1] || token;

		// verify token
		let verifiedUser = null;

		verifiedUser = verifyToken(finaltoken, variable.jwtSecret as Secret);
		req.user = verifiedUser;

		if (!verifiedUser.userId) {
			throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden access');
		}
		next();
	} catch (error) {
		next(error);
	}
};

export default auth;
