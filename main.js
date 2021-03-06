$(document).ready(function() {

	//this script contains all of the page navigation scripts and calls the functions
	//found in the other scripts.

	var activePage = "#clock"; //sets current active page to the default "clock"
	$(activePage + "-li").addClass("active"); //set the navbar link to active
	$(activePage + "-page").removeClass("no-display"); //display the page
	$("#digitalClock").removeClass("no-display"); //display the digital clock
	
	var myClock = new AnalogClock();
  $("#clockDigital-btn").click(function(){
  	$("#analogClock").addClass("no-display");
  	$("#digitalClock").removeClass("no-display");
  	});
  $("#clockAnalog-btn").click(function(){
  	$("#digitalClock").addClass("no-display");
  	$("#analogClock").removeClass("no-display");
  	});
  
  var lastM = null;
  var lastS = null;

  //update time and display on the clock page	
  function updateClock() {
    
    //set the clock to now
    myClock.set();
    
    $("#clock").text(formatClock(myClock.now()));
    $("#clockMS").text(formatClockAMPM(myClock.now()));
    
    //set the hour hand
    $(".hours").css('transform', 'rotateZ(' + myClock.angleH() + 'deg)');
    
    //if the minute hasn't changed, don't change the minute hand position
    if (lastM != Number(myClock.now().getMinutes())) {
      $(".minutes").css('transform', 'rotateZ(' + myClock.angleM() + 'deg)');
      lastM = Number(myClock.now().getMinutes());
      if (lastM === 59) {
        setTimeout(function() {
        	$("#minuteHand").removeClass('m-transition');
        	$(".minutes").css('transform', 'rotateZ(' + (Number(myClock.angleM()) - 360) + 'deg)');
        	setTimeout(function() {
        		$("#minuteHand").addClass('m-transition');
        	}, 100);        
        }, 500);
      }
    }
    
    //if the second hasn't changed, don't change the second hand position
    if (lastS != Number(myClock.now().getSeconds())) {
      $(".seconds").css('transform', 'rotateZ(' + myClock.angleS() + 'deg)');
      lastS = Number(myClock.now().getSeconds());
      if (lastS === 59) {
        setTimeout(function() {
        	$("#secondHand").removeClass('s-transition');
        	$(".seconds").css('transform', 'rotateZ(' + (Number(myClock.angleS()) - 360) + 'deg)');
        	setTimeout(function(){
				$("#secondHand").addClass('s-transition');
			}, 100);
        }, 500);
      }
    }
    //loop
    rafClock = requestAnimationFrame(updateClock);
  }
  myClock.set();
  $(".minutes").css('transform', 'rotateZ(' + myClock.angleM() + 'deg)');
  $(".seconds").css('transform', 'rotateZ(' + myClock.angleS() + 'deg)');
  lastM = Number(myClock.now().getMinutes());
  lastS = Number(myClock.now().getSeconds());
  updateClock();

//remove the "active" class from the old nav item and add it to the new one
//add "no-display" class to the old page, and remove it from the new.
    function switchActive(newActive){
		$(activePage + "-li").removeClass("active");
		$(activePage + "-page").addClass("no-display");
		activePage = newActive;
		$(activePage + "-li").addClass("active");
		$(activePage + "-page").removeClass("no-display");
		if (activePage === "#clock"){
			updateClock(); //start the clock again if the current page is "clock"
		} else {
			cancelAnimationFrame(rafClock); //stop the clock when not active to save the CPU
		}
	};
	
	//the nav link buttons each have an attribute called "data-page" with the prefix
	//for the active page (#clock, #timer, #stopwatch, etc). This attribute is passed
	//through to the switchActive function so it knows which nav bar to set as active,
	//and which page to hide/unhide
	$("#nav-links").delegate('a','click',function(){
		switchActive($(this).attr('data-page'));
	});
	
	//This next section is for the stopwatch page.
	
	//Two buttons are used for five functions: start, lap, pause, resume, reset.
	//These booleans are used to control which function is being called.
	var playPause = true; //sets playPause-btn function to start
	var lapReset = true; //sets lapReset-btn function to lap
	var myStopwatch = new Stopwatch(); //object constructor in stopwatch.js
	var swResume = false; //Sets the play button to start from zero, not resume.
	
	function updateStopwatch(raf) {
		$("#stopwatch").text(formatUTCTime(myStopwatch.elapsed()));
		$("#stopwatchMS").text(formatMsec(myStopwatch.elapsed()));
		if (myStopwatch.lapCount > 0){
			$("#sw-progress").css('transform','rotate(' + ( 360 * myStopwatch.elapsedLap() / myStopwatch.lastLapTime ) + 'deg)');
		}
		if (raf){
		rafStopwatch = requestAnimationFrame(updateStopwatch);
		}
	}
	
	function swAddLap(){
		$("#lap-output-count").prepend("<p class=\"lap-entry\"></p>");
		$("#lap-output-lap").prepend("<p class=\"lap-entry\"></p>");
		$("#lap-output-split").prepend("<p class=\"lap-entry\"></p>");
		$("#lap-output-count p:first-child").text("#" + myStopwatch.lapCount);
		$("#lap-output-lap p:first-child").text(formatUTCTime(myStopwatch.splitTime) + "." + formatMsec(myStopwatch.splitTime));
		$("#lap-output-split p:first-child").text(formatUTCTime(myStopwatch.lapTime) + "." + formatMsec(myStopwatch.lapTime));
	}
	
	function swReset(){
		$("#stopwatch").text("00:00:00");
		$("#stopwatchMS").text("00");
		$(".lap-entry").remove();
		$("#sw-progress").css('transform','rotate(0deg)');
	}
	
	$("#playPause-btn").click(function(){
		if (playPause){
			playPause = false; //change playPause btn function to pause
			lapReset = true; //change lapReset btn function to lap
			if (swResume){
			myStopwatch.resume(); //resume from pause
			updateStopwatch(true);
			}else{
			myStopwatch.start(); //start from zero
			updateStopwatch(true);
			}
			$("#playPause-span").removeClass("glyphicon-play");
			$("#playPause-span").addClass("glyphicon-pause");
			$("#lapReset-span").removeClass("glyphicon-refresh");
			$("#lapReset-span").addClass("glyphicon-repeat");
			$("#lapReset-btn").removeClass("hidden");
		} else {
			swResume = true; //pressing play will resume, not start
			playPause = true; //change playPause btn function to play
			lapReset = false; //change lapReset btn function to reset
			cancelAnimationFrame(rafStopwatch);
			myStopwatch.pause();
			updateStopwatch(false);
			$("#playPause-span").removeClass("glyphicon-pause");
			$("#playPause-span").addClass("glyphicon-play");
			$("#lapReset-span").removeClass("glyphicon-repeat");
			$("#lapReset-span").addClass("glyphicon-refresh");
		}
	});
		
	$("#lapReset-btn").click(function(){
		if (lapReset){
			myStopwatch.lap();
			swAddLap();
		} else {
			swReset();
			//myStopwatch.reset();
			lapReset = true; //change lapReset btn function to lap
			swResume = false; //set play button function to start from zero, not resume
			$("#lapReset-btn").addClass("hidden"); //hide the reset button
		}
	});
	
	//This next section is for the timer page.
	
	myTimer = new Timer();
	var timerPlayPause = true; //initialize as play;
	var timerResume = false; //play, not resume;
	var timerBackReset = true; //backspace, not reset;
	
	//each of the numbers has an associated value,
	//which is passed through to addDigit
	$("#timer-numpad").delegate('button','click',function(){
		myTimer.addDigit($(this).attr('value'));
	});
	$("#timerBackspace-btn").click(function(){
		if (timerBackReset) {
			myTimer.backspace();
		} else {
			$("#timer-numpad").removeClass("no-display");
			$("#timerBackspace-span").removeClass("glyphicon-refresh");
			$("#timerBackspace-span").addClass("glyphicon-chevron-left");
			myTimer.reset();
			timerResume = false;
		}		
	});
	$("#timerPlayPause-btn").click(function(){
		if (timerPlayPause) {
			$("#timerBackspace-btn").addClass("hidden");
			$("#timer-numpad").addClass("no-display");
			if (timerResume) {
				myTimer.resume();
			} else {
				myTimer.start();
				timerBackReset = false;
			}
			
			$("#timerPlayPause-span").removeClass("glyphicon-play");
			$("#timerPlayPause-span").addClass("glyphicon-pause");
			
			timerPlayPause = false;
			
		} else {
			$("#timerBackspace-span").removeClass("glyphicon-chevron-left");
			$("#timerBackspace-span").addClass("glyphicon-refresh");
			$("#timerBackspace-btn").removeClass("hidden");
			myTimer.pause();
			timerResume = true;
			$("#timerPlayPause-span").removeClass("glyphicon-pause");
			$("#timerPlayPause-span").addClass("glyphicon-play");
			timerPlayPause = true;
		}
	});
	
	//This next section is for the pomodoro page.
	myPomodoro = new Pomodoro();
	myPomodoro.setWork(25);
	myPomodoro.setBreak(5);
	var workBreak = true; //true = work, false = break
	
	function updatePomo(){
		$("#pomodoroM").text(myPomodoro.negChk() + ("00" + myPomodoro.timeLeftDisplay().getUTCMinutes()).slice(-2));
		$("#pomodoroS").text(("00" + myPomodoro.timeLeftDisplay().getUTCSeconds()).slice(-2));
    	$(".pomo-fill").css('background', 'linear-gradient(#fff, #fff '
    						+ Math.floor(1000 * Math.max(Number(myPomodoro.timeLeft()),0) / Number(myPomodoro.fullTime)) / 10 + '%,#08f '
    						+ Math.floor(1000 * Math.max(Number(myPomodoro.timeLeft()),0) / Number(myPomodoro.fullTime)) / 10 + '%,#08f 100%)');
		rafPomo = requestAnimationFrame(updatePomo);
	}
	
	$("#pomodoroWork").text(myPomodoro.workMin);
	$("#pomodoroBreak").text(myPomodoro.breakMin);
	
	$("#pomoWorkSub").click(function(){
		myPomodoro.workChg(-1);
		$("#pomodoroWork").text(myPomodoro.workMin);
	});
	
	$("#pomoWorkAdd").click(function(){
		myPomodoro.workChg(1);
		$("#pomodoroWork").text(myPomodoro.workMin);
	});
	
	$("#pomoBreakSub").click(function(){
		myPomodoro.breakChg(-1);
		$("#pomodoroBreak").text(myPomodoro.breakMin);
	});
	
	$("#pomoBreakAdd").click(function(){
		myPomodoro.breakChg(1);
		$("#pomodoroBreak").text(myPomodoro.breakMin);
	});
	
	$("#punchInOut").click(function(){
		if (workBreak) {
			myPomodoro.workStart();
			workBreak = false;
			$("#pomo-type").text("WORK");
			updatePomo();
		} else {
			myPomodoro.breakStart();
			workBreak = true;
			$("#pomo-type").text("BREAK");
		}
	});
});