// DropdownMenuItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DropdownMenuItem.module.css';

const DropdownMenuItem = ({ to, onClick, children, iconClass }) => {
	const MenuItemComponent = to ? Link : 'button';

	return (
		<li className={styles.dropdownMenuItem}>
			<MenuItemComponent
				to={to}
				className={styles.menuItemContent}
				onClick={onClick}
			>
				{iconClass && <i className={`fa ${iconClass} ${styles.icon}`}></i>}
				<span className={styles.menuItemLabel}>{children}</span>
			</MenuItemComponent>
		</li>
	);
};

export default DropdownMenuItem;
