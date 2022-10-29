const key = "VwNCfWoTUdwZLFIa9xvrQwqB33bTgq2b"

//getting city information

const getCity = async (city) => {

    const base = "http://dataservice.accuweather.com/locations/v1/cities/search"    //copy url
    const query = `?apikey=${key}&q=${city}`

    const response = await fetch(base + query)

    const data = await response.json()

    // console.log(data[0]);  //is the closest match

    return data[0];

}

//calling city info function

// getCity('delhi').then((data)=>{
//     console.log("requst resolve",data);
// }).catch((err)=>{
//     console.log("some error in fetching",err.message);
// })



//getting city weather information

const cityWeather = async (id) => {                             //it returns a promise  in parameter id is the key eg 202396
    const base = "http://dataservice.accuweather.com/currentconditions/v1/"
    const query = `${id}?apikey=${key}`                                      //id is predefine key
    const response = await fetch(base + query)
    const data = await response.json()
    // console.log(data);
    return data[0]
}


// cityWeather("202396")                            //calling function by the weather key
// cityWeather("202396").then((data)=>{
//     console.log(data);
// }).catch((err)=>{
//     console.log(err.message);
// })



//but we need to merge city weather and city info so we merge the city weather in city info
getCity("delhi").then((data)=>{
    return cityWeather(data.Key)                 //ye raha city weather ka data aur Key
}).then((data)=>{
    console.log("request resolve",data);
}).catch((err)=>{
    console.log("request decline",err.message);
})







// for demo only
// getCity('delhi').then(data => {
//     return cityWeather(data.Key);
// }).then(data => {
//     console.log(data);
// }).catch(err => console.log(err));
