import { orderBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { BiSolidCommentAdd } from 'react-icons/bi';
import { agent } from '../../../../common/api';
import { endpoint } from '../../../../common/constants';
import { splitDate } from '../../../../common/utils';
import { useAuth } from '../../../../contexts/AuthContext';
import Loader from '../../../common/Loader';
import Scrollable from './../../../common/Scrollable';

const Comments = ({ dishId }) => {
	const [isAdding, setIsAdding] = useState(false);
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [contentOnChange, setContentOnChange] = useState('');

	const { user } = useAuth();

	useEffect(() => {
		(async () => {
			try {
				const { data } = await agent.get(`${endpoint.DISHES}/${dishId}${endpoint.COMMENTS}`);
				setComments(orderBy(data, ['createdAt'], ['desc']));
				setIsLoading(false);
			} catch (e) {
				console.error(e);
				setIsLoading(false);
			}
		})();
	}, [dishId]);

	const onAdd = async () => {
		try {
			const { data } = await agent.postTokenized(`${endpoint.DISHES}/${dishId}${endpoint.COMMENTS}`, {
				content: contentOnChange
			});
			setComments(prev => [data, ...prev]);
		} catch (e) {
			console.error(e);
		}

		setIsAdding(false);
		setContentOnChange('');
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
					}}>{splitDate(x.createdAt)}</p>
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
		<Modal show={isAdding} onHide={() => setIsAdding(false)}>
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
				<Button variant="secondary" onClick={() => setIsAdding(false)}>
					Cancel
				</Button>
				<Button data-cy="add-comment-submit" variant="secondary" onClick={onAdd}>
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	</Scrollable>;
};

export default Comments;
