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
		{
			id: Math.random(),
			displayImage: photo,
			displayName: 'B',
			username: 'b',
			lastMessage: 'Hello',
		},
		{
			id: Math.random(),
			displayImage: photo,
			displayName: 'C',
			username: 'c',
			lastMessage: 'Heya',
		},
		{
			id: Math.random(),
			displayImage: photo,
			displayName: 'D',
			username: 'd',
			lastMessage: 'hey',
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
