import styles from './NewMessage.module.css';
import emoji from '../../../Assets/icons/UI/emoji.svg';
import plus from '../../../Assets/icons/UI/plus.svg';
import send from '../../../Assets/icons/UI/send.svg';
import { useRef } from 'react';

const NewMessage = () => {
	const inputRef = useRef(null);
	const sendMessage = async (event) => {
		event.preventDefault();
		const message = inputRef.current.value;
		const serverURI = JSON.parse(window.userData.userProfileData).server;
		fetch(`http://${serverURI}:49152/send-message`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: JSON.parse(window.userData.userProfileData).username,
				message,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
	return (
		<div className={styles['new-message']}>
			<div className={styles['emoji']}>
				<img src={emoji} alt="Emoji Icon" />
			</div>
			<div className={styles['attachment']}>
				<img src={plus} alt="Add Icon" />
			</div>
			<div className={styles['text-message-container']}>
				<input
					className={`${styles['writtable']} ${styles['text-message-wrapper']} ${styles['text-message']}`}
					spellCheck="true"
					title="Type a message"
					ref={inputRef}
				/>
				{/* <div className={styles['writtable-placeholder']}>Type a message</div> */}
			</div>
			<div className={styles['send-btn-wrapper']}>
				<button
					className={styles['send-btn']}
					type="button"
					onClick={sendMessage}
				>
					<img src={send} alt="Send Btn" />
				</button>
			</div>
		</div>
	);
};

export default NewMessage;
