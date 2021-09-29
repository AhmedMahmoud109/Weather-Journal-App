const API_KEY = "1a03e836d2f1beaff52066aa4f4fc084";
let date = new Date();
let newDate = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
document.getElementById("btn").addEventListener('click',generate);

async function generate(){  
let feeling = document.querySelector('#feeling').value;
let zipCode = document.querySelector('#zipCode').value;
if(!zipCode){
    alert("Please enter a zipCode");
}
else {
const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}&units=metric`;
const fetching = await fetch(url)
  .then(async (fetching)=>{
      if(fetching.status==404){
          alert("Please enter a valid zip code")
      }else{
    const tempreture = await fetching.json();
    return tempreture;
      }

}).then((tempreture)=>{
    const data ={
        temp: tempreture.main.temp,

        feel: feeling,
    
        date: newDate
    };
    return data;

}).then(async (data)=>{
    const posting = await fetch("/post", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        ,
    })
}).then(()=>{
    UI_Updating();
}).catch((err)=>{
    console.log('An Error has occured!',err);
});
}
}
async function UI_Updating(){
    const data = await fetch('/get');
    try {
        const allData = await data.json();
        
        document.querySelector('#tempreture').innerHTML = `Tempreture: ${allData.temp}&#8451`;
        document.querySelector('#date').innerHTML = `Date: ${allData.date}`;
        document.querySelector('#results').innerHTML = `Feels: ${allData.feel}`;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}