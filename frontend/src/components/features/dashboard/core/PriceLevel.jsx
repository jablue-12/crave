import { range } from 'lodash';
import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { MdCurrencyPound } from 'react-icons/md';
=======
import { MdCurrencyYen } from 'react-icons/md';
>>>>>>> 85a6cf9... Refactor frontend
=======
import { MdCurrencyPound } from 'react-icons/md';
>>>>>>> 9dcfcdc... Add contants and logo image

const PriceLevel = ({ level }) => {
	return <span>
		{range(level).map((n, i) =>
			<span key={i}>
<<<<<<< HEAD
<<<<<<< HEAD
				<MdCurrencyPound />
=======
				<MdCurrencyYen />
>>>>>>> 85a6cf9... Refactor frontend
=======
				<MdCurrencyPound />
>>>>>>> 9dcfcdc... Add contants and logo image
			</span>)}
	</span>;
};

export default PriceLevel;
