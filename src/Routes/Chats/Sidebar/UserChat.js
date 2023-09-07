import styles from './UserChat.module.css';

const UserChat = (props) => {
	return (
		<div className={styles['user-chat']}>
			<div className={styles['user-profile']}>
				{/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
				<img
					className={styles['display-image']}
					src={props.displayImage}
					alt="Chat Display Picture"
				></img>
			</div>
			<div className={styles['chat-info']}>
				<div className={styles['user-data']}>
					<h2 className={styles['display-name']}>{props.displayName}</h2>
					<span>&#8226;</span>
					<h3 className={styles['username']}>{props.username}</h3>
				</div>
				<div className={styles['last-message']}>
					<p>{props.lastMessage}</p>
				</div>
			</div>
		</div>
	);
};

export default UserChat;
