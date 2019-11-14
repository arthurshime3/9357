import axios from 'axios';

export const sendData = data => {
    axios
        .post('/api/hello', {
            data: data,
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
};
