import styles from './Sidebar.module.css';
import ChatLog from './ChatLog';
import Menu from './Menu';
import loadingGIF from './../../../Assets/loading.gif';
import NewChat from './NewChat';

const Sidebar = ({ to, chats, setTo, loading, statuses }) => {
	return (
		<div
			className={`${styles['sidebar']} ${loading ? `${styles['gif-bg']}` : ''}`}
		>
			{loading && (
				<img className={styles.loading} src={loadingGIF} alt="loading" />
			)}
			{/* {!loading && <Menu />} */}
			{!loading && (
				<>
					<ChatLog
						to={to}
						chats={chats}
						setTo={setTo}
						statuses={statuses}
					></ChatLog>
					<NewChat setTo={setTo} />
				</>
			)}
		</div>
	);
};

export default Sidebar;
