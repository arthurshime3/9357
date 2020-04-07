import axios from 'axios';

export const sendData = (data, fn) => {
    axios
        .post('/api/mealplans', data)
        .then(res => {
            console.log(res);
            fn(res.data);
        })
        .catch(err => console.log(err));
};

export const login = (data, succ, fail) => {
    axios
        .post('/api/login', data)
        .then(res => {
            console.log(res);
            succ(res);
        })
        .catch(err => {
            fail(err);
            console.log(err);
        });
};

export const logout = fn => {
    axios
        .post('/api/logout', { withCredentials: true })
        .then(res => {
            console.log(res);
            fn(res);
        })
        .catch(err => {
            console.log(err);
        });
};

export const register = (data, fn) => {
    axios
        .post('/api/register', data)
        .then(res => {
            fn(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

export const getProfile = fn => {
    axios
        .get('/api/login', { withCredentials: true })
        .then(res => {
            if (res.status == 200) {
                console.log(res.data);
                fn(res.data);
            } else {
                console.log(res);
            }
        })
        .catch(err => {
            console.log(err);
        });
};

export const getDietaryRestrictions = fn => {
    axios
        .get('/api/dietaryRestrictions')
        .then(res => {
            if (res.status == 200) {
                console.log(res.data);
                fn(res.data);
            } else {
                console.log(res);
            }
        })
        .catch(err => {
            console.log(err);
        });
};

export const getGroceryList = (data, fn) => {
    axios
        .post('/api/grocery', data)
        .then(res => {
            if (res.status == 200) {
                console.log(res.data);
                fn(res.data);
            } else {
                console.log(res);
            }
        })
        .catch(err => {
            console.log(err);
        });
};

export const formDataToObject = formData => {
    let object = {};
    formData.forEach((value, key) => {
        if (!object.hasOwnProperty(key)) {
            object[key] = value;
            return;
        }
        if (!Array.isArray(object[key])) {
            object[key] = [object[key]];
        }
        object[key].push(value);
    });
    return object;
};

export const evtTargetToObject = target => {
    return { ...formDataToObject(new FormData(target)) };
};
