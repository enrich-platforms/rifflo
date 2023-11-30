import React, { useState } from 'react';
import styles from './Menu.module.css';

const Menu = ({ setTo }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newChatText, setNewChatText] = useState('');

	const resetHandler = () => {
		setTo('');
	};

	const newChatHandler = () => {
		setIsModalOpen(true);
	};

	const closeModalHandler = () => {
		setIsModalOpen(false);
	};

	const submitNewChatHandler = () => {
		setTo(newChatText);
		setIsModalOpen(false);
		setNewChatText('');
	};

	return (
		<div className={styles['menu']}>
			<button className={styles['menu-button']} onClick={resetHandler}>
				Reset Chat
			</button>
			<button className={styles['menu-button']} onClick={newChatHandler}>
				New Chat
			</button>

			{isModalOpen && (
				<>
					<div
						className={styles['modal-backdrop']}
						onClick={closeModalHandler}
					></div>
					<div className={styles['modal']}>
						<div className={styles['modal-content']}>
							<span className={styles['close']} onClick={closeModalHandler}>
								&times;
							</span>
							<label htmlFor="newChatInput">Enter Text:</label>
							<input
								type="text"
								id="newChatInput"
								value={newChatText}
								onChange={(e) => setNewChatText(e.target.value)}
								onClick={(e) => e.stopPropagation()} // Prevent modal close on input click
							/>
							<button onClick={submitNewChatHandler}>Submit</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Menu;
