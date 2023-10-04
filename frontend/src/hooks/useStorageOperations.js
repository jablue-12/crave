import axios from 'axios';
import { useEffect, useState } from 'react';
import { requestState } from '../constants/requestState';

const BASE_URL = 'http://localhost:3500';

function useStorageOperations (path) {
	const [records, setRecords] = useState();
	const [error, setError] = useState();
	const [requestStatus, setRequestStatus] = useState(requestState.PENDING);

	useEffect(() => {
		(async () => {
			try {
				setRequestStatus(requestState.PENDING);

				const { data } = await axios.get(BASE_URL + path);

				setRecords(data);
				setRequestStatus(requestState.SUCCESS);
			} catch (e) {
				setError(e);
				setRequestStatus(requestState.FAILED);
			}
		})();
	}, [path]);

	return {
		records,
		requestStatus,
		error
	};
}

export default useStorageOperations;
