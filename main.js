$(document).ready(function() {

	//this script contains all of the page navigation scripts and calls the functions
	//found in the other scripts.

	var activePage = "#clock"; //sets current active page to the default "clock"
	$(activePage + "-li").addClass("active"); //set the navbar link to active
	$(activePage + "-page").removeClass("no-display"); //display the page

	updateClock(); //starts the clock running on the front page; function in clock.js

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
	
	$("#playPause-btn").click(function(){
		if (playPause){
			playPause = false; //change playPause btn function to pause
			lapReset = true; //change lapReset btn function to lap
			if (swResume){
			myStopwatch.resume(); //resume from pause
			}else{
			myStopwatch.start(); //start from zero
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
			myStopwatch.pause();
			$("#playPause-span").removeClass("glyphicon-pause");
			$("#playPause-span").addClass("glyphicon-play");
			$("#lapReset-span").removeClass("glyphicon-repeat");
			$("#lapReset-span").addClass("glyphicon-refresh");
		}
	});
		
	$("#lapReset-btn").click(function(){
		if (lapReset){
			myStopwatch.lap();
		} else {
			myStopwatch.reset();
			lapReset = true; //change lapReset btn function to lap
			swResume = false; //set play button function to start from zero, not resume
			$("#lapReset-btn").addClass("hidden"); //hide the reset button
		}
	});
});