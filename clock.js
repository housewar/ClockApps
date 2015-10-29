//update time and display on the clock page	
function updateClock(){
	var clockTime = new Date();
	$("#clock").text(formatClock(clockTime));
	$("#clockMS").text(formatClockAMPM(clockTime));
	rafClock = requestAnimationFrame(updateClock);
}