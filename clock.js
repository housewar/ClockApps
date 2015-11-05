var AnalogClock = function() {    
    var timeNow;
    //set the time, if no arg, set it to present
    AnalogClock.prototype.set = function(time) {
        if (time = 'undefined') {
          timeNow = new Date();
        } else {
          timeNow = new Date(time);
        }
        return timeNow;
      }
      //hour hand angle based on hours, minutes, and seconds
    AnalogClock.prototype.now = function(){
    	return timeNow
    }
    AnalogClock.prototype.angleH = function() {
        return (Number(timeNow.getHours()) * 30) +
          (Number(timeNow.getMinutes()) * (360 / 720)) +
          (Number(timeNow.getSeconds()) * (360 / 43200));
      }
      //minute hand angle based on minutes and seconds
    AnalogClock.prototype.angleM = function() {
        return (Number(timeNow.getMinutes()) * 6);
      }
      //second hand angle
    AnalogClock.prototype.angleS = function() {
      return (Number(timeNow.getSeconds()) * 6);
    }
}