let base_url ="https://api.football-data.org/v2/";
const token="fd433141f0d14b61a80e76bb22a5a322";

let liga_standing =       `${base_url}competitions/2019/standings`;
let teamDetail =          `${base_url}teams/`;

let fetchApi = url => {
  return fetch(url, {
    method: "get",
    mode: "cors",
    headers: {
      'X-Auth-Token': token
    }
  });
}

function status (response) {
  if (response.status !== 200) {
    console.log('Error : ' + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json (response) { 
  return response.json();
}

function error (error) {
  console.log('Error : ' + error);
}

function getStandings(league) {
  if ('caches' in window) {
    caches.match(league).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showData(data);
        });
      }
    });
  }

  fetchApi(league)
  .then(status)
  .then(json)
  .then(function(data) {
    showData(data);
  })
  .catch(error);
}

function showData(data){
  var standingsHTML = '';

  data.standings[0].table.forEach(function(dt) {
    standingsHTML += `
    <td>${dt.position}</td>
    <td><a href="team.html?id=${dt.team.id}">${dt.team.name}</a></td>
    <td>${dt.playedGames}</td>
    <td><b>${dt.points}</b></td>
    </tr>
    `;
  });
  document.getElementById("pertandingan").innerHTML = standingsHTML;
}



function getTeam(team) {
  if ('caches' in window) {
    caches.match(team).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showTeam(data);
        });
      }
    });
  }
  fetchApi(team)
  .then(status)
  .then(json)
  .then(function(data) {
    showTeam(data);

    let Simpan = document.getElementById("Simpan");
    let Hapus = document.getElementById("Hapus");

    Simpan.onclick = function () {
      addFavorite(data);
      Simpan.style.display = "none";
      Hapus.style.display = "block";
    };

    checkData(data.id).then((msg) => {
      Simpan.style.display = "none";
      Hapus.style.display = "block";
    }).catch((msg) => {
      Simpan.style.display = "block";
      Hapus.style.display = "none";
    });

    Hapus.onclick = function () {
      deleteFavorite(data.id);
      Simpan.style.display = "block";
      Hapus.style.display = "none";
    }
  })
  .catch(error);
}



function showTeam(data){
  var teamHTML = '';

  teamHTML += `<img src=${data.crestUrl.replace(/^http:\/\//i, 'https://')} alt=""  width="100" class="responsive-img" style="display: block; margin: auto">
  <center><h5>${data.name}</h5></center>

  <center>
  <button class="btn red " id="Hapus">Delete from favorite</button>
  <button class="btn green" id="Simpan">Add to favorite</button>
  </center>

  <br>
  <br> `;

  teamHTML += `<table class="responsive-table highlight" width=400>
  <thead class="green">
  <tr>
  <td>Name</td>
  <td>National</td>
  </tr>
  </thead>
  <tbody>`;

  data.squad.forEach(function(dt) {
    teamHTML += `
    <tr>
    <td>${dt.name}</td>
    <td>${dt.nationality}</td>
    </tr>
    `;
  });

  teamHTML += `</tbody></table>`;

  document.getElementById("teamInfo").innerHTML = teamHTML;
}



function getFavoritTeam() {
  var dbData = getFavData();
  dbData.then(function (data) {

   var timBodyHtml = '';
   data.forEach(function(team) {
     timBodyHtml +=`
     <div class="row">
          <a href="team.html?id=${team.id}">${team.name}</a>
     </div><br>`;
   });
   document.getElementById("favorite").innerHTML = timBodyHtml;                  
 });
  
}