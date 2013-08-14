
var url = 'http://192.168.107.55/data.php';
//var url = 'http://localhost/data.php';
var dataArray = new Array();
var deviceOrientation = 0;
alert(deviceOrientation);
alert(window.innerHeight);
alert(window.innerWidth);
if(window.innerHeight > window.innerWidth) {alert('az');
	deviceOrientation = 0;
	alert(deviceOrientation);
} else {alert('azsx');
	deviceOrientation = 1;
	alert(deviceOrientation);
}
alert(deviceOrientation);

$( window ).on( "orientationchange", function( event ) {
	$( "#orientation" ).text( "This device is in " + event.orientation + " mode!" );
	if(event.orientation == 'portrait') {
		deviceOrientation = 0;
	} else {
		deviceOrientation = 1;
	}
	//deviceOrientation = event.orientation;
	renderData(dataArray);
});

$.getJSON(url, function(jsonData) {
	alert(jsonData);	
	$.each(jsonData, function(k, v) {
		dataArray[k] = new Array();
		$.each(v, function(k1, v1) {
			dataArray[k][k1] = v1;
		});
	});
	
	renderData(dataArray);
	
});

function renderData(dataArray) {
	var headers = dataArray[0];
	var html = '';
	alert(deviceOrientation);
	if(deviceOrientation == 0) {alert('a');
		for(var j=1; j < dataArray.length; j++) {
			html += '<div><table>';
			for(var k=0; k < dataArray[j].length; k++) {
				html += '<tr><td>'+headers[k]+' :</td><td>'+dataArray[j][k]+'</td></tr>';
			}
			html += '</table></div>';
		}
		$("#contentContainer").html(html);
	} else {
		html += '<table data-role="table" id="my-table" data-mode="reflow">';
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