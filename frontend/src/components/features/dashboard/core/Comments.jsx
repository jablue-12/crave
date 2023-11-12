import { orderBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { agent } from '../../../../common/api';
import { REQUEST_TIMEOUT, endpoint } from '../../../../common/constants';
import Loader from '../../../common/Loader';
import Scrollable from './../../../common/Scrollable';

const Comments = ({ dishId }) => {
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const controller = new AbortController();
	useEffect(() => {
		(async () => {
			try {
				const timer = setTimeout(() => {
					controller.abort();
				}, REQUEST_TIMEOUT);

				// TODO - dishes
				const { data } = await agent.get(
					`${endpoint.COMMENTS}/${dishId}`,
					controller.signal);

				clearTimeout(timer);

				setComments(orderBy(data, ['date'], ['desc']));
				setIsLoading(false);
			} catch (e) {
				console.error(e);
				setIsLoading(false);
			}
		})();
	}, [dishId]);

	if (isLoading) {
		return <Loader />;
	}
	return <Scrollable height={200}>
		<ListGroup variant="flush">
			{comments.map((comment) => (
				<ListGroup.Item key={comment.id}>
					<p style={{ fontSize: '14px', wordWrap: 'break-word' }}>{comment.content}</p>
					<p style={{ fontSize: '12px', marginBottom: 0, textAlign: 'right' }}>{comment.user.email}</p>
					<p style={{ fontSize: '12px', marginBottom: 0, textAlign: 'right' }}>{comment.createdAt}</p>
				</ListGroup.Item>
			))}
		</ListGroup>
	</Scrollable>;
};

export default Comments;
