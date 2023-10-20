import { DASHBOARD_URL } from '../constants/urls';
import useStorageOperations from './useStorageOperations';

function useRestaurants () {
	const {
		records,
		error,
		requestStatus
	} = useStorageOperations(DASHBOARD_URL);

	return {
		records,
		error,
		requestStatus
	};
}

export default useRestaurants;
