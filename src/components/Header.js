import React from 'react';

function Header({ logout, loggedIn }) {
	return (
		<header className="Header">
			<div className="Logo">Exercise Five</div>
			<nav>
				{!loggedIn && (
					<>
						<a href="/">Login</a>
						<a href="/create">Sign up</a>
					</>
				)}
				{loggedIn && (
					<>
						<a href="/user:id">User Profile</a>
						<button onClick={() => logout()}>Log Out</button>
					</>
				)}
			</nav>
		</header>
	);
}

export default Header;
