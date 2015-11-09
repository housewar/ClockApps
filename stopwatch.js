function Stopwatch(){
	var swBegin;
	var swCurrent;
	var swElapsed;
	this.splitTime;
	this.lastLap;
	this.lapTime;
	this.lapCount;
	var nextLap;
	var swLapTime;
	this.lastLapTime;
	
/*	Stopwatch.prototype.refresh = function(){
		swCurrent = new Date();
		swElapsed = new Date(swCurrent - swBegin);
		splitTime = new Date(swElapsed);
		lapTime = new Date(swCurrent - lastLap);
		$("#stopwatch").text(formatUTCTime(swElapsed));
		$("#stopwatchMS").text(formatMsec(swElapsed));
		$("#sw-progress").css('transform','rotate(' + ((swElapsed.getSeconds() * 6) + (swElapsed.getMilliseconds() * .006))+ 'deg)');
		rafStopwatch = requestAnimationFrame(this.refresh.bind(this));
	}
*/	
	Stopwatch.prototype.elapsed = function(){
		swCurrent = new Date();
		swElapsed = new Date(swCurrent - swBegin);
		return swElapsed;
	}
	Stopwatch.prototype.elapsedLap = function(){
		swLapTime = new Date(swCurrent - this.lastLap);
		return swLapTime;
	}
	Stopwatch.prototype.resume = function(){
		swBegin = new Date();
		this.lastLap = new Date(swBegin - this.lapTime);
		swBegin = new Date(swBegin - swElapsed);
//		this.refresh();
	}
	Stopwatch.prototype.start = function(){
		this.lapCount = 0;
		swBegin = new Date();
		this.lastLap = new Date(swBegin);
//		this.refresh();
	}
	Stopwatch.prototype.pause = function(){
//		cancelAnimationFrame(rafStopwatch);
		swCurrent = new Date();
		swElapsed = new Date(swCurrent - swBegin);
		this.splitTime = new Date(swElapsed);
		this.lapTime = new Date(swCurrent - this.lastLap);
//		$("#stopwatch").text(formatUTCTime(swElapsed));
//		$("#stopwatchMS").text(formatMsec(swElapsed));
	}
/*
	Stopwatch.prototype.reset = function(){
		$("#stopwatch").text("00:00:00");
		$("#stopwatchMS").text("00");
		$(".lap-entry").remove();
	}
*/
	Stopwatch.prototype.lap = function(){
		this.lapCount ++
		nextLap = new Date(swCurrent);
		this.splitTime = new Date(nextLap - swBegin);
		this.lapTime = new Date(nextLap - this.lastLap);
		this.lastLapTime = new Date(this.lapTime);
		this.lastLap = new Date(nextLap);
/*
		$("#lap-output-count").prepend("<p class=\"lap-entry\"></p>");
		$("#lap-output-lap").prepend("<p class=\"lap-entry\"></p>");
		$("#lap-output-split").prepend("<p class=\"lap-entry\"></p>");
		$("#lap-output-count p:first-child").text("#" + lapCount);
		$("#lap-output-lap p:first-child").text(formatUTCTime(splitTime) + "." + formatMsec(splitTime));
		$("#lap-output-split p:first-child").text(formatUTCTime(lapTime) + "." + formatMsec(lapTime));
*/
	}
}