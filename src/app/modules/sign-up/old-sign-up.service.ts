// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';
// import httpStatus from 'http-status';
// import { btGateway } from '../../../config/bt-config';
// import ApiError from '../../../errors/apiError';
// import { generateRandomNumber } from '../../../helpers';
// import { API_PROMO_CODE, DEFAULT_PRICE } from './constant';
// import {
// 	IAcf,
// 	IGetPromoCodeResponse,
// 	IPromocodeResponse,
// 	ISignUpRequest,
// 	ISignUpResponse,
// } from './sign-up.interface';

// const calculateDiscountPercentage = (originalPrice: number, promo: IAcf): IPromocodeResponse => {
// 	const discountPercentage = promo?.discount_percent;
// 	if (originalPrice <= 0) {
// 		throw new ApiError(httpStatus.BAD_REQUEST, 'Original price must be greater than zero.');
// 	}

// 	if (discountPercentage < 0 || discountPercentage > 100) {
// 		throw new ApiError(httpStatus.BAD_REQUEST, 'Discount percentage must be between 0 and 100.');
// 	}

// 	const discount = (originalPrice * discountPercentage) / 100;
// 	const afterDiscountedPrice = originalPrice - discount;

// 	if (afterDiscountedPrice < 0) {
// 		throw new ApiError(httpStatus.BAD_REQUEST, 'Discounted price cannot be negative.');
// 	}

// 	return {
// 		code: promo?.coupon_code,
// 		price: Number(afterDiscountedPrice.toFixed(2)),
// 	};
// };

// const promoCodeCalculation = async (code: string): Promise<IPromocodeResponse> => {
// 	const result = await axios.get(API_PROMO_CODE as string);

// 	const matchCode = result?.data
// 		?.map((item: IGetPromoCodeResponse) => item?.acf)
// 		.filter((c: IAcf) => c?.coupon_code === code) as IAcf[];

// 	if (matchCode?.length === 0) {
// 		throw new ApiError(httpStatus.NOT_FOUND, 'Promo code not found');
// 	}

// 	const promoResult = calculateDiscountPercentage(Number(DEFAULT_PRICE), matchCode[0]);
// 	return promoResult;
// };

// const signUp = async (payload: ISignUpRequest): Promise<ISignUpResponse> => {
// 	let paymentAmount = DEFAULT_PRICE?.toString() as string;
// 	const randomNumber = generateRandomNumber();

// 	// if coupon exist
// 	if (payload?.coupon) {
// 		const promoPrice = await promoCodeCalculation(payload?.coupon);
// 		paymentAmount = promoPrice?.price?.toString();
// 	}

// 	// ? single bt payment
// 	// const transactionResponse = await btGateway.transaction.sale({
// 	// 	billing: {
// 	// 		firstName: payload?.firstname,
// 	// 		lastName: payload?.lastname,
// 	// 	},
// 	// 	amount: paymentAmount,
// 	// 	customer: {
// 	// 		firstName: payload?.firstname,
// 	// 		lastName: payload?.lastname,
// 	// 		phone: payload?.primaryPhone,
// 	// 	},
// 	// 	paymentMethodNonce: payload?.nonce,
// 	// 	options: {
// 	// 		submitForSettlement: true,
// 	// 	},
// 	// });

// 	// if (!transactionResponse?.success && !transactionResponse?.transaction?.id) {
// 	// 	throw new ApiError(httpStatus.BAD_REQUEST, transactionResponse?.message);
// 	// }

// 	// console.log(transactionResponse.transaction.id);

// 	const plan = await (btGateway.plan as any).create({
// 		id: randomNumber,
// 		name: `soffie-monthly-subscription-${payload?.firstname} ${payload?.lastname}`,
// 		billingFrequency: '1',
// 		currencyIsoCode: 'USD',
// 		price: paymentAmount,
// 	});

// 	if (!plan?.success) {
// 		throw new ApiError(httpStatus.BAD_REQUEST, plan?.message);
// 	}

// 	const customer = await btGateway.customer.create({
// 		paymentMethodNonce: payload?.nonce,
// 		firstName: payload?.firstname,
// 		lastName: payload?.lastname,
// 		phone: payload?.primaryPhone,
// 	});

// 	if (!customer?.success) {
// 		throw new ApiError(httpStatus.BAD_REQUEST, customer?.message);
// 	}
// 	const token = customer?.customer?.paymentMethods?.[0]?.token;
// 	const planId = randomNumber.toString();

// 	const subscription = await btGateway.subscription.create({
// 		paymentMethodToken: token,
// 		planId,
// 	});

// 	if (!subscription?.success) {
// 		throw new ApiError(httpStatus.BAD_REQUEST, subscription?.message);
// 	}
// 	const transactionId = subscription?.subscription?.transactions?.[0]?.id || '';

// 	// ? lyric account create
// 	// const member = await createLyricMember(payload, randomNumber, 'authtoken');

// 	// if (!member?.data?.success) {
// 	// 	// const refund = await btGateway.transaction.(transactionId, paymentAmount);
// 	// 	await btGateway.subscription.cancel(subscription?.subscription?.id);
// 	// 	// console.log(refund);
// 	// 	throw new ApiError(httpStatus.BAD_REQUEST, member?.data?.message);
// 	// }

// 	const resoponse = {
// 		transactionId,
// 		userId: '',
// 	};

// 	return resoponse;
// };

// export const signUpService = {
// 	signUp,
// 	promoCodeCalculation,
// };
