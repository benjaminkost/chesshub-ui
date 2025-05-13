import axios from 'axios'

const baseURL = import.meta.env.VITE_CHESS_SCORESHEET_DIGITALIZATION_BASEURL;

const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 10000
})

export const _post = (url, config = {}) => {
    try {
        return apiClient.post(url, config)
            .then(res => {
            console.log(res)
            return res;
        })
            .catch(err => {
                console.log(err)
            });
    } catch (e) {
        console.error("Error when sending: " + e)
    }
}