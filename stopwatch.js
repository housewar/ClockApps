function Stopwatch(){
	var swBegin;
	var swCurrent;
	var swElapsed;
	var splitTime;
	var lastLap;
	var lapTime;
	var lapCount;
	var nextLap;
	
	Stopwatch.prototype.refresh = function(){
		swCurrent = new Date();
		swElapsed = new Date(swCurrent - swBegin);
		splitTime = new Date(swElapsed);
		lapTime = new Date(swCurrent - lastLap);
		$("#stopwatch").text(formatUTCTime(swElapsed));
		$("#stopwatchMS").text(formatMsec(swElapsed));
		rafStopwatch = requestAnimationFrame(this.refresh.bind(this));
	}
	Stopwatch.prototype.resume = function(){
		swBegin = new Date();
		lastLap = new Date(swBegin - lapTime);
		swBegin = new Date(swBegin - swElapsed);
		this.refresh();
	}
	Stopwatch.prototype.start = function(){
		lapCount = 0;
		swBegin = new Date();
		lastLap = new Date(swBegin);
		this.refresh();
	}
	Stopwatch.prototype.pause = function(){
		cancelAnimationFrame(rafStopwatch);
		swCurrent = new Date();
		swElapsed = new Date(swCurrent - swBegin);
		lapTime = new Date(swCurrent - lastLap);
		$("#stopwatch").text(formatUTCTime(swElapsed));
		$("#stopwatchMS").text(formatMsec(swElapsed));
	}
	Stopwatch.prototype.reset = function(){
		$("#stopwatch").text("00:00:00");
		$("#stopwatchMS").text("00");
		$(".lap-entry").remove();
	}
	Stopwatch.prototype.lap = function(){
		lapCount ++
		nextLap = new Date(swCurrent);
		splitTime = new Date(nextLap - swBegin);
		lapTime = new Date(nextLap - lastLap);
		lastLap = new Date(nextLap);
		$("#lap-output-count").prepend("<p class=\"lap-entry\"></p>");
		$("#lap-output-lap").prepend("<p class=\"lap-entry\"></p>");
		$("#lap-output-split").prepend("<p class=\"lap-entry\"></p>");
		$("#lap-output-count p:first-child").text("#" + lapCount);
		$("#lap-output-lap p:first-child").text(formatUTCTime(splitTime) + "." + formatMsec(splitTime));
		$("#lap-output-split p:first-child").text(formatUTCTime(lapTime) + "." + formatMsec(lapTime));
	}
}