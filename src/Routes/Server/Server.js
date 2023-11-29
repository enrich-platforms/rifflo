import Navbar from '../../Components/Navbar/Navbar';
import styles from './Server.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Server = (props) => {
	const [selectedOption, setSelectedOption] = useState('join');
	const navigate = useNavigate();

	const startSever = () => {
		window.ipcRenderer.send('start-server');
	};

	const formHandler = async (event) => {
		event.preventDefault();
		if (selectedOption === 'join') {
			const formData = new FormData(event.target);
			const server = formData.get('server');
			try {
				window.ipcRenderer.send('set-server', server);
			} catch (error) {
				console.log(error);
			}
			navigate('/chats');
		} else if (selectedOption === 'host') {
			startSever();
			navigate('/chats');
		}
	};

	return (
		<div className={styles.container}>
			<Navbar logoutHandler={props.logoutHandler}>Join or Host Server</Navbar>
			<div className={styles.main}>
				<div className={styles['form-container']}>
					<form onSubmit={formHandler}>
						<div className={styles['form-wrapper']}>
							<label>
								<span className={styles['label-text']}>Select an option:</span>
							</label>
							<div>
								<label>
									<input
										type="radio"
										name="serverOption"
										value="join"
										checked={selectedOption === 'join'}
										onChange={() => setSelectedOption('join')}
									/>
									Join
								</label>
								<label>
									<input
										type="radio"
										name="serverOption"
										value="host"
										checked={selectedOption === 'host'}
										onChange={() => setSelectedOption('host')}
									/>
									Host
								</label>
							</div>
							{selectedOption === 'join' && (
								<>
									<label htmlFor="server">
										<span className={styles['label-text']}>Server</span>
										<input
											name="server"
											type="text"
											placeholder="Enter server address"
										/>
									</label>
									<button>Join</button>
								</>
							)}
							{selectedOption === 'host' && (
								<>
									<button type="submit">Host</button>
								</>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Server;
