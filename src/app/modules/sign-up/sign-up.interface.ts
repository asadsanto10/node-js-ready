export interface IClientToken {
	token: string;
}
export interface IAcf {
	coupon_code: string;
	discount_percent: number;
}

export interface IGetPromoCodeResponse {
	acf: IAcf;
}

export interface IPromocodeResponse {
	price: number;
	code: string;
}

export interface ISignUpRequest {
	firstname: string;
	lastname: string;
	email: string;
	primaryPhone: string;
	gender: string;
	dob: string;
	city: string;
	zipcode: string;
	stateId: string;
	timezoneId: string;
	address: string;
	nonce: string;
	coupon?: string | undefined;
	recaptchToken: string;
	cardNumber?: string;
	cardExpDate?: string;
	cardCVC?: string;
}
export interface ISignUpResponse {
	userId: string;
	transactionId: string;
}

export interface ILyricCreateMemberRequest {
	primaryExternalId: number;
	groupCode: string;
	planId: number;
	planDetailsId: number;
	firstname: string;
	lastname: string;
	dob: string;
	email: string;
	primaryPhone: string;
	gender: string;
	heightFeet: number;
	heightInches: number;
	weight: number;
	address: string;
	address2: string;
	zipCode: string;
	city: string;
	stateId: string;
	timezoneId: string;
	disableNotifications: number;
	sendRegistrationNotification: number;
	numAllowedDependents: number;
	language: string;
	effectiveDate: string;
}

export interface ISubscriptionPayment extends ISignUpRequest {
	randomNumber: number;
	price: string;
}

export interface ICreateMemberResponse {
	data: {
		userid: number;
		success: boolean;
	};
}

export interface IValidEmailResponse {
	data: { availableForUse: boolean; success: boolean };
}

export interface IPromoCodeResponse {
	status: boolean;
	message: string;
	coupon: ICoupon;
}

export interface ICoupon {
	id: number;
	coupon_name: string;
	coupon_type: string;
	coupon_amount: string;
	coupon_limit: string;
	coupon_validity: string;
	created_at: string;
}
