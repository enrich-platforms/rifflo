import styles from './NewMessage.module.css';
import emoji from '../../../Assets/icons/UI/emoji.svg';
import plus from '../../../Assets/icons/UI/plus.svg';
import send from '../../../Assets/icons/UI/send.svg';

const NewMessage = () => {
	return (
		<div className={styles['new-message']}>
			<div className={styles['emoji']}>
				<img src={emoji} alt="Emoji Icon" />
			</div>
			<div className={styles['attachment']}>
				<img src={plus} alt="Add Icon" />
			</div>
			<div className={styles['text-message-container']}>
				<div
					className={styles['writtable']}
					contentEditable="true"
					role="textbox"
					spellCheck="true"
					title="Type a message"
				>
					<p className={styles['text-message-wrapper']}>
						<span className={styles['text-message']}>Type a message</span>
					</p>
				</div>
				{/* <div className={styles['writtable-placeholder']}>Type a message</div> */}
			</div>
			<div className={styles['send-btn-wrapper']}>
				<button className={styles['send-btn']}>
					<img src={send} alt="Send Btn" />
				</button>
			</div>
		</div>
	);
};

export default NewMessage;
