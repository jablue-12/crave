import React from 'react';
import './App.css';

function App () {
	const buttonClick = () => {
		alert('Hello world!');
	};

	return (
		<div className="App">
			<header className="App-header">
				Crave Application
				<div>
					<button className="btn btn-primary" onClick={buttonClick}>Bootstrap Button</button>
				</div>
			</header>
		</div>
	);
}

export default App;
