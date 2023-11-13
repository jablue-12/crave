import { replace, split } from 'lodash';

export const splitDate = date => {
	return replace(split(date, '.')[0], 'T', ' ');
};
