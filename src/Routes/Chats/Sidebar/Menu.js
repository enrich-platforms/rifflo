import React, { useState } from 'react';
import styles from './Menu.module.css';
import plus from '../../../Assets/icons/UI/plus.svg';
import home from '../../../Assets/icons/UI/home.svg';

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
				<img src={home} alt="Home" />
			</button>
			<button className={styles['menu-button']} onClick={newChatHandler}>
				<img src={plus} alt="New Chat" />
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
							<label htmlFor="newChatInput">Enter Username:</label>
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
