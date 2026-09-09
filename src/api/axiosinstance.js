import axios, { create } from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://rebuilder-server.onrender.com',
    timeout: 5000
})
// response interpretors : handlling global/common errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    // if response is error
    (error)=>{
        if(error.response){
            // error.response defines the error
            const status=error.response.status // store the status code passed by server
            if(status==401){
                console.log("Un-Authorized");
            }
            else if(status==404){
                console.log("API Not Found");
                
            }
            else if(status==500){
                console.log("Server Error!!");
                
            }
            else if(error.request){
                // if the response has request key that means there is no response from server.
                console.log("No response from server");
                
            }
            else{
                console.log("Error :"+error.message);
                
            }
            return Promise.reject(error)

        }
    }
)
export default axiosInstance