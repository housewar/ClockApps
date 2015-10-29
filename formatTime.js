function formatClock(time){
	var hours = time.getHours();
	if (hours > 12){
	hours -= 12;
	}
	return [hours, ("00" + time.getMinutes()).slice(-2)].join(":");
}
function formatClockAMPM(time){
	var hours = time.getHours();
	if (hours > 12) {
		return "PM";
	} else {
		return "AM";
	}
}
function formatStdTime(time){
	return [('00' + time.getHours()).slice(-2),
			('00' + time.getMinutes()).slice(-2),
			('00' + time.getSeconds()).slice(-2)]
			.join(":");
}
function formatUTCTime(time){
	return [('00' + time.getUTCHours()).slice(-2),
			('00' + time.getUTCMinutes()).slice(-2),
			('00' + time.getUTCSeconds()).slice(-2)]
			.join(":");
}
function formatMsec(time) {
	return ('000' + time.getMilliseconds()).slice(-3, -1);
}