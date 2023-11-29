import React, { useState, useEffect } from 'react';
import styles from './ChatScreen.module.css';
import Navbar from '../../Components/Navbar/Navbar';
import ChatArea from './ChatArea/ChatArea';
import Sidebar from './Sidebar/Sidebar';
import photo from '../../Assets/logo.png';

const ChatScreen = (props) => {
	// const [chats, setChats] = useState([]);

	// useEffect(() => {
	// 	const fetchChats = async () => {
	// 		try {
	// 			const serverURI = window.serverData;
	// 			const response = await fetch(`http://${serverURI}:49152/chats`);
	// 			if (!response.ok) {
	// 				throw new Error(`HTTP error! Status: ${response.status}`);
	// 			}
	// 			const data = await response.json();
	// 			setChats(data);
	// 		} catch (error) {
	// 			console.error('Error fetching chats:', error);
	// 		}
	// 	};

	// 	fetchChats();
	// }, []);

	const chats = [
		{
			id: Math.random(),
			displayImage: photo,
			displayName: 'A',
			username: 'a',
			lastMessage: 'Hi',
		},
	];

	return (
		<div className={styles.chats}>
			<Navbar logoutHandler={props.logoutHandler}></Navbar>
			<Sidebar chats={chats} />
			{/* <ChatArea /> */}
			<ChatArea to="dubey" />
		</div>
	);
};

export default ChatScreen;
