import styles from './Sidebar.module.css';
import ChatLog from './ChatLog';
import loadingGIF from './../../../Assets/loading.gif';
import NewChat from './NewChat';

const Sidebar = ({ to, chats, setTo, loading }) => {
	return (
		<div
			className={`${styles['sidebar']} ${loading ? `${styles['gif-bg']}` : ''}`}
		>
			{loading && (
				<img
					className={styles.loading}
					src={loadingGIF}
					alt="loading"
					draggable="false"
				/>
			)}
			<NewChat
				setTo={setTo}
				stylesOverrider={{ position: `${loading ? 'absolute' : 'relative'}` }}
			/>
			{!loading && <ChatLog to={to} chats={chats} setTo={setTo}></ChatLog>}
		</div>
	);
};

export default Sidebar;
