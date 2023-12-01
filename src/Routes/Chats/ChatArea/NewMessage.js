import styles from './NewMessage.module.css';
import emoji from '../../../Assets/icons/UI/emoji.svg';
import plus from '../../../Assets/icons/UI/plus.svg';
import send from '../../../Assets/icons/UI/send.svg';
import EmojiBox from './EmojiBox';
import { useEffect, useRef, useState } from 'react';

const NewMessage = ({ to, fetchChats }) => {
	const [showEmojiBox, setShowEmojiBox] = useState(false);

	const emojiButtonClicked = () => {
		setShowEmojiBox(!showEmojiBox);
	};
	const inputRef = useRef(null);

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage(event);
		}
	};

	const sendMessage = async (event) => {
		event.preventDefault();
		const message = inputRef.current.textContent.trim();
		const serverURI = window.serverData;

		if (message) {
			fetch(`http://${serverURI}:49152/send-message`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fromUsername: window.userData.ownerUsername,
					toUsername: to,
					message,
				}),
			}).catch((error) => {
				console.error('Error:', error);
			});

			inputRef.current.textContent = '';
			fetchChats();
			inputRef.current.focus();
		}
	};

	useEffect(() => {
		resetInput();
	}, [to]);

	const resetInput = () => {
		if (inputRef.current) {
			inputRef.current.textContent = 'Type a message';
		}
	};
	const focusOnInput = () => {
		if (inputRef.current) {
			inputRef.current.focus();
			inputRef.current.textContent = '';
		}
	};

	return (
		<div className={styles['new-message']}>
			<div className={styles['emoji']}>
				<img src={emoji} alt="Emoji Icon" onClick={emojiButtonClicked} />
				{showEmojiBox && <EmojiBox inputRef={inputRef} />}
			</div>
			<div className={styles['attachment']}>
				<img src={plus} alt="Add Icon" />
			</div>
			<div className={styles['text-message-container']}>
				<div
					contentEditable="true"
					suppressContentEditableWarning={true}
					className={`${styles['writtable']} `}
					spellCheck="true"
					title="Type a message"
					ref={inputRef}
					onClick={focusOnInput}
					onBlur={resetInput}
					onKeyDown={handleKeyDown}
				>
					Type a message
				</div>
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
