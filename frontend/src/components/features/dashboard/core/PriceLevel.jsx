import { range } from 'lodash';
import React from 'react';
import { MdCurrencyYen } from 'react-icons/md';

const PriceLevel = ({ level }) => {
	return <span>
		{range(level).map((n, i) =>
			<span key={i}>
				<MdCurrencyYen />
			</span>)}
	</span>;
};

export default PriceLevel;
