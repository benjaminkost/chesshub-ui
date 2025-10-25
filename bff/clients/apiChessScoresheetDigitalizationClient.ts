import axios from 'axios';
const baseURL:string = import.meta.env.VITE_CHESS_SCORESHEET_DIGITALIZATION_BASEURL;

const apiClient = axios.create({
    baseURL: baseURL
})

export const _post = (url:string, config = {}) => {
    try {
        return apiClient.post(url, config)
            .then((response) => {
                console.log(response)

                // create file from text
                const file = new Blob([response.data], {type: 'text/plain'});

                // create a file link in browser memory
                const hrf = URL.createObjectURL(file)

                // create "a" HTML element with href to file & click
                const link = document.createElement("a");
                link.href = hrf;
                link.setAttribute("download", "game.pgn")

                console.log(hrf)

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                if( link.parentNode == null)
                {
                    console.log("No download link could be created")
                } else{
                    link.parentNode.removeChild(link);
                }
        })
            .catch(err => {
                console.log(err)
            });
    } catch (e) {
        console.error("Error when sending: " + e)
    }
}