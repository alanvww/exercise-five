import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

//Page Imports
import Header from './components/Header';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import CreateUser from './pages/CreateUser';
import FirebaseConfig from './components/FirebaseConfig';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);
	const [userInformation, setUserInformation] = useState({});
	const [errors, setErrors] = useState();

	useEffect(() => {
		// Initialize Firebase
		initializeApp(FirebaseConfig);
		const auth = getAuth();

		onAuthStateChanged(auth, (user) => {
			if (user) {
				// Logged In
				setUserInformation(user);
				setLoggedIn(true);
			} else {
				setUserInformation({});
				setLoggedIn(false);
			}
			setLoading(false);
		});
	}, []);

	function logout() {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				setUserInformation({});
				setLoggedIn(false);
				setErrors();
			})
			.catch((error) => {
				console.warn(error);
				setErrors(error);
			});
	}

	if (loading) return null;

	return (
		<>
			{/* <> is <React.Fragment> */}
			<Header logout={logout} loggedIn={loggedIn} />
			{errors && <p className="Error PageWrapper">{errors}</p>}
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							!loggedIn ? (
								<Login
									setLoggedIn={setLoggedIn}
									setUserInformation={setUserInformation}
									setErrors={setErrors}
								/>
							) : (
								<Navigate to={`/user/${userInformation.uid}`} />
							)
						}
					/>
					<Route
						path="/user:id"
						element={
							loggedIn ? (
								<UserProfile userInformation={userInformation} />
							) : (
								<Navigate to="/" />
							)
						}
					/>
					<Route
						path="/create"
						element={
							!loggedIn ? (
								<CreateUser
									setLoggedIn={setLoggedIn}
									setUserInformation={setUserInformation}
									setErrors={setErrors}
								/>
							) : (
								<Navigate to={`/user/${userInformation.uid}`} />
							)
						}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
