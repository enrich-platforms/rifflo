const bodyParser = require('body-parser');
const express = require('express');
const os = require('os');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ownerUsername = process.argv[2];
const userDataPath = process.argv[3];
const chatsDirectory = path.join(userDataPath, 'chats');
const databasePath = path.join(userDataPath, 'chats', 'database.json');

const updateDatabase = (chatFileName, lastMessage) => {
	const database = fs.existsSync(databasePath)
		? JSON.parse(fs.readFileSync(databasePath, 'utf8'))
		: {};

	database[chatFileName] = lastMessage;

	fs.writeFileSync(databasePath, JSON.stringify(database, null, 2), 'utf8');
};

app.post('/send-message', (req, res) => {
	const { fromUsername, toUsername, message } = req.body;

	// console.log(`Message received from ${username} - ${message}`);
	const chatFileName =
		fromUsername === ownerUsername ? toUsername : fromUsername;
	// Create or load the chat JSON file based on the sender's username
	const chatFilePath = path.join(chatsDirectory, `${chatFileName}.json`);
	let chatData = {};

	if (fs.existsSync(chatFilePath)) {
		// If the chat file exists, load its content
		const chatFileContent = fs.readFileSync(chatFilePath, 'utf8');
		chatData = JSON.parse(chatFileContent);
	} else {
		// If the chat file doesn't exist, initialize with owner and sender details
		chatData = {
			owner: ownerUsername,
			otherPerson: chatFileName,
			messages: [],
		};
	}

	// Add the new message to the chat
	const timestamp = new Date().toISOString();
	const newMessage = {
		sender: fromUsername,
		receiver: toUsername,
		message,
		timestamp,
	};
	chatData.messages.push(newMessage);

	fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2), 'utf8');

	// Update the database with the last message
	updateDatabase(chatFileName, {
		lastMessage: message,
		timestamp,
	});

	res.json({ success: true, message: 'Message received successfully' });
});

app.get('/messages', (req, res) => {
	const { username } = req.query;

	if (!username) {
		return res.status(400).json({ error: 'Username parameter is required' });
	}

	const chatFileName = path.join(chatsDirectory, `${username}.json`);

	if (!fs.existsSync(chatFileName)) {
		return res
			.status(404)
			.json({ error: 'Chat not found for the given username' });
	}

	const chatFileContent = fs.readFileSync(chatFileName, 'utf8');
	// const chatData = JSON.parse(chatFileContent);

	res.json(chatFileContent);
	// res.json(chatData);
});

app.get('/chats', (req, res) => {
	if (!fs.existsSync(chatsDirectory)) {
		return res.json([]);
	}

	const database = JSON.parse(fs.readFileSync(chatsDirectory, 'utf8'));
	const chatList = Object.keys(database).map((chatFileName) => ({
		chatFileName,
		lastMessage: database[chatFileName].lastMessage,
		timestamp: database[chatFileName].timestamp,
	}));

	res.json(chatList);
});

const getLocalIPAddress = () => {
	const interfaces = os.networkInterfaces();
	for (const name in interfaces) {
		for (const net of interfaces[name]) {
			if (net.family === 'IPv4' && !net.internal) {
				return net.address;
			}
		}
	}
};

const IP_ADDRESS = getLocalIPAddress();
const PORT = 49152;

app.listen(PORT, IP_ADDRESS, () => {
	console.log(`${IP_ADDRESS}`);
});
