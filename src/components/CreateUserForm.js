import React from 'react';

function CreateUserForm({ signUpUser }) {
	return (
		<div className="Form">
			<h2>Create User Form</h2>
			<form onSubmit={(e) => signUpUser(e)}>
				<label htmlFor="email">Email</label>
				<input type="email" name="email" placeholder="Enter Email" />

				<label htmlFor="password">Password</label>
				<input type="password" name="password" placeholder="****" />

				<button type="submit">Create User</button>
			</form>
		</div>
	);
}

export default CreateUserForm;
