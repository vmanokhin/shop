import axios from 'axios';

const instance = axios.create({
	mode: 'no-cors',
	headers: {
		'Access-Control-Allow-Origin': '*'
	},
	credentials: 'same-origin',
	withCredentials: true,
	crossDomain: true
});

export default instance;