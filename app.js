const getmodebtn = document.querySelector('.mode-btn');
const getdisplays = document.querySelectorAll('.display');
const getmilli = document.querySelector(".milli");
const getstartbtn = document.querySelector('.start'),
        getpausebtn = document.querySelector('.pause'),
        getresetbtn = document.querySelector('.reset');
const getdlpsec = document.getElementById('dlpsecond'),
	    getdlpmlsec = document.getElementById('dplmillisec');

let idx = 0;

let setinterdisplay;

let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];

getdisplays[idx].style.display = "block";

getmodebtn.addEventListener("click", () => {
    getdisplays[idx].style.display = "none";
    reloadagain();
    idx++;
    if (idx > 1) {
        idx = 0;
    }
    getdisplays[idx].style.display = "block";
    getmodebtn.innerHTML = `<i class="fas fa-tools"></i> Mode ${idx + 1}`;
})

getstartbtn.onclick = () => {
    clearInterval(setinterdisplay);
    setinterdisplay= setInterval(displaytime,10);
}

getpausebtn.onclick = () => {
    clearInterval(setinterdisplay);
}

getresetbtn.onclick = () => {
    reloadagain();
}

function reloadagain() {
    [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
    clearInterval(setinterdisplay);
    if (idx === 0) {
        getdisplays[idx].innerHTML = "00 : 00 : 00";
        getmilli.setAttribute("data-test","000");
    } else {
        getdlpmlsec.innerHTML = "0" + milliseconds;
        getdlpsec.textContent = "0" + seconds;
    }
}

function displaytime() {

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

        const hourtext = hours.toString().padStart(2, "0");
        const minutetext = minutes.toString().padStart(2, "0");
        const secondtext = seconds.toString().padStart(2, "0");
        const millitext = milliseconds.toString().padStart(3, "0");
        getdisplays[idx].innerHTML = `${hourtext} : ${minutetext} : ${secondtext}`;
        getmilli.setAttribute("data-test",millitext);

    } else {

        milliseconds++;
        if (milliseconds < 9) {
            getdlpmlsec.innerHTML = "0" + milliseconds;
        } else if (milliseconds > 99) {
            seconds++;
            milliseconds = 0;
            getdlpsec.innerHTML = "0" + seconds;
        } else {
            getdlpmlsec.textContent = milliseconds;
        }

    }
}