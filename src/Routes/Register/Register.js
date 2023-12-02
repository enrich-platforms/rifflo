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

		if (!displayImageRef.current?.files[0]) {
			alert('Please upload a profile photo!');
		} else {
			const reader = new FileReader();
			reader.onload = (event) => {
				const base64Image = event.target.result;
				let profile = {
					displayName: formData.get('display-name'),
					username: formData.get('username'),
					displayImage: base64Image,
				};

				if (!profile.displayName || !profile.username) {
					alert('Please fill all the fields correctly!');
					return;
				} else {
					try {
						window.ipcRenderer.send('register-user', profile);
					} catch (error) {
						console.log(error);
					}

					props.setIsRegistered(true);
				}
			};
			reader.readAsDataURL(displayImageRef.current.files[0]);
		}
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
										draggable="false"
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
						<button>Register</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
