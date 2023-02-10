const ramdonImag = document.querySelector('#ramdonImag')
const containerImag = document.querySelector('#containerImag')
const apiKey = 'live_fWag5oczp7S8ThnBXGCWNPdUjp0LisdY9kNnUo0Mv1Ri41retlp8LvRqMwj8jGYd'
const API_URL = `https://api.thecatapi.com/v1/images/search?limit=6&api_key=${apiKey}`

 const fetchData = async (url) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        data.forEach((item)=>{
            const img = document.createElement("img");
            img.src = item.url;
            img.style='width:300px; height:300px'
            containerImag.appendChild(img);
        })
    } catch (error) {
        console.log(error)
    }
}

function reloadImag(){
    containerImag.innerHTML=null
    fetchData(API_URL)
}

reloadImag()
