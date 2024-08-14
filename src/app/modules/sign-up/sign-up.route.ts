import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { promoCodeCalculation, signUp } from './sign-up.controller';
import { signUpValidation } from './sign-up.validation';

const router = express.Router();

router.post(
	'/promo-code',
	validateRequest(signUpValidation.promoCodeZodSchema),
	promoCodeCalculation
);
// validateRequest(signUpValidation.signUpZodSchema), verifyToken
router.post('/', validateRequest(signUpValidation.signUpZodSchema), signUp);

export const signupRoute = router;
