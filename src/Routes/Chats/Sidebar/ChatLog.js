import styles from './ChatLog.module.css';
import UserChat from './UserChat';

const ChatLog = ({ to, chats, setTo, statuses }) => {
	chats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

	return (
		<div className={styles['chat-log']}>
			{chats.map((chat, index) => (
				<UserChat
					to={to}
					key={index}
					username={chat.to}
					lastMessage={chat.lastMessage}
					setTo={setTo}
					status={statuses[`${chat.to}`]}
				/>
			))}
		</div>
	);
};

export default ChatLog;
