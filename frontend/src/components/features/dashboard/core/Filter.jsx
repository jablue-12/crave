import { includes, orderBy, union, without } from 'lodash';
import React, { useState } from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { restful } from '../../../../common/api';
import { tags } from './../../../../common/dishTags';

const Filter = ({ setDishes, setSelectedDish }) => {
	const [selectedTags, setSelectedTags] = useState([]);

	const onSelectTag = (tag) => {
		const updatedTags = includes(selectedTags, tag)
			? without(selectedTags, tag)
			: union(selectedTags, [tag]);

		setSelectedTags(updatedTags);

		(async () => {
			try {
				const { data } = await restful.get(`/dishes?tags=${updatedTags.join(',')}`);
				setDishes(orderBy(data, ['rating'], ['desc']));
			} catch (e) {
				console.error(e);
			}
		})();

		setSelectedDish(null);
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
