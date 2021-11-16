import React from 'react';

function Header() {
	return (
		<header className="Header">
			<div className="Logo">Exercise Five</div>
			<nav>
				<a href="/">Login</a>
				<a href="/create">Sign up</a>
				<a href="/user:id">User Profile</a>
			</nav>
		</header>
	);
}

export default Header;
