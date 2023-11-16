import { includes, union, without } from 'lodash';
import React, { useState } from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { agent } from '../../../../common/api';
import { tags } from './../../../../common/dishTags';

const Filter = ({ setDishes }) => {
	const [selectedTags, setSelectedTags] = useState([]);

	const onSelectTag = (tag) => {
		const updatedTags = includes(selectedTags, tag)
			? without(selectedTags, tag)
			: union(selectedTags, [tag]);

		setSelectedTags(updatedTags);

		(async () => {
			try {
				const { data } = await agent.get(`/dishes?tags=${updatedTags.join(',')}`);
				setDishes(data);
			} catch (e) {
				console.error(e);
			}
		})();
	};

	return <Row>
		{tags.map((tag) => (
			<Col key={tag} md={5}>
				<Badge
					data-cy="filter-tag"
					key={tag}
					pill
					bg={selectedTags.includes(tag) ? 'success' : 'secondary'}
					onClick={() => onSelectTag(tag)}
					style={{
						cursor: 'pointer'
					}}
				>
					{tag}
				</Badge>
			</Col>
		))}
	</Row>;
};

export default Filter;
