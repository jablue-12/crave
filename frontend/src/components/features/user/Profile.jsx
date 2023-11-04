import React from 'react';
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis
} from 'recharts';

const data = [
	'Pizza',
	'Sushi',
	'Burgers',
	'Pasta',
	'Tacos',
	'Salads',
	'Sandwiches',
	'Desserts',
	'Seafood',
	'Vegetarian'
].map(category => ({
	category,
	score: Math.floor(Math.random() * 100),
	fullMark: 100
}));

export default function Profile () {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
			<RadarChart
				cx={300}
				cy={250}
				outerRadius={150}
				width={500}
				height={500}
				data={data}
			>
				<PolarGrid />
				<PolarAngleAxis dataKey="category" />
				<PolarRadiusAxis />
				<Radar
					name="Mike"
					dataKey="score"
					stroke="#82ca9d"
					fill="#82ca9d"
					fillOpacity={0.6}
				/>
			</RadarChart>
		</div>
	);
}
