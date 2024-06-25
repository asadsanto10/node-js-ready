export function generateRandomNumber(digits = 6): number {
	const min = 10 ** (digits - 1);
	const max = 10 ** digits - 1;

	return Math.floor(Math.random() * (max - min + 1)) + min;
}
