import { useState, useEffect, useRef } from 'react';
import styles from './ChatHistory.module.css';
import loadingGIF from './../../../Assets/chat-loading.gif';

const Message = ({ sender, message, timestamp }) => {
	return (
		<div className={`${styles['message']}`}>
			<div
				className={`${styles['message-wrapper']} ${
					sender === `${window.userData.ownerUsername}`
						? `${styles['owner']}`
						: `${styles['other']}`
				}`}
			>
				<div className={`${styles['message-container']}`}>
					<span className={styles['message-text']}>{message}</span>
				</div>
				<div className={styles['timestamp']}>{timestamp}</div>
			</div>
		</div>
	);
};

const ChatHistory = ({ username }) => {
	const [chatHistory, setChatHistory] = useState({});
	const [loading, setLoading] = useState(true);
	const divRef = useRef(null);

	const fetchMessages = () => {
		const serverURI = window.serverData;

		fetch(`http://${serverURI}:49152/messages?username=${username}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setChatHistory(JSON.parse(data));
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setLoading(false);
			});
	};

	useEffect(() => {
		let intervalId;
		// Fetch messages initially
		setTimeout(() => {
			fetchMessages();
			// Fetch messages every 2 seconds
			intervalId = setInterval(fetchMessages, 500);
		}, 1000);

		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		if (divRef.current) {
			divRef.current.scrollTop = divRef.current.scrollHeight;
		}
	}, [loading]);

	return (
		<div className={styles['chat-history']}>
			{loading && (
				<div className={styles['loading']}>
					<img src={loadingGIF} alt="loading" />
				</div>
			)}
			{!loading && chatHistory.messages && (
				<div className={styles['chat-wrapper']} ref={divRef}>
					{chatHistory.messages.map((msg, index) => (
						<Message
							key={index}
							sender={msg.sender}
							message={msg.message}
							timestamp={new Date(msg.timestamp).toLocaleString('en-US', {
								hour: '2-digit',
								minute: '2-digit',
							})}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ChatHistory;
