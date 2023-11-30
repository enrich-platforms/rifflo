import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Routes/Register/Register';
import Home from './Routes/Home/Home';
import ChatScreen from './Routes/Chats/ChatScreen';
import Server from './Routes/Server/Server';

function App() {
	const [isRegistered, setIsRegistered] = useState(false);
	const logoutHandler = () => {
		window.ipcRenderer.send('logout-user');
		setIsRegistered(false);
	};

	useEffect(() => {
		setIsRegistered(window.userData);
	}, [window.userData]);
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
					<Route
						path="/server"
						element={<Server logoutHandler={logoutHandler} />}
					></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
