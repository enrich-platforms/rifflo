import styles from './Sidebar.module.css';
import ChatLog from './ChatLog';

const Sidebar = ({ chats }) => {
	return (
		<div className={styles['sidebar']}>
			<ChatLog chats={chats}></ChatLog>
		</div>
	);
};

export default Sidebar;
