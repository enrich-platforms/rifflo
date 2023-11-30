import styles from './EmojiBox.module.css';

const EmojiBox = ({ inputRef }) => {
	const emojis = ['😂', '😅', '😝', '😎', '🤓', '😂', '😅'];

	const emojiHandler = (emoji) => {
		inputRef.current.textContent += emoji;
		inputRef.current.focus();
	};
	return (
		<div className={styles['EmojiBoxWrapper']}>
			<ul>
				{emojis.map((emoji, index) => (
					<li key={index}>
						<div onClick={emojiHandler.bind(null, emoji)}>{emoji}</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default EmojiBox;
