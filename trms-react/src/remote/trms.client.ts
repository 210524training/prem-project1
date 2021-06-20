import axios from 'axios';

console.log(process.env.REACT_APP_ENVIRONMENT);

const tuitionClient = axios.create({
	baseURL: process.env.REACT_APP_ENVIRONMENT === 'local' ? 'http://localhost:4000' : process.env.TRMS_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export default tuitionClient;