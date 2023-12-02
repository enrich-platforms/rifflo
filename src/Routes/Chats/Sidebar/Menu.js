import styles from './Menu.module.css';

import home from '../../../Assets/icons/UI/home.svg';

const Menu = () => {
	return (
		<div className={styles['menu']}>
			<button className={styles['menu-button']}>
				<img src={home} alt="Home" />
			</button>
		</div>
	);
};

export default Menu;
