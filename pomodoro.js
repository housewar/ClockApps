function Pomodoro(){
	this.workMin = 0;
	this.breakMin = 0;
	this.fullTime = 0;
	var pomoEnd;
	this.pomoLeft;
	var pomoNow = new Date();

	Pomodoro.prototype.setWork = function(value){
	this.workMin = value;
	}
	
	Pomodoro.prototype.setBreak = function(value){
	this.breakMin = value;
	}
	
	Pomodoro.prototype.workChg = function(value){
		if (this.workMin + value <= 45 && this.workMin + value >= 0){
			this.workMin += value;
		}
	}
	
	Pomodoro.prototype.breakChg = function(value){
		if (this.breakMin + value <= 15 && this.breakMin + value >= 0){
			this.breakMin += value;
		}
	}
	
	Pomodoro.prototype.timeLeft = function(){
		pomoNow = new Date();
		this.pomoLeft = new Date(Number(pomoEnd) - Number(pomoNow));
		pomoDisplay = new Date(Math.abs(Math.ceil(this.pomoLeft / 1000) * 1000));
		return pomoDisplay;
	}
	
	Pomodoro.prototype.negChk = function(){
		if (Number(this.pomoLeft) <= -1000) {
		return "-"
		} else {
		return ""
		}
	}
	
	Pomodoro.prototype.workStart = function(){
		pomoNow = new Date()
		pomoEnd = new Date(pomoNow);
		pomoEnd.setHours(	pomoEnd.getHours(),
							pomoEnd.getMinutes() + this.workMin,
							pomoEnd.getSeconds());
		this.fullTime = new Date(Number(pomoEnd) - Number(pomoNow));
	}
	Pomodoro.prototype.breakStart = function(){
		pomoNow = new Date()
		pomoEnd = new Date();
		pomoEnd.setHours(	pomoEnd.getHours(),
							pomoEnd.getMinutes() + this.breakMin,
							pomoEnd.getSeconds());
		this.fullTime = new Date(Number(pomoEnd) - Number(pomoNow));
	}
}