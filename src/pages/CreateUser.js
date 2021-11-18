import React from 'react';
import { useCallback } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import CreateUserForm from '../components/CreateUserForm';

function CreateUser({ setLoggedIn, setUserInformation }) {
	const signUpUser = useCallback((e) => {
		e.preventDefault();

		const email = e.currentTarget.email.value;
		const password = e.currentTarget.password.value;

		console.log({ email, password });

		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				setLoggedIn(true);
				setUserInformation({
					email: user.email,
					displayName: user.displayName,
					uid: user.uid,
					accessToken: user.accessToken,
				});
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log({ error });
			});
	}, []);

	return (
		<div>
			<h1>Create User</h1>
			<CreateUserForm signUpUser={signUpUser} />
		</div>
	);
}

export default CreateUser;
