const  APIClientRequest = (url: string, options = {}) => {
    let returnedData: any

    returnedData = fetch(url, options)
        .then(response =>response.json())
        .then(data => data)
        .catch(error => {
            console.error(error)
            return error
        })

    return returnedData;
}

export default APIClientRequest