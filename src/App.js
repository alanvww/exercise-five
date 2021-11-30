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

	useEffect(() => {
		// Initialize Firebase
		const app = initializeApp(FirebaseConfig);
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
			})
			.catch((error) => {
				console.warn(error);
			});
	}

	if (loading) return null;

	return (
		<>
			{/* <> is <React.Fragment> */}
			<Header logout={logout} loggedIn={loggedIn} />
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							!loggedIn ? (
								<Login
									setLoggedIn={setLoggedIn}
									setUserInformation={setUserInformation}
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
