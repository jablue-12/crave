import React from 'react';
import { Container, Card, Col, Row, CloseButton } from 'react-bootstrap';

const Ingredient = (props) => {
	const { onButtonClick, ingredient } = props;
	const deleteIngredient = () => {
		onButtonClick(`${ingredient.id}`);
	};

	return (
		<Card className="mb-2 bg-info">
			<Container>
				<Row className="p-1">
					<Col className="text-bg-info">
						{`${ingredient.name} (${ingredient.quantity}g)`}
					</Col>
					<Col xs="auto">
						<CloseButton onClick={deleteIngredient}/>
					</Col>
				</Row>
			</Container>
		</Card>
	);
};

export default Ingredient;
