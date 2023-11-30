import styles from './EmojiBox.module.css';

const EmojiBox = ({ inputRef }) => {
	const emojis = ['😂', '😅', '😝', '😎', '🤓', '😂', '😅'];

	const emojiHandler = (emoji) => {
		const input = inputRef.current;

		// Save the current selection
		const selection = window.getSelection();
		const range = selection.getRangeAt(0);

		// Insert the emoji at the end
		input.innerHTML += emoji;

		// Move the cursor to the end
		range.setStart(input.lastChild, input.lastChild.length);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);

		// Set focus to the input
		input.focus();
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
