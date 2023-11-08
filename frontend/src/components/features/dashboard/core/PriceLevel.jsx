import { range } from 'lodash';
import React from 'react';
import { MdCurrencyPound } from 'react-icons/md';

const PriceLevel = ({ level }) => {
	return <span>
		{range(level).map((n, i) =>
			<span key={i}>
				<MdCurrencyPound />
			</span>)}
	</span>;
};

export default PriceLevel;
