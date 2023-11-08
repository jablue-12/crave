import React from 'react';

const Scrollable = ({ children, height }) => {
	const containerStyle = {
		overflowY: 'auto',
		overflowX: 'hidden',
		maxHeight: `${height}px`,
		WebkitOverflowScrolling: 'touch'
	};

	const scrollbarStyle = `
        ::-webkit-scrollbar {
            width: 5px;
        }
        ::-webkit-scrollbar-thumb {
            background: lightgrey;
            border-radius: 5px;
        }
    `;

	return <div style={containerStyle}>
		<style>{scrollbarStyle}</style>
		{children}
	</div>;
};

export default Scrollable;
