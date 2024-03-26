$(document).ready(function(){
  var cities=["Delhi","Mumbai", "Kolkāta","Bangalore","Chennai","Hyderābād","Pune","Ahmedabad","Sūrat","Lucknow","Jaipur","Cawnpore","Mirzāpur","Nāgpur","Ghāziābād","Indore","Vadodara","Vishākhapatnam","Bhopāl","Chinchvad","Patna","Ludhiāna","Agra"];
    $("#inputcity").autocomplete({source:cities});
});
const news_apikey="b098423da34f43cfbc478cb833d0aab7";
const news_catcher="FkH-A8XaIqzRoZUk5D9GiRKlharEMjVUNrY8AH8IhT8";
var today= new Date();
if(today.getMinutes()<10)
{
  var time= today.getHours()+" : 0"+today.getMinutes();
}
else{
  var time= today.getHours()+" : "+today.getMinutes();
}
//days
const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var day= today.getDay(); //current day
//console.log(days[day]);
const apikey="5ef777fec45e196132cf4844b99a850b";


const deg="\xB0 C";
$(".time").text(time);
const api_url="https://api.openweathermap.org/data/2.5/forecast?lat=26.85&lon=80.95&appid=06dff67c99601c67ce0ac156c751798d";
const forecast_api="api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";




//forecast

 fetch(api_url)
 .then(res=>res.json())
 .then(data=>{
   console.log(data);
 })
//current location weather
//
function currentWeather(){
  // window.addEventListener("load",()=>{
    let long;
    let lat;
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        long=position.coords.longitude;
        lat=position.coords.latitude;
        const api="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=06dff67c99601c67ce0ac156c751798d ";
        const map_url="https://openweathermap.org/weathermap?zoom=6&lat="+lat+"&lon="+long+"&layer=radar";
        $("#radar-map").attr('src',map_url);

        fetch(api)
        .then(res => res.json())
        .then(data=> {
          //console.log(data);
          const {name}=data;
          var temp=data.main.temp;
          var humid=data.main.humidity;
          var wind= data.wind.speed;
          var desc=data.weather[0].description;
          // var ans=desc.localeCompare("mist");
          // if(ans==0){
          // $(".card-body").css("background-color","#E7F6F2");
          // }
          desc=desc.charAt(0).toUpperCase()+desc.slice(1).toLowerCase();
          var icon=data.weather[0].icon;
          var visible=data.visibility;
          visible=visible/1000;
          const img_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";

          $(".city").text(name);
          $(".temp").text(Math.round(temp-273)+deg);
          $(".description").text(desc);
          $(".wind").text(wind+" m/s");
          $(".humidity").text(humid+" %");
          $(".visibility").text(visible+" km");
          $("#weather-icon").attr('src',img_url);

        })
      }

      )}

  }

window.addEventListener("load",function(){
  currentWeather();
})


//by pressing enter key invoke search button

$(".searchbox").keypress(function(event){
  if(event.keyCode===13)
  {
    $(".search-btn").click();
  }
});





//input city weather




$(".search-btn").click(function(){
  var input=document.getElementById('inputcity').value;
  if(input==="")
  {
    alert("City cannot be empty!")
    currentWeather();
  }
  input= input.charAt(0).toUpperCase()+input.slice(1).toLowerCase();
   $(".city").text(input);
   $(".time").text(time);
   const geocoding_api="http://api.openweathermap.org/geo/1.0/direct?q="+input+"&limit=1&appid=06dff67c99601c67ce0ac156c751798d";

   const url="https://api.openweathermap.org/data/2.5/weather?q="+input+"&appid="+apikey+"&units=metric";
   fetch(url)
   .then(res => res.json())
   .then(data=> {
     //console.log(data);
     var temp=data.main.temp;
     var humid=data.main.humidity;
     var wind= data.wind.speed;
     var desc=data.weather[0].description;
     desc=desc.charAt(0).toUpperCase()+desc.slice(1).toLowerCase();
     var icon=data.weather[0].icon;
     var visible=data.visibility;
     visible=visible/1000;
     const img_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";

     $(".temp").text(temp+deg);
     $(".description").text(desc);
     $(".wind").text(wind+" m/s");
     $(".humidity").text(humid+" %");
     $(".visibility").text(visible+" km");
     $("#weather-icon").attr('src',img_url);

});

//inputcity radar
fetch(geocoding_api)
.then(res => res.json())
.then(data=>{
//console.log(data);

var lat=data[0].lat;
var long=data[0].lon;
// console.log(lat);
//console.log(long);
const radar_url="https://openweathermap.org/weathermap?zoom=6&lat="+lat+"&lon="+long+"&layer=radar";
$("#radar-map").attr('src',radar_url);

});
});

//news
const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const apiKey = "b098423da34f43cfbc478cb833d0aab7";
const url = `${proxyUrl}https://newsapi.org/v2/everything?q=weather&language=en&apiKey=${apiKey}`;
const request = new Request(url);

fetch(request)
  .then(response => response.json())
  .then((news) => {
    console.log(news);
  })
  .catch(error => {
    console.log(error);
  });

// const news_url="https://newsapi.org/v2/everything?q=bitcoin&apiKey=b098423da34f43cfbc478cb833d0aab7";
// var url = news_url;
// var req = new Request(url);
//
// fetch(req)
//     .then(function(response) {
//         console.log(response.json());
//     })

// var url="https://api.newscatcherapi.com/v2/search?q=Weather&lang=en&countries=IN&x-api-key:"+news_catcher;
//
// var req = new Request(url);
//
// fetch(req)
//     .then(function(response) {
//         console.log(response.json());
//     })





////
//
// "Kalyān",
// "Madurai",
// "Jamshedpur",
// "Nāsik",
// "Farīdābād",
// "Aurangābād",
// "Rājkot",
// "Meerut",
// "Jabalpur",
// "Thāne",
// "Dhanbād",
// "Allahābād",
// "Vārānasi",
// "Srīnagar",
// "Amritsar",
// "Alīgarh",
// "Bhiwandi",
// "Gwalior",
// "Bhilai",
// "Hāora",
// "Rānchi",
// "Bezwāda",
// "Chandīgarh",
// "Mysore",
// "Raipur",
// "Kota",
// "Bareilly",
// "Jodhpur",
// "Coimbatore",
// "Dispur",
// "Guwāhāti",
// "Solāpur",
// "Trichinopoly",
// "Hubli",
// "Jalandhar",
// "Bhubaneshwar",
// "Bhayandar",
// "Morādābād",
// "Kolhāpur",
// "Thiruvananthapuram",
// "Sahāranpur",
// "Warangal",
// "Salem",
// "Mālegaon",
// "Kochi",
// "Gorakhpur",
// "Shimoga",
// "Tiruppūr",
// "Guntūr",
// "Raurkela",
// "Mangalore",
// "Nānded",
// "Cuttack",
// "Chānda",
// "Dehra Dūn",
// "Durgāpur",
// "Āsansol",
// "Bhāvnagar",
// "Amrāvati",
// "Nellore",
// "Ajmer",
// "Tinnevelly",
// "Bīkaner",
// "Agartala",
// "Ujjain",
// "Jhānsi",
// "Ulhāsnagar",
// "Davangere",
// "Jammu",
// "Belgaum",
// "Gulbarga",
// "Jāmnagar",
// "Dhūlia",
// "Gaya",
// "Jalgaon",
// "Kurnool",
// "Udaipur",
// "Bellary",
// "Sāngli",
// "Tuticorin",
// "Calicut",
// "Akola",
// "Bhāgalpur",
// "Sīkar",
// "Tumkūr",
// "Quilon",
// "Muzaffarnagar",
// "Bhīlwāra",
// "Nizāmābād"
// "Bhātpāra",
// "Kākināda",
// "Parbhani",
// "Pānihāti",
// "Lātūr",
// "Rohtak",
// "Rājapālaiyam",
// "Ahmadnagar",
// "Cuddapah",
// "Rājahmundry",
// "Alwar",
// "Muzaffarpur",
// "Bilāspur",
// "Mathura",
// "Kāmārhāti",
// "Patiāla",
// "Saugor",
// "Bijāpur",
// "Brahmapur",
// "Shāhjānpur",
// "Trichūr",
// "Barddhamān",
// "Kulti",
// "Sambalpur",
// "Purnea",
// "Hisar",
// "Fīrozābād",
// "Bīdar",
// "Rāmpur",
// "Shiliguri",
// "Bāli",
// "Pānīpat",
// "Karīmnagar",
// "Bhuj",
// "Ichalkaranji",
// "Tirupati",
// "Hospet",
// "Aīzawl",
// "Sannai",
// "Bārāsat",
// "Ratlām",
// "Handwāra",
// "Drug",
// "Imphāl",
// "Anantapur",
// "Etāwah",
// "Rāichūr",
// "Ongole",
// "Bharatpur",
// "Begusarai",
// "Sonīpat",
// "Rāmgundam",
// "Hāpur",
// "Uluberiya",
// "Porbandar",
// "Pāli",
// "Vizianagaram",
// "Puducherry",
// "Karnāl",
// "Nāgercoil",
// "Tanjore",
// "Sambhal",
// "Naihāti",
// "Secunderābād",
// "Kharagpur",
// "Dindigul",
// "Shimla",
// "Ingrāj Bāzār",
// "Ellore",
// "Puri",
// "Haldia",
// "Nandyāl",
// "Bulandshahr",
// "Chakradharpur",
// "Bhiwāni",
// "Gurgaon",
// "Burhānpur",
// "Khammam",
// "Madhyamgram",
// "Ghāndīnagar",
// "Baharampur",
// "Mahbūbnagar",
// "Mahesāna",
// "Ādoni",
// "Rāiganj",
// "Bhusāval",
// "Bahraigh",
// "Shrīrāmpur",
// "Tonk",
// "Sirsa",
// "Jaunpur",
// "Madanapalle",
// "Hugli",
// "Vellore",
// "Alleppey",
// "Cuddalore",
// "Deo",
// "Chīrāla",
// "Machilīpatnam",
// "Medinīpur",
// "Bāramūla",
// "Chandannagar",
// "Fatehpur",
// "Udipi",
// "Tenāli",
// "Sitalpur",
// "Conjeeveram",
// "Proddatūr",
// "Navsāri",
// "Godhra",
// "Budaun",
// "Chittoor",
// "Harīpur",
// "Saharsa",
// "Vidisha",
// "Pathānkot",
// "Nalgonda",
// "Dibrugarh",
// "Bālurghāt",
// "Krishnanagar",
// "Fyzābād",
// "Silchar",
// "Shāntipur",
// "Hindupur",
// "Erode",
// "Jāmuria",
// "Hābra",
// "Ambāla",
// "Mauli",
// "Kolār",
// "Shillong",
// "Bhīmavaram",
// "New Delhi",
// "Mandsaur",
// "Kumbakonam",
// "Tiruvannāmalai",
// "Chicacole",
// "Bānkura",
// "Mandya",
// "Hassan",
// "Yavatmāl",
// "Pīlibhīt",
// "Pālghāt",
// "Abohar",
// "Pālakollu",
// "Kānchrāpāra",
// "Port Blair",
// "Alīpur Duār"
// "Hāthras",
// "Guntakal",
// "Navadwīp",
// "Basīrhat",
// "Hālīsahar",
// "Rishra",
// "Dharmavaram",
// "Baidyabāti",
// "Darjeeling",
// "Sopur",
// "Gudivāda",
// "Adilābād",
// "Titāgarh",
// "Chittaurgarh",
// "Narasaraopet",
// "Dam Dam",
// "Vālpārai",
// "Osmānābād",
// "Champdani",
// "Bangaon",
// "Khardah",
// "Tādpatri",
// "Jalpāiguri",
// "Suriāpet",
// "Tādepallegūdem",
// "Bānsbāria",
// "Negapatam",
// "Bhadreswar",
// "Chilakalūrupet",
// "Kalyani",
// "Gangtok",
// "Kohīma",
// "Khambhāt",
// "Aurangābād",
// "Emmiganūr",
// "Rāyachoti",
// "Kāvali",
// "Mancherāl",
// "Kadiri",
// "Ootacamund",
// "Anakāpalle",
// "Sirsilla",
// "Kāmāreddipet",
// "Pāloncha",
// "Kottagūdem",
// "Tanuku",
// "Bodhan",
// "Karūr",
// "Mangalagiri",
// "Kairāna",
// "Mārkāpur",
// "Malaut",
// "Bāpatla",
// "Badvel",
// "Jorhāt",
// "Koratla",
// "Pulivendla",
// "Jaisalmer",
// "Tādepalle",
// "Armūr",
// "Jatani",
// "Gadwāl",
// "Nagari",
// "Wanparti",
// "Ponnūru",
// "Vinukonda",
// "Itānagar",
// "Tezpur",
// "Narasapur",
// "Kothāpet",
// "Mācherla",
// "Kandukūr",
// "Sāmalkot",
// "Bobbili",
// "Sattenapalle",
// "Vrindāvan",
// "Mandapeta",
// "Belampalli",
// "Bhīmunipatnam",
// "Nāndod",
// "Pithāpuram",
// "Punganūru",
// "Puttūr",
// "Jalor",
// "Palmaner",
// "Dholka",
// "Jaggayyapeta",
// "Tuni",
// "Amalāpuram",
// "Jagtiāl",
// "Vikārābād",
// "Venkatagiri",
// "Sihor",
// "Jangaon",
// "Mandamāri",
// "Metpalli",
// "Repalle",
// "Bhainsa",
// "Jasdan",
// "Jammalamadugu",
// "Rāmeswaram",
// "Addanki",
// "Nidadavole",
// "Bodupāl",
// "Rājgīr",
// "Rajaori",
// "Naini Tal"
// "Channarāyapatna",
// "Maihar",
// "Panaji",
// "Junnar",
// "Amudālavalasa",
// "Damān",
// "Kovvūr",
// "Solan",
// "Dwārka",
// "Pathanāmthitta",
// "Kodaikānal",
// "Udhampur",
// "Giddalūr",
// "Yellandu",
// "Shrīrangapattana",
// "Angamāli",
// "Umaria",
// "Fatehpur Sīkri",
// "Mangūr",
// "Pedana",
// "Uran",
// "Chimākurti",
// "Devarkonda",
// "Bandipura",
// "Silvassa",
// "Pāmidi",
// "Narasannapeta",
// "Jaynagar-Majilpur",
// "Khed Brahma",
// "Khajurāho",
// "Koilkuntla",
// "Diu",
// "Kulgam",
// "Gauripur",
// "Abu",
// "Curchorem",
// "Kavaratti",
// "Panchkula",
// "Kagaznāgār"
// ];
