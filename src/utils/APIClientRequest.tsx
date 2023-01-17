const  APIClientRequest = (url: string, options: any = {}): Promise<any> => {
    let returnedData: Promise<any>

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