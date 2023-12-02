import styles from './ChatDetails.module.css';

import home from '../../../Assets/icons/UI/home.svg';

const ChatDetails = ({ user, statuses }) => {
	let isOnline;
	let lastSeen;
	if (statuses[`${user}`]) {
		isOnline = new Date() - new Date(statuses[`${user}`]) < 2000;
	} else {
		isOnline = false;
	}
	if (!isOnline) {
		lastSeen = Math.floor(
			(new Date() - new Date(statuses[`${user}`])) / (1000 * 60)
		);
	}

	return (
		<div className={styles['chat-details']}>
			<div className={styles['details-wrapper']}>
				<div className={styles['user-image']}>
					<img src={home} alt="User Profile" draggable="false" />
				</div>
				<div className={styles['user-info']}>
					<div className={styles['display-name']}>Display Name</div>
					<div
						className={`${styles['status']} ${
							isOnline ? styles['online'] : ''
						}`}
					>
						{isOnline ? 'online' : `last seen ${lastSeen}m ago`}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatDetails;
