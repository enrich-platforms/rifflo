import styles from './UserChat.module.css';
import userIcon from '../../../Assets/icons/UI/user.svg';
import { useEffect, useState } from 'react';

const UserChat = (props) => {
	const [userPhoto, setUserPhoto] = useState(userIcon);
	const [displayName, setDisplayName] = useState(null);

	useEffect(() => {
		const serverURI = window.serverData;
		fetch(`http://${serverURI}:49152/profiles?username=${props.username}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				let parsedData = data;
				while (typeof parsedData === 'string') {
					parsedData = JSON.parse(parsedData);
				}
				if (parsedData.displayImage) {
					setUserPhoto(parsedData.displayImage);
				}
				if (parsedData.displayName) {
					setDisplayName(parsedData.displayName);
				}
			})
			.catch((error) => {
				console.error('Error fetching chats:', error);
			});
	}, []);
	return (
		<div
			className={`${styles['user-chat']} ${
				props.username === props.to ? `${styles['to']}` : ''
			}`}
			onClick={() => {
				props.setTo(props.username);
			}}
		>
			<div className={styles['user-profile']}>
				{/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
				<img
					className={styles['display-image']}
					src={userPhoto}
					alt="Chat Display Picture"
					draggable="false"
				></img>
			</div>
			<div className={styles['chat-info']}>
				<div className={styles['user-data']}>
					<h2 className={styles['display-name']}>
						{displayName || props.username}
					</h2>
					<span>&#8226;</span>
					<h3 className={styles['username']}>{props.username}</h3>
				</div>
				<div className={styles['last-message']}>
					<p>{props.lastMessage}</p>
				</div>
			</div>
		</div>
	);
};

export default UserChat;
