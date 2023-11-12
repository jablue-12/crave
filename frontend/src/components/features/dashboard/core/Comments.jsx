import { orderBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { BiSolidCommentAdd, BiSolidEditAlt } from 'react-icons/bi';
import { agent } from '../../../../common/api';
import { REQUEST_TIMEOUT, endpoint } from '../../../../common/constants';
import { useAuth } from '../../../../contexts/AuthContext';
import Loader from '../../../common/Loader';
import { mockComments } from './../../../../sample/mockComments';
import Scrollable from './../../../common/Scrollable';

const Comments = ({ dishId }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [comments, setComments] = useState(mockComments);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedComment, setSeletedComment] = useState(null);

	const { user } = useAuth();

	const controller = new AbortController();
	useEffect(() => {
		(async () => {
			try {
				const timer = setTimeout(() => {
					controller.abort();
				}, REQUEST_TIMEOUT);

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

	const onSelect = comment => {
		setSeletedComment(comment);
		setIsEditing(true);
	};

	const onUnSelect = () => {
		setSeletedComment(null);
		setIsEditing(false);
	};

	const onEdit = async () => {
		try {
			await agent.putTokenized(
				`${endpoint.DISHES}/${dishId}${endpoint.COMMENTS}/${selectedComment.id}`,
				selectedComment);
			setComments(prev => prev.map(x => x.id === selectedComment.id
				? selectedComment
				: x));
		} catch (e) {
			console.error(e);
		}
		setIsEditing(false);
	};

	const onAdd = async () => {
		try {
			await agent.postTokenized(
				`${endpoint.DISHES}/${dishId}${endpoint.COMMENTS}`,
				selectedComment);
			setComments(prev => [...prev, selectedComment]);
		} catch (e) {
			console.error(e);
		}
		setIsAdding(false);
	};

	if (isLoading) {
		return <Loader />;
	}
	return <Scrollable height={180}>
		<ListGroup variant="flush">
			{comments.map((x) => (
				<ListGroup.Item key={x.id}>
					{user && user.email === x.email && <BiSolidEditAlt
						style={{
							position: 'absolute',
							top: 5,
							right: 5
						}}
						onClick={() => onSelect(x)}
					/>}
					<p style={{
						fontSize: '14px',
						wordWrap: 'break-word'
					}}
					>{x.content}</p>
					<p style={{
						fontSize: '12px',
						marginBottom: 0,
						textAlign: 'right'
					}}>{x.date}</p>
				</ListGroup.Item>
			))}
			{user && <ListGroup.Item style={{
				display: 'flex',
				justifyContent: 'end',
				alignItems: 'center'
			}}>
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
						<Form.Control as="textarea" rows={5} value={selectedComment} onChange={e => setSeletedComment(e.target.value)}/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onUnSelect}>
					X
				</Button>
				<Button variant="primary" onClick={onEdit}>
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
						<Form.Control as="textarea" rows={5} value={selectedComment} onChange={e => setSeletedComment(e.target.value)}/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => setIsAdding(false)}>
					X
				</Button>
				<Button variant="primary" onClick={onAdd}>
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	</Scrollable>;
};

export default Comments;
