import { Link } from 'react-router-dom';
import styles from './Feature.module.css';

const Feature = ({ to, title, icon, onClick }) => {
	return (
		<div className={styles.feature} onClick={onClick}>
			<Link to={to} className={styles.featureLink}>
				<img src={icon} alt="Video Call" className={styles.featureIcon} />
			</Link>
			<h2>{title}</h2>
		</div>
	);
};

export default Feature;
