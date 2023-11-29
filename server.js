const bodyParser = require('body-parser');
const express = require('express');
const os = require('os');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON requests

let x = '';

app.post('/send-message', (req, res) => {
	const { username, message } = req.body;

	x = message;
	console.log(`Message received from ${username} - ${message}`);
	res.json({ success: true, message: 'Message received successfully' });
});

app.get('/message', (req, res) => {
	res.json({ message: x });
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
