import { sampleSize } from 'lodash';

export const generateString = () => {
	const chars = 'abcdefghijklmnopqrstuvwxyz';
	const result = sampleSize(chars, 5).join('');
	return result;
};
