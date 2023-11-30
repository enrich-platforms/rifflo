import { useState, useEffect } from 'react';

const Message = ({ sender, message }) => (
	<div>
		<strong>{sender}: </strong>
		{message}
	</div>
);

const ChatHistory = ({ username }) => {
	const [chatHistory, setChatHistory] = useState({});
	const [loading, setLoading] = useState(true);

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

	return (
		<div>
			{loading && <p>Loading...</p>}
			{!loading && chatHistory.messages && (
				<div>
					{chatHistory.messages.map((msg, index) => (
						<Message key={index} sender={msg.sender} message={msg.message} />
					))}
				</div>
			)}
		</div>
	);
};

export default ChatHistory;
