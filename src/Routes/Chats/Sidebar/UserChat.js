import styles from './UserChat.module.css';
import photo from '../../../Assets/logo.png';

const UserChat = (props) => {
	return (
		<div
			className={`${styles['user-chat']} ${
				props.username === props.to ? `${styles['to']}` : ''
			}`}
			onClick={() => {
				props.setTo(props.username);
			}}
		>
			<div className={styles['user-profile']}>
				{/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
				<img
					className={styles['display-image']}
					src={photo}
					alt="Chat Display Picture"
					draggable="false"
				></img>
			</div>
			<div className={styles['chat-info']}>
				<div className={styles['user-data']}>
					<h2 className={styles['display-name']}>{props.username}</h2>
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
