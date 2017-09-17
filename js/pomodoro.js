$(document).ready(function() {
	
	var isPasued = false;
	function toggleButton(name, status){
		document.getElementById(name).disabled = status;
	}

	var sound = document.getElementById("audio");
	
	toggleButton("pause",true);
	toggleButton("resume",true);

	document.getElementById('pause').onclick = function () {
		isPasued = true;
		toggleButton("resume",false);
		toggleButton("pause",true);
	}
	
	document.getElementById('resume').onclick = function () {
		isPasued = false;
		toggleButton("resume",true);
		toggleButton("pause", false);
	}
	
	 document.getElementById('start').onclick = function () {
		var pomodoroLong = document.getElementById("long").innerHTML;
		document.getElementById("hint").innerHTML = "Work Time!";
		var countdown = pomodoroLong * 60;
		var step = 100 / countdown;
		var temp = step;
		var sec = document.getElementById("sec").innerHTML;
		document.getElementById("sec").style.display = "inline";
		document.getElementById("two-points").style.display = "inline"
		if (typeof bar1 == "undefined") {
			bar1 = new ldBar("#shape");
		}
		var t = window.setInterval(function timer(){
			if (countdown >0 && isPasued === false) {
				countdown--;
				bar1.set(temp);
				temp += step;
				if (sec >= 11) {
					sec--;
					document.getElementById("sec").innerHTML = sec;
				} else if (sec < 11 && sec > 0) {
					sec--;
					sec = "0" + sec;
					document.getElementById("sec").innerHTML = sec;
				} else if (sec == 0 ) {
					sec = 59;
					document.getElementById("sec").innerHTML = sec;
					pomodoroLong--;
					document.getElementById("long").innerHTML = pomodoroLong;
				}
			}
			else if(countdown === 0 && isPasued === false) {
				sound.play();
				toggleButton("pause",true);
				breaktime();
				clearInterval(t);
			}
		}, 1000);
		pomodoroLong--;
		document.getElementById("long").innerHTML = pomodoroLong;
		toggleButton("start",true);
		toggleButton("pause",false);
		toggleButton("pomodoro-plus",true);
		toggleButton("pomodoro-minus",true);
		toggleButton("break-plus",true);
		toggleButton("break-minus",true);
		document.getElementById("pomodoro-plus").style.display = "none";
		document.getElementById("pomodoro-minus").style.display = "none";
		document.getElementById("break-plus").style.display = "none";
		document.getElementById("break-minus").style.display = "none";
	}

	function breaktime() {
		document.getElementById("hint").innerHTML = "Leisure time!";
		var breakLong = Number(document.getElementById("break-long").innerHTML);
		var countdownbreak = breakLong * 60;
		var step = 100 / countdownbreak;
		var temp = step;
		var breaksec = document.getElementById("break-sec").innerHTML;
		document.getElementById("break-sec").style.display = "inline";
		document.getElementById("break-two-points").style.display = "inline"
		document.getElementById("break-long").innerHTML = breakLong -1;
		var b = window.setInterval(function timer(){
			if (countdownbreak >0 && isPasued === false) {
				countdownbreak--;
				bar1.set(temp);
				temp += step;
				if (breaksec >= 11) {
					breaksec--;
					document.getElementById("break-sec").innerHTML = breaksec;
				} else if (breaksec < 11 && breaksec > 0) {
					breaksec--;
					breaksec = "0" + breaksec;
					document.getElementById("break-sec").innerHTML = breaksec;
				} else if (breaksec == 0 ) {
					breaksec = 59;
					document.getElementById("break-sec").innerHTML = breaksec;
					breakLong = Number(document.getElementById("break-long").innerHTML);
					document.getElementById("break-long").innerHTML = breakLong -1;
				}
			} else if(countdownbreak === 0) {
				sound.play();
				toggleButton("start",false);
				toggleButton("pause",true);
				toggleButton("pomodoro-plus",false);
				toggleButton("pomodoro-minus",false);
				toggleButton("break-plus",false);
				toggleButton("break-minus",false);
				document.getElementById("long").innerHTML = "25";
				document.getElementById("sec").innerHTML = "60";
				document.getElementById("break-long").innerHTML = "5";
				document.getElementById("break-sec").innerHTML = "60";
				document.getElementById("sec").style.display = "none";
				document.getElementById("two-points").style.display = "none";
				document.getElementById("break-sec").style.display = "none";
				document.getElementById("break-two-points").style.display = "none";
				document.getElementById("pomodoro-plus").style.display = "inline";
				document.getElementById("pomodoro-minus").style.display = "inline";
				document.getElementById("break-plus").style.display = "inline";
				document.getElementById("break-minus").style.display = "inline";
				document.getElementById("hint").innerHTML = "Have a fun!"
				clearInterval(b);
			}
		}, 1000);

	}

	document.getElementById("pomodoro-plus").onclick = function() {
		let currentValue = Number(document.getElementById("long").innerHTML);
		 currentValue++;
		 document.getElementById("long").innerHTML = currentValue;
	}
	
	document.getElementById("pomodoro-minus").onclick = function() {
		let currentValue = Number(document.getElementById("long").innerHTML);
		 if (currentValue > 1) {
			currentValue--;
			document.getElementById("long").innerHTML = currentValue;
		 }
	}

	document.getElementById("break-plus").onclick = function() {
		let currentValue = Number(document.getElementById("break-long").innerHTML);
		 currentValue++;
		 document.getElementById("break-long").innerHTML = currentValue;
	}
	
	document.getElementById("break-minus").onclick = function() {
		let currentValue = Number(document.getElementById("break-long").innerHTML);
		 if (currentValue > 1) {
			currentValue--;
			document.getElementById("break-long").innerHTML = currentValue;
		 }
	}

})
