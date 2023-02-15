

const ramdonImag = document.querySelector('#ramdonImag')
const containerImag = document.querySelector('#containerImag')
const containerFavoriteImg = document.querySelector('#container_michis_favorites')
const loader = document.querySelector('#loader')

const apiKey = 'live_fWag5oczp7S8ThnBXGCWNPdUjp0LisdY9kNnUo0Mv1Ri41retlp8LvRqMwj8jGYd'
const API_URL = `https://api.thecatapi.com/v1/images/search?limit=4&api_key=${apiKey}`
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites'
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'
const API_URL_FAVORITES_DELETE = (id)=> `/favourites/${id}`

const instanceAPi = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
  });
  
  instanceAPi.defaults.headers.common['X-API-KEY'] = apiKey

async function agregarFavorito(idImage){
    try {
        const {data, status} = await instanceAPi.post('/favourites', {
            image_id : idImage.toString()
        })
        if(status !== 200){
            console.warn(`Hubo un error de tipo ${status}, ${data.message}`)
        }else{
            console.log('se ha guardado tu michi en favoritos')
        }
        
        
    loadFavoriteMichis()
    } catch (error) {
        console.log('No se ha podido guardar tu michi en favoritos')
    }
}

const loadFavoriteMichis = async () => {
    try {
        const response = await fetch(
            API_URL_FAVORITES,{
                headers:{
                    "Content-Type":"application/json",
                    'x-api-key': apiKey
                }
            });
        const favorites = await response.json();
        containerFavoriteImg.innerHTML = ""
        for (const iterator of favorites) {
            
            let activeIdDelete = iterator.id;

            const div_img = document.createElement('div')
            div_img.classList.add('container_img-michi')

            const img = document.createElement("img");
            img.src = iterator.image.url
            img.classList.add('cat_img')

            const icon = document.createElement("img");
            icon.classList.add('icon')

            icon.setAttribute('src', 'trash.png')
            icon.addEventListener('click', ()=> eliminarDeFavoritos(activeIdDelete))

            div_img.append(icon,img);
            
            containerFavoriteImg.appendChild(div_img)
        }
    } catch (error) {
       console.log('Hay fallos para mostrar tus michis favoritos.') 
    }
}

async function eliminarDeFavoritos(idImageDelete){
    try {
        const {data, status} = await instanceAPi.delete(API_URL_FAVORITES_DELETE(idImageDelete), {
            
        })
        if(status !== 200){
            console.warn(`Hubo un error de tipo ${status}, ${data.message}`)
        }else{
            console.log('se ha eleminado el michi de favoritos')
        }
        loadFavoriteMichis()
       /*  const deleteMichi = await fetch(API_URL_FAVORITES_DELETE(idImageDelete),
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json',
                'x-api-key': apiKey},
            }
        )
        loadFavoriteMichis()
        console.log({
            deleteMichi
        }); */
    } catch (error) {
        console.log('No se ha podido eleiminar tu michi de favoritos')
    }
}


loadFavoriteMichis()

async function loadRandomMichis(){
    try {
        const res = await fetch(API_URL)
        const data = await res.json()
        containerImag.innerHTML ='';
        data.forEach((item)=>{
            let activeIdImg = item.id

            const div_img = document.createElement('div')
            div_img.classList.add('container_img-michi')

            const img = document.createElement("img");
            img.src = item.url;
            img.classList.add('cat_img')

            const icon = document.createElement("img");
            icon.classList.add('icon')

            icon.setAttribute('src', 'corazon.png')
            icon.addEventListener('click', ()=> agregarFavorito(activeIdImg))

            div_img.append(icon,img);
            
            containerImag.appendChild(div_img);
        })
        
        
    } catch (error) {
        if(res.status !== 200){
            console.log(`Hubo un error de tipo ${res.status}. ${data.message}`);
        }
    }
    
}
if(containerImag){
    const p = document.getElementById('message')
    p.innerText = 'cargando gatos'
}else{
    
    p.innerText = 'gatos cargados'
}
loadRandomMichis()


/* async function upLoadMichiPhoto(){
    const form = document.getElementById('upLoadingMichiForm')
    const formData = new FormData(form)
    
    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers:{
            'Content-Type': 'multipart/form-data',
            'x-api-key': apiKey
        },
        body: formData
    })
    console.log({res});
} */