// Import the apiService function from the apiService.js file
// "../api/apiService" means:
// Go one folder back (..)
// Then go inside the "api" folder
// Then access "apiService"
import apiService from "../api/apiService";


// Create an asynchronous function called addResumeAPI
// reqBody is the data that we want to send to the backend/API
export const addResumeAPI = async (reqBody) => {

    // Call the apiService function
    //
    // "POST"       -> HTTP method
    // "/allResumes"-> API endpoint where the data should be sent
    // reqBody      -> Data that we want to send
    //
    // await waits until the API request is completed
    // return sends the API response back to whoever called addResumeAPI()
    return await apiService("POST", "/allResumes", reqBody);
};

// api call for getting single resume, called by view resume when page loaded

export const getSingleResume = async (id) => {
    return await apiService("GET", `/allResumes/${id}`, {})
}
// api call for download resume

export const downloadResumeAPI = async (reqBody) => {
    return await apiService("POST", `/history`, reqBody)
}
export const editResumeAPI = async (id,reqBody) =>{
    return await apiService("PUT",`/allResumes/${id}`,reqBody)
}

// api call for get download history
export const getHistoryAPI = async () => {
    return await apiService("GET", `/history`, {})
}

// api call for delete downloaded resume
export const deleteHistoryAPI = async (id) =>{
    return await apiService ("DELETE", `/history/${id}`,{})
}