import { orderBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { BiSolidCommentAdd } from 'react-icons/bi';
import { restful } from '../../../../common/api';
import { endpoint } from '../../../../common/constants';
import { splitDate } from '../../../../common/utils';
import { useAuth } from '../../../../contexts/AuthContext';
import { FeedbackMessage } from '../../../common/FeedbackMessage';
import Loader from '../../../common/Loader';
import Scrollable from './../../../common/Scrollable';

const Comments = ({ dishId }) => {
	const [isAdding, setIsAdding] = useState(false);
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [contentOnChange, setContentOnChange] = useState('');
	const [isContentOnChangeLoading, setIsContentOnChangeLoading] = useState(false);
	const [feedbackMessage, setFeedbackMessage] = useState('');

	const { user } = useAuth();

	const getSuccessFeedback = () => {
		return {
			variant: 'success',
			messageHeader: '',
			messageDescription: 'New Comment has been added'
		};
	};

	const getErrorFeedback = () => {
		return {
			variant: 'danger',
			messageHeader: '',
			messageDescription: 'Failed to add your comment. Please try again.'
		};
	};

	useEffect(() => {
		(async () => {
			try {
				const { data } = await restful.get(`${endpoint.DISHES}/${dishId}${endpoint.COMMENTS}`);
				setComments(orderBy(data, ['createdAt'], ['desc']));
				setIsLoading(false);
			} catch (e) {
				console.error(e);
				setIsLoading(false);
			}
		})();
	}, [dishId]);

	const onAdd = async () => {
		setIsContentOnChangeLoading(true);
		try {
			const { data } = await restful.auth.json.post(`${endpoint.DISHES}/${dishId}${endpoint.COMMENTS}`, {
				content: contentOnChange
			});
			setComments(prev => [data, ...prev]);
			setFeedbackMessage(getSuccessFeedback);
		} catch (e) {
			console.error(e);
			setFeedbackMessage(getErrorFeedback);
		} finally {
			setIsAdding(false);
			setContentOnChange('');
			setIsContentOnChangeLoading(false);

			setTimeout(() => {
				setFeedbackMessage(null);
			}, 3000);
		}
	};

	if (isLoading) {
		return <Loader />;
	}

	return <Scrollable height={180}>
		<ListGroup variant="flush">
			{comments.map(x => (
				<ListGroup.Item key={x.id}>
					<p data-cy="comment-content" style={{
						fontSize: '14px',
						wordWrap: 'break-word'
					}}
					>{x.content}</p>
					<p style={{
						fontSize: '12px',
						marginBottom: 0,
						textAlign: 'right'
					}}>
						<strong>Author:</strong> {x.fullName}
						<br/>
						{splitDate(x.createdAt)}
					</p>
				</ListGroup.Item>
			))}
			{user && <ListGroup.Item
				data-cy="add-comment"
				onClick={() => setIsAdding(true)}
				style={{
					display: 'flex',
					justifyContent: 'end',
					alignItems: 'center'
				}}
			>
				<span className="add-comment">
					<BiSolidCommentAdd />
				</span>
			</ListGroup.Item>}
		</ListGroup>
		<Modal size="sm" show={isAdding} onHide={() => setIsAdding(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Add</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group
						className="mb-3"
						controlId="exampleForm.ControlTextarea1"
					>
						<Form.Control
							data-cy="add-comment-textarea"
							as="textarea"
							rows={3}
							value={contentOnChange}
							onChange={e => setContentOnChange(e.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button data-cy="add-comment-submit" variant="secondary" onClick={onAdd} disabled={isContentOnChangeLoading}>
					{isContentOnChangeLoading
						? (
							<>
								<Spinner size="sm"/> Loading...
							</>)
						: 'Add'}
				</Button>
				<Button variant="secondary" onClick={() => setIsAdding(false)}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
		{feedbackMessage &&
			<FeedbackMessage
				variant={feedbackMessage.variant}
				messageHeader={feedbackMessage.messageHeader}
				messageDescription={feedbackMessage.messageDescription}/>}
	</Scrollable>;
};

export default Comments;
