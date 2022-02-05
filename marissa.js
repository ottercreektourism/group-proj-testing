let searchButton = document.querySelector("#search");

searchButton.addEventListener("click", () => {
    console.log("button pressed");
    sendApiRequest(starSearch)
})
// let observer = {
//     latitude: 33.775867,
//     longitude: -84.39733,
//     // date: moment(this.date).format("YYYY-MM-DD"),
//     date: "2022-02-01"
// }

let starSearch = {
    "style": "inverted",
    "observer": {
        "latitude": 33.775867,
        "longitude": -84.39733,
        "date": "2019-12-20"
    },
    "view": {
        "type": "constellation",
        "parameters": {
            "constellation": "ori" // 3 letter constellation id
        }
    }
}


//An asyncronous function to fetch data from the API
async function sendApiRequest(starView) {
    let applicationId = "570c18ee-252e-4e18-a721-e8624c977166"
    let applicationSecret = "8a10ea4475bc233d87c49f1e0092f9f848b4c8283f95afc5961bd6d2b8123f4b56755ef5498ce5c739bc7652fba958b32b9e3048e673f9f405538b3d0473e5bfde67db26603d4e83558cc306b9829eab2eca0177bebb028d99163d6719008cc734c11e8b2e7cdbdd6e8ba5984c4d314e"
    const hash = btoa(`${applicationId}:${applicationSecret}`);
    let response = await fetch(`https://api.astronomyapi.com/api/v2/studio/star-chart`, {
        method: "POST",
        header: {
            Authorization: "Basic " + hash
        }, body: JSON.stringify(starView) 
    });

    console.log(response);
    let data = await response.json()
    console.log(data)
    useApiData(data.data)
}

// Function that does something with the data that was received from the API
function useApiData(data) {
    document.querySelector("#content").innerHTML += data.longitude // last part is placeholders bc the info is not found
    // document.querySelector('#content').innerHTML += data.id
    // document.querySelector('#content').innerHTML += `<img src="${data.url}">` // Image add-- data.url will be sth else
}