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

const _post = async (url:string, config = {}):Promise<boolean> => {
    try {
        // Warten auf die Antwort von Axios
        const res = await apiClient.post(url, config);

        console.log('Server Response:', res);

        // Axios wirft bei 4xx/5xx automatisch einen Fehler,
        // daher landen wir hier nur bei 2xx Statuscodes.
        return res.status >= 200 && res.status < 300;

    } catch (error) {
        // Hier landen alle Netzwerkfehler oder 4xx/5xx Antworten
        console.error('Error when Sending:', error);
        return false;
    }
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