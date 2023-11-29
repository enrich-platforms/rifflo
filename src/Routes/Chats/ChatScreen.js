import styles from './ChatScreen.module.css';
import Navbar from '../../Components/Navbar/Navbar';
import ChatArea from './ChatArea/ChatArea';
import Sidebar from './Sidebar/Sidebar';
import photo from '../../Assets/logo.png';

const ChatScreen = (props) => {
	const chats = [
		{
			id: Math.random(),
			displayImage: photo,
			displayName: 'A',
			username: 'a',
			lastMessage: 'Hi',
		},
	];

	return (
		<div className={styles.chats}>
			<Navbar logoutHandler={props.logoutHandler}></Navbar>
			<Sidebar chats={chats} />
			{/* <ChatArea /> */}
			<ChatArea to={chats[0]} />
		</div>
	);
};

export default ChatScreen;
