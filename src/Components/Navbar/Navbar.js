import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import DropdownMenuItem from '../UI/DropdownMenuItem';
import logo from '../../Assets/logo.png';

const Navbar = (props) => {
	const dropdownCheckboxRef = useRef(null);
	const toggleDropdown = () => {
		dropdownCheckboxRef.current.checked = !dropdownCheckboxRef.current.checked;
	};

	const reset = () => {
		if (window.serverData) {
			window.serverData = '';
			window.ipcRenderer.send('stop-server');
		}
	};

	return (
		<nav
			className={styles.navbar}
			onBlur={() => {
				dropdownCheckboxRef.current.checked = false;
			}}
		>
			<div className={styles['navbar-wrapper']}>
				<div className={styles.logo} onClick={reset}>
					<Link to="/" className={styles.logoLink} onClick={reset}>
						<img
							className={styles.logo}
							src={logo}
							alt="Rifflo Logo"
							draggable="false"
						/>
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
								<img
									className={styles.displayImage}
									src={JSON.parse(window.userData.userProfileData).displayImage}
									alt="User Profile"
									draggable="false"
								/>
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
