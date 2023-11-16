<<<<<<< HEAD
<<<<<<< HEAD
import { orderBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { BiSolidCommentAdd, BiSolidEditAlt } from 'react-icons/bi';
import { agent } from '../../../../common/api';
import { endpoint } from '../../../../common/constants';
import { splitDate } from '../../../../common/utils';
import { useAuth } from '../../../../contexts/AuthContext';
import Loader from '../../../common/Loader';
import Scrollable from './../../../common/Scrollable';

const Comments = ({ dishId }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [contentOnChange, setContentOnChange] = useState('');
	const [commentIdOnEdit, setCommentIdOnEdit] = useState(-1);

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

	const onSelect = ({ id, content }) => {
		setContentOnChange(content);
		setCommentIdOnEdit(id);
		setIsEditing(true);
	};

	const onUnSelect = () => {
		setContentOnChange('');
		setCommentIdOnEdit(-1);
		setIsEditing(false);
	};

	const onEdit = async () => {
		try {
			const { data } = await agent.putTokenized(`${endpoint.DISHES}/${dishId}${endpoint.COMMENTS}/${commentIdOnEdit}`, {
				content: contentOnChange
			});
			setComments(prev => prev.map(x => x.id === commentIdOnEdit ? data : x));
		} catch (e) {
			console.error(e);
		}

		setIsEditing(false);
		setContentOnChange('');
		setCommentIdOnEdit(-1);
	};

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
					{user && user.email === x.email &&
					<BiSolidEditAlt
						style={{
							position: 'absolute',
							top: 5,
							right: 5
						}}
						onClick={() => onSelect(x)}
					/>}
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
				<BiSolidCommentAdd />
			</ListGroup.Item>}
		</ListGroup>
		<Modal show={isEditing} onHide={onUnSelect}>
			<Modal.Header closeButton>
				<Modal.Title>Edit</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group
						className="mb-3"
						controlId="exampleForm.ControlTextarea1"
					>
						<Form.Control
							as="textarea"
							rows={3}
							value={contentOnChange}
							onChange={e => setContentOnChange(e.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onUnSelect}>
					Cancel
				</Button>
				<Button variant="secondary" onClick={onEdit}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
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
=======
import React from 'react';
=======
import { orderBy } from 'lodash';
import React, { useState, useEffect } from 'react';
>>>>>>> c506b18... Add dish tags and search by tag
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
					`${endpoint.DISHES}/${dishId}${endpoint.COMMENTS}`,
					controller.signal);

				clearTimeout(timer);

				setComments(orderBy(data, ['date'], ['desc']));
				setIsLoading(false);
			} catch (e) {
				console.error(e);
				setIsLoading(false);
			}
		})();
	}, []);

	if (isLoading) {
		return <Loader />;
	}
	return <Scrollable height={200}>
		<ListGroup variant="flush">
			{comments.map((x) => (
				<ListGroup.Item key={x.id}>
					<p style={{ fontSize: '14px', wordWrap: 'break-word' }}>{x.content}</p>
					<p style={{ fontSize: '12px', marginBottom: 0, textAlign: 'right' }}>{x.date}</p>
				</ListGroup.Item>
			))}
		</ListGroup>
>>>>>>> 85a6cf9... Refactor frontend
	</Scrollable>;
};

export default Comments;
