import { useRef } from 'react';
import styles from './ChatLog.module.css';
import UserChat from './UserChat';

const ChatLog = ({ chats }) => {
	const serverInputRef = useRef(null);
	chats.sort((a, b) => a.displayName.localeCompare(b.displayName));
	return (
		<div className={styles['chat-log']}>
			{chats.map((chat, index) => (
				<UserChat
					key={index}
					displayImage={chat.displayImage}
					displayName={chat.displayName}
					username={chat.username}
					lastMessage={chat.lastMessage}
				/>
			))}
		</div>
	);
};

export default ChatLog;
