const registered = ({ response }) => {
	expect(response.statusCode).to.equal(200);
	expect(response.body.statusMessage).to.equal('Successful registration');
};

const loggedIn = ({ response }) => {
	expect(response.statusCode).to.equal(200);
	expect(response.body.statusMessage).to.equal('Successful login');
};

export const assert = {
	registered,
	loggedIn
};
