/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { generateRandomNumber } from '../../../helpers';
import { cancelSubscription, subscriptionPayment } from './authorizenet';
import { API_PROMO_CODE, DEFAULT_PRICE } from './constant';
import {
	ICoupon,
	IPromoCodeResponse,
	IPromocodeResponse,
	ISignUpRequest,
	ISignUpResponse,
} from './sign-up.interface';
import { checkValidEmail, createLyricMember, getLyricAuth } from './signup.herlper';

const calculateDiscountPercentage = (originalPrice: number, promo: ICoupon): IPromocodeResponse => {
	const couponAmount = Number(promo?.coupon_amount);
	if (originalPrice <= 0) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Original price must be greater than zero.');
	}

	if (couponAmount < 0 || couponAmount > 100) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Discount percentage must be between 0 and 100.');
	}
	// 1 is percentage
	// 2 is fixed price
	const discount =
		(promo?.coupon_type === '1' && (originalPrice * couponAmount) / 100) ||
		(promo?.coupon_type === '2' && couponAmount) ||
		0;
	const afterDiscountedPrice = originalPrice - discount;

	if (afterDiscountedPrice < 0) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Discounted price cannot be negative.');
	}

	return {
		code: promo?.coupon_name,
		price: Number(afterDiscountedPrice.toFixed(2)),
	};
};

const promoCodeCalculation = async (code: string): Promise<IPromocodeResponse> => {
	const result = await axios.get<IPromoCodeResponse>(`${API_PROMO_CODE}?code=${code}` as string);

	const codeValidity = new Date(result?.data?.coupon?.coupon_validity).getTime();
	const todayTime = new Date().getTime();

	if (codeValidity < todayTime) {
		throw new ApiError(httpStatus.GONE, 'Promo code expired');
	}

	const promoResult = calculateDiscountPercentage(Number(DEFAULT_PRICE), result.data.coupon);
	return promoResult;
};

const signUp = async (payload: ISignUpRequest): Promise<ISignUpResponse> => {
	let paymentAmount = DEFAULT_PRICE?.toString() as string;
	const randomNumber = generateRandomNumber();

	// lyric auth get token
	const lyricToken = await getLyricAuth();

	// lyric check valid email
	const validEmail = await checkValidEmail(lyricToken, payload?.email);
	if (validEmail?.data?.success && !validEmail?.data?.availableForUse) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist');
	}

	// if coupon exist
	if (payload?.coupon) {
		const promoPrice = await promoCodeCalculation(payload?.coupon);
		paymentAmount = promoPrice?.price?.toString();
	}

	const transaction = await subscriptionPayment({
		...payload,
		randomNumber,
		price: paymentAmount,
	});

	// ? lyric account create
	const member = await createLyricMember(payload, randomNumber, lyricToken);

	if (!member?.data?.success && !member?.data?.userid) {
		await cancelSubscription(transaction?.subscriptionId);
		throw new ApiError(httpStatus.BAD_REQUEST, 'Lyric:: Account creation failed');
	}

	const resoponse = {
		transactionId: transaction?.subscriptionId,
		userId: member?.data?.userid?.toString(),
	};

	return resoponse;
};

export const signUpService = {
	signUp,
	promoCodeCalculation,
};
