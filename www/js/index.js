/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);


    navigator.geolocation.getCurrentPosition(localizarte, onError, { enableHighAccuracy:true });
}


function init()
    {
      var btnlogin = document.getElementById("btnlogin");
      btnlogin.addEventListener("click", loginbtn, false);
        var myButton = document.getElementById("btnhistorial");
        myButton.addEventListener("click", historial, false);
        var btnhome = document.getElementById("btnhome");
        btnhome.addEventListener("click", home, false);
 
    }

    function loginbtn()
    {
        window.location = "index.html";
    }
    function historial()
    {
        window.location = "historial.html";
    }
    function home()
    {
        window.location = "index.html";
    }


// Start watching the acceleration
//
function startWatch() {

  // Update acceleration every 3 seconds
  var options = { frequency: 3000 };

  watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

// Stop watching the acceleration
//
function stopWatch() {
  if (watchID) {
      navigator.accelerometer.clearWatch(watchID);
      watchID = null;
  }
}

// onSuccess: Get a snapshot of the current acceleration
//

// onError: Failed to get the acceleration
//
function onError() {
  alert('onError!');
}
function initMap() {
  // Es la primera function que se ejecuta
  //app.initialize();
}
function onError(error) {
  alert('Código de error: '    + error.code    + '\n' +   'Mensaje: ' + error.message + '\n');
}

function localizarte(position){
$("#todo").css("display","block");
la=position.coords.latitude;
lo=position.coords.longitude;
//alert(la +"|"+ lo);
              
crearMapa(la, lo);
} 

function actualizarmap(position){
  la=position.coords.latitude;
  lo=position.coords.longitude;
  
  var element = document.getElementById('accelerometer');
  element.innerHTML = 'Lat: ' + la         + '<br />' +
                      'Log: ' + lo         + '<br />';
     
                      
  user =sessionStorage.getItem("id");
	url ="http://spmensajeria.com/admin/mapa.php?user="+user+"&lat="+la+"&log="+lo+"";

fetch(url)
.then((response) => {
    return response.json();
  })
  .then((myJson) => {
	//console.log(myJson);

  })
  } 

  
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
function crearMapa(la, lo) {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: { lat: la, lng: lo}, 
  });
  const image =
    "http://spmensajeria.com/admin/images/beachflag1.png";
  const beachMarker = new google.maps.Marker({
    position: { lat: la, lng: lo },
    map,
    icon: image,
    title:"Usuario",
  }); 
} 



var watchID = navigator.geolocation.watchPosition(actualizarmap, onError, { timeout: 60000 });


