import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

//Page Imports
import Header from './components/Header';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import CreateUser from './pages/CreateUser';
import FirebaseConfig from './components/FirebaseConfig';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setloading] = useState(true);
	const [userInformation, setUserInformation] = useState({});

	useEffect(() => {
		// Initialize Firebase
		const app = initializeApp(FirebaseConfig);
		const analytics = getAnalytics(app);

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
			setloading(false);
		});
	}, []);

	if (loading) return null;

	return (
		<>
			{/* <> is <React.Fragment> */}
			<Header />
			<p>User {loggedIn ? `IS LOGGED IN` : `IS NOT LOGGED IN`}</p>
			<p>Email: {userInformation.email}</p>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/user:id" element={<UserProfile />} />
					<Route
						path="/create"
						element={
							<CreateUser
								setLoggedIn={setLoggedIn}
								setUserInformation={setUserInformation}
							/>
						}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
