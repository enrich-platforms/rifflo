import styles from './ChatArea.module.css';
import NewMessage from './NewMessage';
import background from '../../../Assets/chat-screen.png';

const ChatArea = ({ to }) => {
	return (
		<div className={styles['chat-area']}>
			{!to ? (
				<div className={styles['no-chat']}>
					<img
						src={background}
						alt="No Chat Selected"
						className={styles['placeholder-image']}
					/>
					<p className={styles['placeholder-text']}>
						Select a chat to start messaging
					</p>
				</div>
			) : (
				<NewMessage to={to} />
			)}
		</div>
	);
};

export default ChatArea;
