import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Page Imports
import Header from './components/Header';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import CreateUser from './pages/CreateUser';

function App() {
	return (
		<>
			{/* <> is <React.Fragment> */}
			<Header />
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/user:id" element={<UserProfile />} />
					<Route path="/create" element={<CreateUser />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
