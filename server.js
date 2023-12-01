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

const updateDatabase = (fromUsername, toUsername, messasgeData) => {
	const database = fs.existsSync(databasePath)
		? JSON.parse(fs.readFileSync(databasePath, 'utf8'))
		: {};
	const senderChats = database[`${fromUsername}`];
	const receivedChats = database[`${toUsername}`];

	if (!senderChats) {
		database[`${fromUsername}`] = [];
	}

	if (!receivedChats) {
		database[`${toUsername}`] = [];
	}

	const senderChatIndex = database[`${fromUsername}`].findIndex(
		(chat) => chat.to === toUsername
	);

	const receiverChatIndex = database[`${toUsername}`].findIndex(
		(chat) => chat.to === fromUsername
	);

	if (senderChatIndex !== -1) {
		database[`${fromUsername}`][senderChatIndex].lastMessage =
			messasgeData.lastMessage;
		database[`${fromUsername}`][senderChatIndex].timestamp =
			messasgeData.timestamp;
	} else {
		database[`${fromUsername}`].push({
			chatFileName: messasgeData.chatFileName,
			to: toUsername,
			lastMessage: messasgeData.lastMessage,
			timestamp: messasgeData.timestamp,
		});
	}

	if (receiverChatIndex !== -1) {
		database[`${toUsername}`][receiverChatIndex].lastMessage =
			messasgeData.lastMessage;
		database[`${toUsername}`][receiverChatIndex].timestamp =
			messasgeData.timestamp;
	} else {
		database[`${toUsername}`].push({
			chatFileName: messasgeData.chatFileName,
			to: fromUsername,
			lastMessage: messasgeData.lastMessage,
			timestamp: messasgeData.timestamp,
		});
	}

	fs.writeFileSync(databasePath, JSON.stringify(database, null, 2), 'utf8');
};

app.post('/send-message', (req, res) => {
	const { fromUsername, toUsername, message } = req.body;
	const chatFileName1 = `${fromUsername}-${toUsername}`;
	const chatFileName2 = `${toUsername}-${fromUsername}`;
	const chatFilePath1 = path.join(chatsDirectory, `${chatFileName1}.json`);
	const chatFilePath2 = path.join(chatsDirectory, `${chatFileName2}.json`);
	let chatFileName;
	let chatFilePath;
	let chatData = {};

	if (fs.existsSync(chatFilePath1)) {
		chatFileName = chatFileName1;
		chatFilePath = chatFilePath1;
		const chatFileContent = fs.readFileSync(chatFilePath1, 'utf8');
		chatData = JSON.parse(chatFileContent);
	} else if (fs.existsSync(chatFilePath2)) {
		chatFileName = chatFileName2;
		chatFilePath = chatFilePath2;
		const chatFileContent = fs.readFileSync(chatFilePath2, 'utf8');
		chatData = JSON.parse(chatFileContent);
	} else {
		chatFileName = chatFileName1;
		chatFilePath = chatFilePath1;
		// If the chat file doesn't exist, initialize with owner and sender details
		chatData = {
			participants: [],
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
	updateDatabase(fromUsername, toUsername, {
		chatFileName,
		lastMessage: message,
		timestamp,
	});
	res.json({ success: true, message: 'Message received successfully' });
});

app.get('/messages', (req, res) => {
	const { fromUsername, toUsername } = req.query;

	if (!fromUsername || !toUsername) {
		return res.status(400).json({ error: 'Username parameter is required' });
	}

	const chatFileName1 = `${fromUsername}-${toUsername}`;
	const chatFileName2 = `${toUsername}-${fromUsername}`;
	const chatFilePath1 = path.join(chatsDirectory, `${chatFileName1}.json`);
	const chatFilePath2 = path.join(chatsDirectory, `${chatFileName2}.json`);

	if (fs.existsSync(chatFilePath1)) {
		const chatFileContent = fs.readFileSync(chatFilePath1, 'utf8');
		res.json(chatFileContent);
	} else if (fs.existsSync(chatFilePath2)) {
		const chatFileContent = fs.readFileSync(chatFilePath2, 'utf8');
		res.json(chatFileContent);
	} else {
		const chatData = {
			participants: [],
			messages: [],
		};
		res.json(JSON.stringify(chatData));
	}
});

app.get('/chats', (req, res) => {
	const { ownerUsername } = req.query;

	if (!ownerUsername) {
		return res.status(400).json({ error: 'Username parameter is required' });
	}

	if (!fs.existsSync(databasePath)) {
		return res.json([]);
	}

	const database = JSON.parse(fs.readFileSync(databasePath, 'utf8'));

	if (!database[`${ownerUsername}`]) {
		return res.json([]);
	}
	res.json(database[`${ownerUsername}`]);
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
