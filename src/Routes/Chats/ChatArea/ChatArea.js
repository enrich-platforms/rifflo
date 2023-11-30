import styles from './ChatArea.module.css';
import NewMessage from './NewMessage';
import background from '../../../Assets/chat-screen.png';
import ChatHistory from './ChatHistory';

const ChatArea = ({ to, fetchChats }) => {
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
				<>
					<ChatHistory username={to} />
					<NewMessage to={to} fetchChats={fetchChats} />
				</>
			)}
		</div>
	);
};

export default ChatArea;
