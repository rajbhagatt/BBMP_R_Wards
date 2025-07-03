	
	
	function style_Parli(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'green',
        dashArray: '3',
        fillOpacity: 0
		};
	
	}
	
	function style_Ass(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'blue',
        dashArray: '3',
        fillOpacity: 0
		};
	
	}


	function style_Ward(feature) {
	
	return {
	    fillColor: 'white',
		weight: 1,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0
	
		};
	
	}

	function style_Scenario(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'red',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
		
	function style_BBMPOLD(feature) {
	
	return {
	    fillColor: 'white',
		weight: 3,
        opacity: 1,
        color: 'black',
        dashArray: '1',
        fillOpacity: 0
		};
	
	}
	
	
	
	//Do classification based on the merged data
	
	var zoom=10;
	
	
	
	latstart=13;
	longstart=77.5;	
	
	var map = L.map('map', {zoomControl: false}).setView([latstart, longstart], zoom);
	var zoomControl = L.control.zoom({ position: 'bottomleft' }).addTo(map);

	var Parli_M=L.geoJson(ParliConst, {style: style_Parli});
	var Ass_M=L.geoJson(AssConst, {style: style_Ass});
	var Ward_M=L.geoJson(BBMPWards, {style: style_Ward});
	var BBMP_OLD_M=L.geoJson(bbmpold, {style: style_BBMPOLD});
        var scmap=L.geoJson(BBMP51, {style: style_Scenario});

	
	googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{    maxZoom: 20,    subdomains:['mt0','mt1','mt2','mt3']}).addTo(map);


	
	
	function bgswitch() {
		map.removeLayer(googlebg);
		if (document.getElementById('bgbox').value=="roadmap") 
  {
      googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);
  } 
  else if (document.getElementById('bgbox').value=="hybrid") 
  {
	googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

  }
		
		else if (document.getElementById('bgbox').value=="satellite") 
		{
			googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);
		}
		
		else if (document.getElementById('bgbox').value=="terrain") 
		{
			googlebg = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);
		}
		
	}

function scswitch() {
		map.removeLayer(scmap);
		if (document.getElementById('scbox').value=="51") 
  {
      scmap=L.geoJson(BBMP51, {style: style_Scenario}).addTo(map);
  } 
  else if (document.getElementById('scbox').value=="511") 
  {
	scmap=L.geoJson(BBMP511, {style: style_Scenario}).addTo(map);

  }
		
		else if (document.getElementById('scbox').value=="52") 
		{
			scmap=L.geoJson(BBMP52, {style: style_Scenario}).addTo(map);

		}
		
		else if (document.getElementById('scbox').value=="522") 
		{
			scmap=L.geoJson(BBMP522, {style: style_Scenario}).addTo(map);

		}
		drawbasic();
	}

	function drawbasic() {
	map.removeLayer(Ward_M);
	Ward_M=L.geoJson(BBMPWards, {style: style_Ward,onEachFeature: function (feature, layer) {layer.bindPopup("<table  style='width:500px;height:100%;font-size:12px'><tr><td><b>Ward Name:</b> "+feature.properties.Ward_Name +"<br><br><b>Number:</b> "+feature.properties.Ward_No+"<br><br><b>Assembly:</b> "+feature.properties.Assembly_C+"<br><br><b>Parliament: </b>"+feature.properties.MP_Constit+"<br><br><b>Scenario 5.1:</b> "+feature.properties.Sc5_1+"<br><br><b>Scenario 5.1.1:</b> "+feature.properties.Sc5_1_1+"<br><br><b>Scenario 5.2:</b> "+feature.properties.Sc5_2+"<br><br><b>Scenario 5.2.2:</b> "+feature.properties.Sc5_2_2+"</td></tr></table>")}}).addTo(map);
	}


	function funcswitch() {
    // check if checkbox is checked
	map.eachLayer(function (layer) {
		if (layer!=googlebg)
		{
        map.removeLayer(layer);
		}
    });
    if ($("#parlibox").is(":checked"))
  {
Parli_M=L.geoJson(ParliConst, {style: style_Parli}).addTo(map);

  } 
  
  if ($('#assbox').is(":checked"))
  {

      Ass_M=L.geoJson(AssConst, {style: style_Ass}).addTo(map);
  } 
  
  
  if ($('#bbmpoldbox').is(":checked") )
  {
      BBMP_OLD_M=L.geoJson(bbmpold, {style: style_BBMPOLD}).addTo(map);
  } 
  
  
  
  }
	
	
	
	
	function drawmap(){
	
	//Title for the map
	
		//Initial view
	  
	//L.tileLayer(OSM_URL, {attribution: OSM_ATTRIB,id: 'examples.map-20v6611k', opacity:0.7}).addTo(map);
	
	
	/*
	Google Maps
<input type="checkbox" id="googlecheck">
<br>
	if (document.getElementById('googlecheck').checked)
	{
	var googleLayer = new L.Google('ROADMAP');
    map.addLayer(googleLayer);
	}
	*/
	
	/*
	for (i=0; i<POList.length; i++)
	      L.piechartMarker(
          L.latLng([POList_JS[i]["Latitude"], POList_JS[i]["Longitude"]]),
          {
			  radius:15,
              data: [
                  { name: 'Group A', value: POList_JS[i]["Group_A"], style: { fillStyle: 'rgba(255,0,0,.6)', strokeStyle: 'rgba(255,0,0,.95)'}},
                  { name: 'Group B', value: POList_JS[i]["Group_B"], style: { fillStyle: 'rgba(0,80,0,.6)', strokeStyle: 'rgba(255,0,0,.95)'} },
                  { name: 'Group C', value: POList_JS[i]["Group_C"], style: { fillStyle: 'rgba(244, 196, 48,.6)', strokeStyle: 'rgba(255,0,0,.95)'} },
                  
              ]
          ,
	
	onEachFeature: function (feature, layer) {
				layer.bindPopup("<table  style='width:500px;height:100%;font-size:12px'><tr><td><b>Name:</b> "+feature.properties.Name +"<br><br><b>Team:</b> "+feature.properties.Team+"<br><br><b>Languages:</b> "+feature.properties.Language+"<br><br><b>Bio: </b>"+feature.properties.AY+"</td><td ><img src=data/Pics/"+String(feature.properties.SlNo)+'.jpg  style="width:200px;height:250px;"></td></tr></table>', {
				maxWidth : 600
				}
				);
			}}
      ).addTo(map);
	
	*/
    
    
    }
	
	
	funcswitch();
	drawbasic();
	