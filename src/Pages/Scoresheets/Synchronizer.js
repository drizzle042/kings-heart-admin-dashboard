import { Helpers } from "../../Lib/Endpoints/Endpoints";


async function ScoresheetUploader(url, method, contentType, payload, requestToken){
    
    async function fetchData(endpoint){
        const tokens = requestToken
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
            "Authorization": "Bearer " + tokens,
            }
        })
        return response.json()
    }
    
    async function postFunc(endpoint){
        const tokens = requestToken
        const data = {
            data: payload
        }
        const response = await fetch(endpoint, {
            method: method,
            headers: {
            "Authorization": "Bearer " + tokens,
            "Content-Type": contentType,
            },
            body: JSON.stringify(data)
        })
        return response.json()
    }

    fetchData(Helpers.checkConnection)
        .then((data) => {
            if (data?.message === "Connected"){
                postFunc(url)
                    .then((message) => {
                        postMessage({message: message?.status})
                    })
            }
        })
}

onmessage = function(e){
    let url = e.data?.url
    let method = e.data?.method
    let contentType = e.data?.contentType
    let payload = e.data?.data
    let requestToken = e.data?.requestToken
    ScoresheetUploader(url, method, contentType, payload, requestToken)
}
