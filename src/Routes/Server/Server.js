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
			const serverURI = formData.get('server').trim();
			fetch(`http://${serverURI}:49152/send-profile`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(window.userData),
			}).catch((error) => {
				console.error('Error:', error);
			});

			try {
				window.ipcRenderer.send('set-server', serverURI);
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
							<div className={styles['server-options']}>
								<label className={styles['server-option']}>
									<input
										type="radio"
										name="serverOption"
										value="join"
										checked={selectedOption === 'join'}
										onChange={() => {
											setSelectedOption('join');
											window.ipcRenderer.send('set-hostip');
										}}
									/>
									<span className={styles['option-name']}>Join</span>
								</label>
								<label className={styles['server-option']}>
									<input
										type="radio"
										name="serverOption"
										value="host"
										checked={selectedOption === 'host'}
										onChange={() => {
											setSelectedOption('host');
										}}
									/>
									<span className={styles['option-name']}>Host</span>
								</label>
							</div>
							{selectedOption === 'join' && (
								<>
									<label htmlFor="join">
										<span className={styles['label-text']}>Server</span>
										<input
											name="server"
											type="text"
											placeholder="Enter server address"
										/>
									</label>
									<button type="submit">Join</button>
								</>
							)}
							{selectedOption === 'host' && (
								<>
									<label htmlFor="host">
										<span className={styles['join-info']}>
											Send this to people you want to connect with.
										</span>
										<span className={styles['label-text']}>
											{window.localIPAddress}
										</span>
									</label>
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
