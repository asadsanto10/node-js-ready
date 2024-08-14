import { z } from 'zod';

import cardValid from 'card-validator';
// const signUpZodSchema = z.object({
// 	body: z.object({
// 		coupon: z.string().optional(),
// 		firstname: z.string({ required_error: 'First name is required.' }),
// 		lastname: z.string({ required_error: 'Last name is required.' }),
// 		email: z
// 			.string({ required_error: 'Email name is required.' })
// 			.email({ message: 'Email is not valid email address.' }),
// 		primaryPhone: z.string({ required_error: 'Phone number is required.' }),
// 		gender: z.string({ required_error: 'Gender is required.' }),
// 		dob: z.string({ required_error: 'DOB is required.' }),
// 		city: z.string({ required_error: 'City is required.' }),
// 		zipcode: z.string({ required_error: 'Zip code is required.' }),
// 		stateId: z.string({ required_error: 'State id is required.' }),
// 		timezoneId: z.string({ required_error: 'Time zone id is required.' }),
// 		address: z.string({ required_error: 'Address is required.' }),
// 		nonce: z.string({ required_error: 'BT nonce is required.' }),
// 		recaptchToken: z.string({ required_error: 'recaptc is required.' }),
// 	}),
// });
const signUpZodSchema = z.object({
	body: z.object({
		coupon: z.string().optional(),
		firstname: z.string({ required_error: 'First name is required.' }),
		lastname: z.string({ required_error: 'Last name is required.' }),
		email: z
			.string({ required_error: 'Email name is required.' })
			.email({ message: 'Email is not valid email address.' }),
		primaryPhone: z.string({ required_error: 'Phone number is required.' }),
		gender: z.string({ required_error: 'Gender is required.' }),
		dob: z.string({ required_error: 'DOB is required.' }),
		city: z.string({ required_error: 'City is required.' }),
		zipcode: z.string({ required_error: 'Zip code is required.' }),
		stateId: z.string({ required_error: 'State id is required.' }),
		timezoneId: z.string({ required_error: 'Time zone id is required.' }),
		address: z.string({ required_error: 'Address is required.' }),
		// nonce: z.string({ required_error: 'BT nonce is required.' }),
		recaptchToken: z.string({ required_error: 'recaptcha is required.' }),
		cardNumber: z
			.string({ required_error: 'Card number is required.' })
			.refine((value) => cardValid.number(value).isValid, { message: 'Invalid card number' }),
		cardExpDate: z
			.string({ required_error: 'Card expire date is required.' })
			.refine((value) => cardValid.expirationDate(value).isValid, {
				message: 'Invalid card expire date',
			}),
		cardCVC: z
			.string({ required_error: 'Card CVC is required.' })
			.refine((value) => cardValid.cvv(value).isValid, { message: 'Invalid card CVC' }),
	}),
});

const promoCodeZodSchema = z.object({
	body: z.object({
		code: z.string().min(1, { message: 'code is not empty.' }),
	}),
});

export const signUpValidation = { signUpZodSchema, promoCodeZodSchema };
