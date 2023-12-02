import styles from './ChatArea.module.css';
import NewMessage from './NewMessage';
import background from '../../../Assets/chat-screen.png';
import ChatHistory from './ChatHistory';
import ChatDetails from './ChatDetails';

const ChatArea = ({ to, fetchChats, statuses }) => {
	return (
		<div className={styles['chat-area']}>
			{!to ? (
				<div className={styles['no-chat']}>
					<img
						src={background}
						alt="No Chat Selected"
						className={styles['placeholder-image']}
						draggable="false"
					/>
					<p className={styles['placeholder-text']}>
						Select a chat to start messaging
					</p>
				</div>
			) : (
				<>
					<ChatDetails user={to} statuses={statuses} />
					<ChatHistory username={to} />
					<NewMessage to={to} fetchChats={fetchChats} />
				</>
			)}
		</div>
	);
};

export default ChatArea;
