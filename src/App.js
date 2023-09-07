import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Routes/Register/Register';
import Home from './Routes/Home/Home';
import ChatScreen from './Routes/Chats/ChatScreen';

function App() {
	const userData = window.userData;
	const [isRegistered, setIsRegistered] = useState(userData.registered);
	const logoutHandler = () => {
		window.ipcRenderer.send('logout-user');
		setIsRegistered(false);
	};
	return (
		<div className="App">
			<Router>
				<Routes>
					{isRegistered ? (
						<Route path="/" element={<Home logoutHandler={logoutHandler} />} />
					) : (
						<Route
							path="/"
							element={<Register setIsRegistered={setIsRegistered} />}
						/>
					)}
					<Route
						path="/chats"
						element={<ChatScreen logoutHandler={logoutHandler} />}
					></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
