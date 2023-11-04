import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Scrollable from './../../../common/Scrollable';

const Comments = ({ comments }) => {
	return <Scrollable height={300}>
		<ListGroup variant="flush">
			{comments.map((x) => (
				<ListGroup.Item key={x.id}>
					<p style={{ fontSize: '14px', wordWrap: 'break-word' }}>{x.content}</p>
					<p style={{ fontSize: '12px', marginBottom: 0, textAlign: 'right' }}>{x.date}</p>
				</ListGroup.Item>
			))}
		</ListGroup>
	</Scrollable>;
};

export default Comments;
