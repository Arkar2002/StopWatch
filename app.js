const getModebtn = document.querySelector('.mode-btn');
const getDisplays = document.querySelectorAll('.display');
const getMilli = document.querySelector(".milli");
const getStartbtn = document.querySelector('.start'),
    getPausebtn = document.querySelector('.pause'),
    getResetbtn = document.querySelector('.reset');
const getDplsec = document.getElementById('dlpsecond'),
	getDplmlisec = document.getElementById('dplmillisec');

let idx = 0;

let setIntervalDisplay;

let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];

getDisplays[idx].style.display = "block";

getModebtn.addEventListener("click", () => {
    getDisplays[idx].style.display = "none";
    reloadAgain();

    idx++;

    if (idx > 1) {
        idx = 0;
    }

    getDisplays[idx].style.display = "block";
    getModebtn.innerHTML = `<i class="fas fa-tools"></i> Mode ${idx + 1}`;
})

getStartbtn.onclick = () => {
    clearInterval(setIntervalDisplay);
    setIntervalDisplay= setInterval(displayTime,10);
}

getPausebtn.onclick = () => {
    clearInterval(setIntervalDisplay);
}

getResetbtn.onclick = () => {
    reloadAgain();
}

function reloadAgain() {
    [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
    clearInterval(setIntervalDisplay);

    if (idx === 0) {
        getDisplays[idx].innerHTML = "00 : 00 : 00";
        getMilli.setAttribute("data-test", "000");
    } else {
        getDplmlisec.innerHTML = "0" + milliseconds;
        getDplsec.textContent = "0" + seconds;
    }
}

function displayTime() {

    if (idx === 0) {

        milliseconds += 10;

        if (milliseconds === 1000) {

            seconds++;
            milliseconds = 0;

            if (seconds === 60) {

                minutes++
                seconds = 0;

                if (minutes === 60) {

                    hours++;
                    minutes = 0;

                }
            }
        }

        const hourText = hours.toString().padStart(2, "0");
        const minuteText = minutes.toString().padStart(2, "0");
        const secondText = seconds.toString().padStart(2, "0");
        const milliText = milliseconds.toString().padStart(3, "0");

        getDisplays[idx].innerHTML = `${hourText} : ${minuteText} : ${secondText}`;
        getMilli.setAttribute("data-test",milliText);

    } else {

        milliseconds++;

		if(milliseconds <= 9){
			getDplmlisec.textContent = "0" + milliseconds;
		}

		if(milliseconds > 9){
			getDplmlisec.innerText = milliseconds;
		}

		if(milliseconds > 99){
			milliseconds = 0;
			seconds++;
			getDplsec.textContent = "0" + seconds;
		}

		if(seconds > 9){
			getDplsec.innerText = seconds;
		}

    }
}