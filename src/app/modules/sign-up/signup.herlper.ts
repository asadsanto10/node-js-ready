/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import httpStatus from 'http-status';
import { omit } from 'lodash';
import variable from '../../../config';
import ApiError from '../../../errors/apiError';
import { convertToFormData } from '../../../helpers/object-to-form-data';
import {
	ICreateMemberResponse,
	ILyricCreateMemberRequest,
	ISignUpRequest,
	IValidEmailResponse,
} from './sign-up.interface';

const date = new Date();
const effectiveDate = date.toLocaleDateString('en-US', {
	month: '2-digit',
	day: '2-digit',
	year: 'numeric',
});

export const getLyricAuth = async (): Promise<string> => {
	const authPayload = {
		email: variable.AUTH_EMAIL,
		password: variable.AUTH_PASSWORD,
	};

	const authPayloadFormdata = convertToFormData(authPayload);

	const auth = await axios.post(`${variable.LYRIC_API}/login` as string, authPayloadFormdata);

	if (auth?.data?.response?.success || auth?.data?.success === 'false') {
		throw new ApiError(httpStatus.UNAUTHORIZED, `Lyric:: ${auth?.data?.response?.message}`);
	}

	if (!auth?.headers?.authorization) {
		throw new ApiError(httpStatus.BAD_REQUEST, `Lyric token:: token fetch faild`);
	}

	return auth?.headers?.authorization;
};

export const checkValidEmail = async (
	loginToken: string,
	email: string
): Promise<IValidEmailResponse> => {
	const payload = {
		email,
	};
	const validEmail = await axios.post<FormData, IValidEmailResponse>(
		`${variable.LYRIC_API}/census/validateEmail`,
		convertToFormData(payload),
		{
			headers: {
				authorization: loginToken,
			},
		}
	);
	return validEmail;
};

export const createLyricMember = async (
	payload: ISignUpRequest,
	randomNumber: number,
	loginToken: string
): Promise<ICreateMemberResponse> => {
	const lyricPayload: ILyricCreateMemberRequest = {
		...omit(payload, ['nonce', 'recaptchToken', 'coupon']),
		primaryExternalId: randomNumber,
		groupCode: variable.GROUP_CODE as string,
		planId: Number(variable.PLAN_ID),
		planDetailsId: Number(variable.PLAN_DETAILS_ID),
		heightFeet: 0,
		heightInches: 0,
		weight: 0,
		address2: '', // blank
		zipCode: payload?.zipcode,
		disableNotifications: 0,
		sendRegistrationNotification: 1,
		numAllowedDependents: 2,
		language: 'en',
		effectiveDate,
	};

	const lyricPayloadFormData = convertToFormData(lyricPayload);

	// lyricPayloadFormData.forEach((value, key) => {
	// 	console.log(`${key} ${value}`);
	// });

	// console.log(lyricPayload);

	const createMemeber = await axios.post<FormData, ICreateMemberResponse>(
		`${variable.LYRIC_API}/census/createMember`,
		lyricPayloadFormData,
		{
			headers: {
				authorization: loginToken,
			},
		}
	);
	return createMemeber;
};
