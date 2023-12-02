import styles from './ChatDetails.module.css';

import home from '../../../Assets/icons/UI/home.svg';

const ChatDetails = ({ user }) => {
	return (
		<div className={styles['chat-details']}>
			<div className={styles['details-wrapper']}>
				<div className={styles['user-image']}>
					<img src={home} alt="User Profile" draggable="false" />
				</div>
				<div className={styles['user-info']}>
					<div className={styles['display-name']}>Display Name</div>
					<div className={styles['status']}>Online</div>
				</div>
			</div>
		</div>
	);
};

export default ChatDetails;
