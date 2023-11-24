import React from 'react';

const SubmitButton = ({ onSubmit, disabled, children }) => {
	return <div
		className={`${disabled ? 'submit-disabled' : ''} bubble submit mx-auto my-3`}
		onClick={onSubmit}
	>{children}</div>;
};

export default SubmitButton;
