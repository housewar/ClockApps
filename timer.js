function Timer(value){
	var timerArr = [0,0,0,0,0,0];
	var timerDisplay;
	var timerNow;
	var timerEnd;
	var timerLeft;
	Timer.prototype.addDigit = function(value){
		timerArr.push(value);
		timerArr = timerArr.slice(-6);
		this.display(timerArr);
	}
	Timer.prototype.backspace = function(){
		timerArr.unshift(0);
		timerArr = timerArr.slice(0,6);
		this.display(timerArr);
	}
	Timer.prototype.display = function(arr){
		$("#timerH").text(arr.slice(0,2).join(""));
		$("#timerM").text(arr.slice(2,4).join(""));
		$("#timerS").text(arr.slice(4,6).join(""));
	}
	Timer.prototype.refresh = function() {
		timerNow = new Date();
		timerLeft = new Date(Number(timerEnd) - Number(timerNow));
		$("#timerH").text(("00" + timerLeft.getUTCHours()).slice(-2));
		$("#timerM").text(("00" + timerLeft.getMinutes()).slice(-2));
		$("#timerS").text(("00" + timerLeft.getSeconds()).slice(-2));
		rafTimer = requestAnimationFrame(this.refresh.bind(this));
	}
		Timer.prototype.resume = function() {
		timerNow = new Date();
		timerEnd = new Date(Number(timerNow) + Number(timerLeft));
		this.refresh();
	}
	Timer.prototype.start = function() {
		timerArr = [Number(timerArr.slice(0,2).join("")),
					Number(timerArr.slice(2,4).join("")),
					Number(timerArr.slice(4,6).join(""))]
		timerEnd = new Date();
		timerEnd.setHours(	timerEnd.getHours() + timerArr[0],
							timerEnd.getMinutes() + timerArr[1],
							timerEnd.getSeconds() + timerArr[2])
		this.refresh();
	}
	Timer.prototype.pause = function() {
		cancelAnimationFrame(rafTimer);
		timerNow = new Date();
		timerLeft = new Date(timerEnd - timerNow);
		$("#timerH").text(("00" + timerLeft.getUTCHours()).slice(-2));
		$("#timerM").text(("00" + timerLeft.getMinutes()).slice(-2));
		$("#timerS").text(("00" + timerLeft.getSeconds()).slice(-2));
	}
	Timer.prototype.reset = function(){
		timerArr = [0,0,0,0,0,0];
		this.display(timerArr);
	}
}