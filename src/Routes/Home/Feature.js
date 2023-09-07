import { Link } from 'react-router-dom';
import styles from './Feature.module.css';

const Feature = ({ to, title, icon }) => {
	return (
		<div className={styles.feature}>
			<Link to={to} className={styles.featureLink}>
				<img src={icon} alt="Video Call" className={styles.featureIcon} />
			</Link>
		</div>
	);
};

export default Feature;
