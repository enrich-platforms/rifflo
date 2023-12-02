import React, { useEffect, useState } from 'react';
import styles from './ChatDetails.module.css';
import userIcon from './../../../Assets/icons/UI/user.svg';

const ChatDetails = ({ user, statuses }) => {
	const [userPhoto, setUserPhoto] = useState(userIcon);
	const [displayName, setDisplayName] = useState(user);
	const fetchChats = async () => {
		try {
			const serverURI = window.serverData;
			const response = await fetch(
				`http://${serverURI}:49152/profiles?username=${user}`
			);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			let parsedData = data;
			while (typeof parsedData === 'string') {
				parsedData = JSON.parse(parsedData);
			}
			if (parsedData.displayImage) {
				setUserPhoto(parsedData.displayImage);
			} else {
				setUserPhoto(userIcon);
			}
			if (parsedData.displayName) {
				setDisplayName(parsedData.displayName);
			} else {
				setDisplayName(user);
			}
		} catch (error) {
			console.error('Error fetching chats:', error);
		}
	};
	useEffect(() => {
		fetchChats();
	}, [user]);
	let isOnline;
	let lastSeen;

	if (statuses[`${user}`]) {
		isOnline = new Date() - new Date(statuses[`${user}`]) < 2000;
	} else {
		isOnline = false;
	}

	if (!isOnline) {
		const timeDifference = new Date() - new Date(statuses[`${user}`]);
		const seconds = Math.floor(timeDifference / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);

		if (seconds < 60) {
			lastSeen = `last seen few seconds ago`;
		} else if (minutes < 60) {
			lastSeen = `last seen ${minutes}m ago`;
		} else if (hours < 24) {
			lastSeen = `last seen ${hours}h ago`;
		} else if (days < 7) {
			lastSeen = `last seen ${days}d ago`;
		} else if (weeks < 52) {
			lastSeen = `last seen ${weeks}w ago`;
		} else {
			lastSeen = '';
		}
	}

	return (
		<div className={styles['chat-details']}>
			<div className={styles['details-wrapper']}>
				<div className={styles['user-image']}>
					<img src={userPhoto} alt="User Profile" draggable="false" />
				</div>
				<div className={styles['user-info']}>
					<div className={styles['display-name']}>{displayName}</div>
					<div
						className={`${styles['status']} ${
							isOnline
								? styles['online']
								: `${lastSeen}` === ''
								? styles['never']
								: ''
						}`}
					>
						{isOnline ? 'online' : `${lastSeen}`}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatDetails;
