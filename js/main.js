$(document).ready(function () {

var url = 'http://192.168.107.55/data1.php';
//var url = 'http://localhost/data.php';

var dataArray = new Array();
var deviceOrientation = 0;

if(window.innerHeight > window.innerWidth) {
	deviceOrientation = 0;
} else {
	deviceOrientation = 1;
}


$( window ).on( "orientationchange", function( event ) {
	//$( "#orientation" ).text( "This device is in " + event.orientation + " mode!" );
	if(event.orientation == 'portrait') {
		deviceOrientation = 0;
	} else {
		deviceOrientation = 1;
	}
	//deviceOrientation = event.orientation;
	renderData(dataArray);
});

$.getJSON(url, function(jsonData) {
	//alert(jsonData);	
	$.each(jsonData, function(k, v) {
		dataArray[k] = new Array();
		$.each(v, function(k1, v1) {
			dataArray[k][k1] = v1;
		});
	});
	
	renderData(dataArray);
	
});

//dataArray[0] = new Array();
//dataArray[1] = new Array();
//dataArray[2] = new Array();
//dataArray[3] = new Array();
//dataArray[4] = new Array();

//dataArray[0][0] = 'Username';dataArray[0][1] = 'Firstname';dataArray[0][2] = 'Lastname';dataArray[0][3] = 'Job';
//dataArray[1][0] = 'Username';dataArray[1][1] = 'Firstname';dataArray[1][2] = 'Lastname';dataArray[1][3] = 'Job';
//dataArray[2][0] = 'Username';dataArray[2][1] = 'Firstname';dataArray[2][2] = 'Lastname';dataArray[2][3] = 'Job';
//dataArray[3][0] = 'Username';dataArray[3][1] = 'Firstname';dataArray[3][2] = 'Lastname';dataArray[3][3] = 'Job';
//dataArray[4][0] = 'Username';dataArray[4][1] = 'Firstname';dataArray[4][2] = 'Lastname';dataArray[4][3] = 'Job';


function renderData(dataArray) {
	var headers = dataArray[0];
	var html = '';
	if(deviceOrientation == 0) {
		html += '<ul data-role="listview" data-divider-theme="b" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">';
		for(var j=1; j < dataArray.length; j++) {
			//html += '<li data-theme="c" class="ui-li ui-li-static ui-btn-up-c">';
			html += '<li data-theme="c" class="ui-li ui-li-static ui-btn-up-c"><table style="width: 100%;">';
			for(var k=0; k < dataArray[j].length; k++) {
				//html += '<div style="width:49%; float: left;">'+headers[k]+' :</div><div style="width:49%; float: right;">'+dataArray[j][k]+'</div>';
				html += '<tr><td>'+headers[k]+' :</td><td>'+dataArray[j][k]+'</td></tr>';
			}
			//html += '</li>';
			html += '</table></li>';
		}
		html += '</ul>';
		$("#contentContainer").html(html);
	} else {
		html += '<table data-role="table" id="my-table" data-mode="reflow" class="ui-responsive customTableUi">';
		html += '<thead><tr>';
		for(var i=0; i < dataArray[0].length; i++) {
			html += '<th>'+dataArray[0][i]+'</th>';
		}
		html += '</tr></thead><tbody>';
		for(var j=1; j < dataArray.length; j++) {
			html += '<tr>';
			for(var k=0; k < dataArray[j].length; k++) {
				html += '<td>'+dataArray[j][k]+'</td>';
			}
			html += '</tr>';
		}
		html += '</tbody></table>';
		
		$("#contentContainer").html(html);
	}

}

renderData(dataArray);


function isTouchDevice(){
    try{
        document.createEvent("TouchEvent");
        return true;
    }catch(e){
        return false;
    }
}

function touchScroll(id){
    if(isTouchDevice()){ //if touch events exist...
        var el=document.getElementById(id);
        var scrollStartPos=0;

        document.getElementById(id).addEventListener("touchstart", function(event) {
            scrollStartPos=this.scrollTop+event.touches[0].pageY;
            event.preventDefault();
        },false);

        document.getElementById(id).addEventListener("touchmove", function(event) {
            this.scrollTop=scrollStartPos-event.touches[0].pageY;
            event.preventDefault();
        },false);
}

touchScroll("contentContainer");

});