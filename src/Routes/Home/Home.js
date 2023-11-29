import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import styles from './Home.module.css';
import Feature from './Feature';
import TextMessage from '../../Assets/icons/text-message.png';

const Home = (props) => {
	const startSever = () => {
		window.ipcRenderer.send('start-server');
	};

	return (
		<div className={styles.container}>
			<Navbar logoutHandler={props.logoutHandler}>Dashboard</Navbar>
			{/* <div className={styles.header}>
				<h1 className={styles.heading}>Dashboard</h1>
			</div> */}
			<div className={styles.main}>
				<Feature
					icon={TextMessage}
					to="/chats"
					title="Text Messaging"
					onClick={startSever}
				/>
			</div>
		</div>
	);
};

export default Home;
