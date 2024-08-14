import { APIContracts, APIControllers, Constants } from 'authorizenet';
import httpStatus from 'http-status';
import variable from '../../../config';
import { merchantAuthenticationType } from '../../../config/authorized-net-config';
import ApiError from '../../../errors/apiError';
import { ISubscriptionPayment } from './sign-up.interface';

const isProductionPayment =
	variable.nodeENV === 'production' ? Constants.endpoint.production : Constants.endpoint.sandbox;

export const subscriptionPayment = (
	data: ISubscriptionPayment
): Promise<{ subscriptionId: string }> => {
	return new Promise((resolve, reject) => {
		const {
			firstname,
			lastname,
			email,
			address,
			city,
			zipcode,
			primaryPhone,
			price,
			randomNumber,
			cardNumber,
			cardExpDate,
			cardCVC,
			stateId,
		} = data;

		const interval = new APIContracts.PaymentScheduleType.Interval();
		interval.setLength(1);
		interval.setUnit(APIContracts.ARBSubscriptionUnitEnum.MONTHS);

		const paymentScheduleType = new APIContracts.PaymentScheduleType();
		paymentScheduleType.setInterval(interval);
		paymentScheduleType.setStartDate(new Date().toISOString().substring(0, 10));
		paymentScheduleType.setTotalOccurrences(9999); // ? 9999 value is No End Date (ongoing subscription)
		// paymentScheduleType.setTrialOccurrences(0);

		const creditCard = new APIContracts.CreditCardType();
		creditCard.setCardNumber(cardNumber);
		creditCard.setExpirationDate(cardExpDate);
		creditCard.setCardCode(cardCVC);

		const billTo = new APIContracts.NameAndAddressType();
		billTo.setFirstName(firstname);
		billTo.setLastName(lastname);
		billTo.setAddress(address);
		billTo.setCity(city);
		billTo.setState(stateId);
		billTo.setZip(zipcode);

		const paymentType = new APIContracts.PaymentType();
		paymentType.setCreditCard(creditCard);

		const orderDetails = new APIContracts.OrderType();
		orderDetails.setInvoiceNumber(`INV-${randomNumber}`);
		orderDetails.setDescription('soffie-cares plan purches');

		const customer = new APIContracts.CustomerType();
		customer.setType(APIContracts.CustomerTypeEnum.INDIVIDUAL);
		customer.setId(randomNumber);
		customer.setEmail(email);
		customer.setPhoneNumber(primaryPhone);

		const arbSubscription = new APIContracts.ARBSubscriptionType();
		arbSubscription.setName(`${firstname}-${lastname}-subscription`);
		arbSubscription.setPaymentSchedule(paymentScheduleType);
		arbSubscription.setAmount(price);
		// arbSubscription.setTrialAmount('0');
		arbSubscription.setPayment(paymentType);
		arbSubscription.setOrder(orderDetails);
		arbSubscription.setCustomer(customer);
		arbSubscription.setBillTo(billTo);

		const createRequest = new APIContracts.ARBCreateSubscriptionRequest();
		createRequest.setMerchantAuthentication(merchantAuthenticationType);
		createRequest.setSubscription(arbSubscription);

		const ctrl = new APIControllers.ARBCreateSubscriptionController(createRequest.getJSON());
		// Defaults to sandbox
		ctrl.setEnvironment(isProductionPayment);

		ctrl.execute(() => {
			const apiResponse = ctrl.getResponse();
			const response = new APIContracts.ARBCreateSubscriptionResponse(apiResponse);

			if (response !== null) {
				const getText = response.getMessages().getMessage()[0].getText();
				if (response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
					resolve({ subscriptionId: response.getSubscriptionId() });
				} else {
					reject(new ApiError(httpStatus.BAD_REQUEST, getText));
				}
			} else {
				reject(new ApiError(httpStatus.BAD_REQUEST, 'Payment failed or something went wrong'));
			}
		});
	});
};

export const cancelSubscription = (subscriptionId: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const cancelRequest = new APIContracts.ARBCancelSubscriptionRequest();
		cancelRequest.setMerchantAuthentication(merchantAuthenticationType);
		cancelRequest.setSubscriptionId(subscriptionId);

		const ctrl = new APIControllers.ARBCancelSubscriptionController(cancelRequest.getJSON());
		// Defaults to sandbox
		ctrl.setEnvironment(isProductionPayment);
		ctrl.execute(() => {
			const apiResponse = ctrl.getResponse();
			const response = new APIContracts.ARBCancelSubscriptionResponse(apiResponse);

			if (response !== null) {
				const getText = response.getMessages().getMessage()[0].getText();
				if (response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
					resolve('Subcription cancelled successfully');
				} else {
					reject(new ApiError(httpStatus.BAD_REQUEST, getText));
				}
			} else {
				reject(
					new ApiError(httpStatus.BAD_REQUEST, 'Subscription cancel failed or something went wrong')
				);
			}
		});
	});
};
