import styles from './Sidebar.module.css';
import ChatLog from './ChatLog';
import Menu from './Menu';
import loadingGIF from './../../../Assets/loading.gif';

const Sidebar = ({ chats, setTo, loading }) => {
	return (
		<div
			className={`${styles['sidebar']} ${loading ? `${styles['gif-bg']}` : ''}`}
		>
			{loading && (
				<img className={styles.loading} src={loadingGIF} alt="loading" />
			)}
			{!loading && <Menu setTo={setTo} />}
			{!loading && <ChatLog chats={chats} setTo={setTo}></ChatLog>}
		</div>
	);
};

export default Sidebar;
