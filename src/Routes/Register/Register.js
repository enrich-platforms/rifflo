import React, { useRef, useState } from 'react';
import styles from './Register.module.css';

const Register = (props) => {
	const displayImageRef = useRef(null);
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageChange = (event) => {
		const selectedFile = event.target.files[0];

		if (selectedFile) {
			setSelectedImage(URL.createObjectURL(selectedFile));
		}
	};

	const registerHandler = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const reader = new FileReader();
		reader.onload = (event) => {
			const base64Image = event.target.result;
			let profile = {
				displayName: formData.get('display-name'),
				username: formData.get('username'),
				server: formData.get('server'),
				displayImage: base64Image,
			};

			try {
				window.ipcRenderer.send('register-user', profile);
			} catch (error) {
				console.log(error);
			}
		};
		reader.readAsDataURL(displayImageRef.current.files[0]);
		props.setIsRegistered(true);
	};

	return (
		<div className={styles.register}>
			<header className={styles.header}>
				<h1>Hello Users!</h1>
				<p>Welcome to Rifflo!</p>
			</header>
			<div className={styles['form-container']}>
				<form onSubmit={registerHandler}>
					<div className={styles['form-wrapper']}>
						<div className={styles['display-image']}>
							<label className={styles['image-upload']}>
								{selectedImage ? (
									// eslint-disable-next-line jsx-a11y/img-redundant-alt
									<img
										className={`${styles['uploaded-image']} ${
											selectedImage ? styles['has-image'] : ''
										}`}
										alt="Choose Display Image"
										src={selectedImage}
									/>
								) : (
									<div
										className={`${styles['upload-icon']} ${
											selectedImage ? styles['has-image'] : ''
										}`}
									>
										+
									</div>
								)}
								<input
									ref={displayImageRef}
									type="file"
									accept=".png, .jpg, .jpeg"
									name="display-image"
									onChange={handleImageChange}
								/>
							</label>
						</div>
						<label htmlFor="display-name">
							<span className={styles['label-text']}>Display Name</span>
							<input
								name="display-name"
								type="text"
								placeholder="What should everyone call you?"
							/>
						</label>
						<label htmlFor="username">
							<span className={styles['label-text']}>Username</span>
							<input
								name="username"
								type="text"
								placeholder="Choose a unique username"
							/>
						</label>
						<label htmlFor="server">
							<span className={styles['label-text']}>Server</span>
							<input name="server" type="text" placeholder="Enter you server" />
						</label>
						<button>Register</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
