//update time and display on the clock page	
function updateClock(){
	var clockTime = new Date();
	$("#clock").text(formatStdTime(clockTime));
	$("#clockMS").text(formatMsec(clockTime));
	rafClock = requestAnimationFrame(updateClock);
}