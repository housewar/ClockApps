function Timer(){
	var timerArr = [0,0,0,0,0];
	var timerDisplay;
	var timerNow;
	var timerEnd;
	var timerLeft;
	
	Timer.prototype.addDigit = function(value){
		timerArr.push(value);
		timerArr = timerArr.slice(-5);
		this.display(timerArr);
	}
	Timer.prototype.backspace = function(){
		timerArr.unshift(0);
		timerArr = timerArr.slice(0,5);
		this.display(timerArr);
	}
	Timer.prototype.display = function(arr){
		$("#timerH").text(arr.slice(0,1).join(""));
		$("#timerM").text(arr.slice(1,3).join(""));
		$("#timerS").text(arr.slice(3,5).join(""));
	}
	Timer.prototype.refresh = function() {
		timerNow = new Date();
		timerLeft = new Date(Number(timerEnd) - Number(timerNow));
		timerDisplay = new Date(Math.abs(Math.ceil(timerLeft / 1000) * 1000));
		if (Number(timerEnd) < (Number(timerNow) - 1000)){
			$("#timerH").text("-" + timerDisplay.getUTCHours());
			$("#timerM").text(("00" + timerDisplay.getMinutes()).slice(-2));
			$("#timerS").text(("00" + timerDisplay.getSeconds()).slice(-2));
		} else {
			$("#timerH").text(timerDisplay.getUTCHours());
			$("#timerM").text(("00" + timerDisplay.getMinutes()).slice(-2));
			$("#timerS").text(("00" + timerDisplay.getSeconds()).slice(-2));
		}
		rafTimer = requestAnimationFrame(this.refresh.bind(this));
	}
		Timer.prototype.resume = function() {
		timerNow = new Date();
		timerEnd = new Date(Number(timerNow) + Number(timerLeft));
		this.refresh();
	}
	Timer.prototype.start = function() {
		timerArr = [Number(timerArr.slice(0,1).join("")),
					Number(timerArr.slice(1,3).join("")),
					Number(timerArr.slice(3,5).join(""))]
		timerEnd = new Date();
		timerEnd.setHours(	timerEnd.getHours() + timerArr[0],
							timerEnd.getMinutes() + timerArr[1],
							timerEnd.getSeconds() + timerArr[2])
		this.refresh();
	}
	Timer.prototype.pause = function() {
		cancelAnimationFrame(rafTimer);
		timerNow = new Date();
		timerLeft = new Date(Number(timerEnd) - Number(timerNow));
	}
	Timer.prototype.reset = function(){
		timerArr = [0,0,0,0,0];
		this.display(timerArr);
	}
}