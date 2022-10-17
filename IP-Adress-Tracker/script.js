const btn = document.querySelector("button");
const adress = document.getElementById("adrs");
const loc = document.getElementById("loc");
const timez = document.getElementById("timez");
const internet = document.getElementById("internet");
let newDiv1 = document.createElement("div");
let newDiv2 = document.createElement("div");
let newDiv3 = document.createElement("div");
let newDiv4 = document.createElement("div");

IP = document.querySelector("input").value;
async function get_user_ip() {
  const response = await fetch("https://api.db-ip.com/v2/free/self");
  const data = await response.json();
  const user_ip = data.ipAddress;
  document.querySelector("input").placeholder =
    " Search for any IP : " + user_ip;
}

Promise.resolve(get_user_ip());

searchIp(IP);

var lat = 0,
  longi = 0;
btn.addEventListener("click", () => {
  searchIp();
});

document.querySelector("input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchIp();
  }
});

function searchIp(IP) {
  IP = document.querySelector("input").value;

  fetch("https://ipapi.co/" + IP + "/json/")
    .then(function (response) {
      response.json().then((jsonData) => {`x`;
        newDiv1.innerText = jsonData.ip;
        adress.append(newDiv1);
        newDiv2.innerText = jsonData.city;
        loc.append(newDiv2);
        newDiv3.innerText = jsonData.timezone;
        timez.append(newDiv3);
        newDiv4.innerText = jsonData.org;
        internet.append(newDiv4);
        lat = jsonData.latitude;
        longi = jsonData.longitude;

        var container = L.DomUtil.get("map");
        if (container != null) {
          container._leaflet_id = null;
        }
        var map = L.map("map").setView([lat, longi], 13);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:  
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
