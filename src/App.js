import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Routes/Register/Register';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Register />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
