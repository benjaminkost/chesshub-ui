import axios from 'axios';

const baseURL:string = import.meta.env.VITE_CHESSHUB_CORE_BASEURL;

const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// API calls
const _get = async (url:string, config = {}) => {
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

const _post = (url:string, config = {}):boolean => {
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

const _delete = (url:string, config = {}):boolean => {
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

const _update = (url:string, config = {}):boolean => {
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