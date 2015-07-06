
var drawMap = function() {
  var map = L.map('container');
  map.setView([47, -100], 3);
  var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
  layer.addTo(map);
  getData(map);
}

var getData = function(map) {
  $.ajax({url: "data/response.json", success: function(response){
  		customBuild(response, map);
  	},
	error: function(){
		$('#container').html("There has been an error getting your data.");
	}});
}

var customBuild = function(response, map) {
	var arr = $.parseJSON(response);
	for(var i = 0; i < arr.length; i++){
		var source = arr[i]['Source Link'];
		var summary = arr[i]['Summary'];
		var year = null;
		if(arr[i]['Date Searched'] != undefined){
			year = arr[i]['Date Searched'].substr(arr[i]['Date Searched'].length - 4);
		}
		var circColor = 'yellow';
		if(arr[i]['Hit or Killed?'] == 'Killed'){
			circColor = 'red';
		}
		var circle = L.circleMarker([arr[i].lat, arr[i].lng], {
			color: circColor,
			fillColor: circColor 
		}).addTo(map);
		circle.setRadius(radius(year));
		circle.bindPopup(summary+ " <a target=\"blank\" href="+source+">Full Story</a>");
	}
}

var radius = function(year){
	var currYear = new Date().getFullYear();
	var diff = currYear - year;
	if(diff > 15){
		return 3;
	}
	if(diff < 5){
		return 15;
	}
	return 15/(diff/5);
}


