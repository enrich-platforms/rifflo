import React from 'react';
import styles from './ChatDetails.module.css';
import userIcon from './../../../Assets/icons/UI/user.svg';

const ChatDetails = ({ user, statuses }) => {
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
					<img src={userIcon} alt="User Profile" draggable="false" />
				</div>
				<div className={styles['user-info']}>
					<div className={styles['display-name']}>Display Name</div>
					<div
						className={`${styles['status']} ${
							isOnline ? styles['online'] : ''
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
