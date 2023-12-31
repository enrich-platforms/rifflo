import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatScreen.module.css';
import ChatArea from './ChatArea/ChatArea';
import Sidebar from './Sidebar/Sidebar';

const ChatScreen = () => {
	const [chatsData, setChatsData] = useState([]);
	const [to, setTo] = useState('');
	const [loading, setLoading] = useState(true);
	const fetchInterval = useRef(null);

	const fetchChats = async () => {
		try {
			const serverURI = window.serverData;
			const response = await fetch(
				`http://${serverURI}:49152/chats?ownerUsername=${window.userData.ownerUsername}`
			);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			setChatsData(data);
			setLoading(false);
		} catch (error) {
			clearInterval(fetchInterval.current);
			console.error('Error fetching chats:', error);
		}
	};

	useEffect(() => {
		// Fetch messages initially
		const fetchTimeout = setTimeout(() => {
			fetchChats();
			fetchInterval.current = setInterval(fetchChats, 500);
		}, 1000);

		return () => {
			clearTimeout(fetchTimeout);
			clearInterval(fetchInterval.current);
		};
	}, []);

	return (
		<div className={styles.chats}>
			<Sidebar
				to={to}
				chats={chatsData.chats}
				setTo={setTo}
				loading={loading}
			/>
			<ChatArea to={to} fetchChats={fetchChats} statuses={chatsData.statuses} />
		</div>
	);
};

export default ChatScreen;
