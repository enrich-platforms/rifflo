import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import styles from './Home.module.css';
import Feature from './Feature';
import TextMessage from '../../Assets/icons/text-message.png';
import loadingGIF from './../../Assets/chat-loading.gif';

const Home = (props) => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			if (window?.userData?.registered === true) {
				setLoading(false);
			}
		}, 500);
	}, []);
	return (
		<div className={styles.container}>
			{loading && (
				<div className={styles['loading']}>
					<img src={loadingGIF} alt="loading" />
				</div>
			)}
			{!loading && (
				<>
					<Navbar logoutHandler={props.logoutHandler}>Dashboard</Navbar>
					<div className={styles.main}>
						<Feature icon={TextMessage} to="/server" title="Text Messaging" />
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
