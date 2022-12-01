const submit=document.getElementById('submitbutton');
const city=document.getElementById('cityName');
const city_name=document.getElementById('city_name')
const temp_status=document.getElementById('temp_status');
const temp=document.getElementById('temp');
const datahide=document.querySelector('.middle_layer');

const getinfo=async(event)=>{
    event.preventDefault()
    // alert('hi')
    let cityVal=city.value;


if (cityVal==="") {
    city_name.innerText=`please write the full city name`
    datahide.classList.add('data_hide')
}else{
    try {
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=31de81a5286bb2ccd8d8b7a55de47dc0`
    const response=await fetch(url);
    console.log(response);
    let data=await response.json();
    console.log(data)

    const arrData=[data];
    city_name.innerText=`${arrData[0].name},${arrData[0].sys.country}`
    temp.innerText=arrData[0].main.temp;
    // temp_status.innerText=arrData[0].weather[0].main;
    const mood=arrData[0].weather[0].main;
    if (mood=='Clear') {
        temp_status.innerHTML=`<i class='fa-solid fa-sun' style='color:yellow'><span class="mb-3 pb-3"style=font-size:12px> Sunrise</span></i>`
    } else if (mood=='clouds') {
        temp_status.innerHTML=`<i class='fa-solid fa-cloud' style='color:#f1f2f6;'><span class="mb-3"style=font-size:12px;> Cloud</span></i>`
        
    } else if (mood=='Rain') {
        temp_status.innerHTML=`<i class='fa-sharp fa-solid fa-cloud-rain' style='color:#a4b0be;'><span class="mb-3"style=font-size:12px;>Rain</span></i>` 
    } else{
        temp_status.innerHTML=`<i class='fa-solid fa-cloud' style='color:#a4b0be'><span class="mb-3 pb-3"style=font-size:12px;> Cloud</span></i>`

    }
    datahide.classList.remove('data_hide');



    } catch (error) {
        city_name.innerText=`please catch the error`
    datahide.classList.add('data_hide')

    }
    }


}

submit.addEventListener('click',getinfo)