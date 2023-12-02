import React, { useState, useRef, useEffect } from 'react';
import styles from './NewChat.module.css';
import { Link } from 'react-router-dom';
import home from '../../../Assets/icons/UI/home.svg';
import newChat from '../../../Assets/icons/UI/new-chat.svg';

const NewChat = ({ setTo, stylesOverrider }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newChatText, setNewChatText] = useState('');
	const inputRef = useRef(null);

	const newChatHandler = () => {
		setIsModalOpen(true);
	};

	const closeModalHandler = () => {
		setIsModalOpen(false);
	};

	const submitNewChatHandler = () => {
		if (newChatText !== window.userData.ownerUsername) {
			setTo(newChatText);
		}
		setIsModalOpen(false);
		setNewChatText('');
	};

	const reset = () => {
		if (window.serverData) {
			window.serverData = '';
			window.ipcRenderer.send('stop-server');
		}
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [isModalOpen]);
	return (
		<div className={styles['new-chat']} style={stylesOverrider}>
			<Link to="/" className={styles['new-button']} onClick={reset}>
				<img src={home} alt="Dashboard" draggable="false" />
			</Link>
			<div className={styles['title']}>Chats</div>
			<button className={styles['new-button']} onClick={newChatHandler}>
				<img src={newChat} alt="New Chat" draggable="false" />
			</button>
			{isModalOpen && (
				<>
					<div
						className={styles['modal-backdrop']}
						onClick={closeModalHandler}
					></div>
					<div className={styles['modal']}>
						<form onSubmit={submitNewChatHandler}>
							<span className={styles['close']} onClick={closeModalHandler}>
								&times;
							</span>
							<label htmlFor="newChatInput">
								<span className={styles['label-text']}>Username</span>
								<input
									ref={inputRef}
									type="text"
									id="newChatInput"
									value={newChatText}
									onChange={(e) => setNewChatText(e.target.value)}
									placeholder="Enter username"
									// onClick={(e) => e.stopPropagation()}
								/>
							</label>
							<button type="submit">Submit</button>
						</form>
					</div>
				</>
			)}
		</div>
	);
};

export default NewChat;
