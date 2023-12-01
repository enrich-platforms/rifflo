import React, { useState, useEffect } from 'react';
import styles from './ChatScreen.module.css';
import Navbar from '../../Components/Navbar/Navbar';
import ChatArea from './ChatArea/ChatArea';
import Sidebar from './Sidebar/Sidebar';

const ChatScreen = (props) => {
	const [chats, setChats] = useState([]);
	const [to, setTo] = useState('');
	const [loading, setLoading] = useState(true);

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
			setChats(data);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching chats:', error);
		}
	};

	useEffect(() => {
		let fetchInterval;
		// Fetch messages initially
		const fetchTimeout = setTimeout(() => {
			fetchChats();
			fetchInterval = setInterval(fetchChats, 500);
		}, 1000);

		return () => {
			clearInterval(fetchTimeout);
			clearInterval(fetchInterval);
		};
	}, []);

	return (
		<div className={styles.chats}>
			<Navbar logoutHandler={props.logoutHandler}></Navbar>
			<Sidebar to={to} chats={chats} setTo={setTo} loading={loading} />
			<ChatArea to={to} fetchChats={fetchChats} />
		</div>
	);
};

export default ChatScreen;
