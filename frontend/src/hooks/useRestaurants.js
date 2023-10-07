import useStorageOperations from './useStorageOperations';

function useRestaurants () {
	const PATH = '/restaurants';

	const {
		records,
		error,
		requestStatus
	} = useStorageOperations(PATH);

	return {
		records,
		error,
		requestStatus
	};
}

export default useRestaurants;
