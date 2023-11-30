import styles from './ChatLog.module.css';
import UserChat from './UserChat';

const ChatLog = ({ chats, setTo }) => {
	// chats.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
	return (
		<div className={styles['chat-log']}>
			{chats.map((chat, index) => (
				<UserChat
					key={index}
					username={chat.username}
					lastMessage={chat.lastMessage}
					setTo={setTo}
				/>
			))}
		</div>
	);
};

export default ChatLog;
