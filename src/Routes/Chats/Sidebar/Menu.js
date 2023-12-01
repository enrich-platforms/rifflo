import React, { useState, useRef, useEffect } from 'react';
import styles from './Menu.module.css';
import plus from '../../../Assets/icons/UI/plus.svg';
// import home from '../../../Assets/icons/UI/home.svg';

const Menu = ({ setTo }) => {
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
		setTo(newChatText);
		setIsModalOpen(false);
		setNewChatText('');
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [isModalOpen]);

	return (
		<div className={styles['menu']}>
			{/* <button className={styles['menu-button']} onClick={resetHandler}>
				<img src={home} alt="Home" />
			</button> */}
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

export default Menu;
