import styles from './Sidebar.module.css';
import ChatLog from './ChatLog';
import Menu from './Menu';
import loadingGIF from './../../../Assets/loading.gif';

const Sidebar = ({ to, chats, setTo, loading, statuses }) => {
	return (
		<div
			className={`${styles['sidebar']} ${loading ? `${styles['gif-bg']}` : ''}`}
		>
			{loading && (
				<img className={styles.loading} src={loadingGIF} alt="loading" />
			)}
			{!loading && <Menu setTo={setTo} />}
			{!loading && (
				<ChatLog
					to={to}
					chats={chats}
					setTo={setTo}
					statuses={statuses}
				></ChatLog>
			)}
		</div>
	);
};

export default Sidebar;
