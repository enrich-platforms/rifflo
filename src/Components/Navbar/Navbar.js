import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import DropdownMenuItem from '../UI/DropdownMenuItem';
import logo from '../../Assets/logo.png';

const Navbar = (props) => {
	const dropdownCheckboxRef = useRef(null);

	const toggleDropdown = () => {
		dropdownCheckboxRef.current.checked = !dropdownCheckboxRef.current.checked;
	};
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		if (window.userData && window.userData.userProfileData) {
			setUserData(JSON.parse(window.userData.userProfileData));
		}
	}, [window.userData]);

	return (
		<nav className={styles.navbar}>
			<div className={styles['navbar-wrapper']}>
				<div className={styles.logo}>
					<Link to="/" className={styles.logoLink}>
						<img className={styles.logo} src={logo} alt="Rifflo Logo" />
					</Link>
				</div>
				{props.children}
				<div className={styles.profile}>
					<div className={styles.dropdown}>
						<input
							ref={dropdownCheckboxRef}
							type="checkbox"
							className={styles.dropdownCheckbox}
							id="profileDropdown"
						/>
						<label htmlFor="profileDropdown" className={styles.dropdownLabel}>
							<button className={styles.profileButton} onClick={toggleDropdown}>
								{userData && userData.displayImage && (
									<img
										className={styles.displayImage}
										src={userData.displayImage}
										alt="User Profile"
									/>
								)}
							</button>
						</label>
						<ul className={styles.dropdownMenu}>
							<DropdownMenuItem
								to="/"
								onClick={props.logoutHandler}
								iconClass="fa-sign-out"
							>
								Log Out
							</DropdownMenuItem>
							<DropdownMenuItem to="#" iconClass="fa-cog">
								Settings
							</DropdownMenuItem>
							<DropdownMenuItem to="#" iconClass="fa-pencil">
								Edit Profile
							</DropdownMenuItem>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
