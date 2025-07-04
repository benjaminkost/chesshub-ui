import axios from 'axios';

const baseURL = import.meta.env.VITE_CHESSHUB_CORE_BASEURL;

const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// API calls
const _get = async (url, config = {}) => {
    try {
        apiClient.get(url, config).then(res => {
            console.log(res);
            return true;
        })
            .catch(err => {
                console.log(err);
                return false;
            });
        return true;
    } catch (error) {
        console.error('Error when Sending:', error);
    }
}

const _post = (url, config = {}) => {
    try {
        apiClient.post(url, config).then(res => {
            console.log(res);
            return true
        })
            .catch(err => {
                console.log(err);
                return false;
            });
    } catch (error) {
        console.error('Error when Sending:', error);
    }
    return true;
}

const _delete = (url, config = {}) => {
    try {
        apiClient.delete(url, config).then(res => {
            console.log(res);
            return true
        })
            .catch(err => {
                console.log(err);
                return false;
            });
    } catch (error) {
        console.error('Error when Sending:', error);
    }
    return true;
}

const _update = (url, config = {}) => {
    try {
        apiClient.put(url, config).then(res => {
            console.log(res);
            return true
        })
            .catch(err => {
                console.log(err);
                return false;
            });
    } catch (error) {
        console.error('Error when Sending:', error);
    }
    return true;
}

// export API methods
export {_get, _post, _delete, _update};