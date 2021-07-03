new WOW().init();
$('.rvs-container').rvslider();
//call paginate
$('#pag').paginate();
// Start pagination setting
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

// End pagination setting
//Start Nice Scroll
/*$("body").niceScroll({
    cursorcolor:"#0d2137",
    cursorwidth:"10px"
  });
*/
// Start Video Section
document.addEventListener("keyup", function(e) {
    if (e.key == " ") {
        toggle();
    } else if (e.key == "ArrowRight") {
        myVideo.currentTime += 2;
    } else if (e.key == "ArrowLeft") {
        myVideo.currentTime -= 2;
    }
});
//Button Scroll 
scroll = $(".fa-arrow-circle-up");
scroll.click(function() {
    $("html,body").animate({ scrollTop: 0 }, 2000);
});

let videoId = 1;


let container = document.getElementById("container");
let myVideo = document.getElementById("myvideo");
let progressValue = document.getElementById("progressValue");
let progressBackground = document.getElementById("progressBackground");
let overlay = document.getElementById("overlay");
let videoSpeed = document.getElementById("videoSpeed");
let subtitleDiv = document.getElementById("subtitle");
let speedContainer = document.getElementById("speedContainer");
let volumeOff = document.getElementById("volumeOff");
let volumeOn = document.getElementById("volumeOn");
progressBackground.addEventListener("click", function(e) {
    let maxWidth = progressBackground.clientWidth;
    let barValue = e.offsetX;
    let barValuePercent = barValue / maxWidth;
    let currentTime = myVideo.duration * barValuePercent;
    myVideo.currentTime = currentTime;
})

function getProgressBarWidth() {
    return new Promise(function(resolve, reject) {

        let t = setInterval(function() {
            if (progressBackground.clientWidth > 0) {
                clearInterval(t);
                resolve(progressBackground.clientWidth);
            }
        }, 10);
    });
}



myVideo.addEventListener("loadedmetadata", async function(e) {
    console.log(myVideo.duration);

    if (localStorage["video" + videoId]) {
        myVideo.currentTime = Number(localStorage["video" + videoId]);

        let maxWidth = await getProgressBarWidth();

        console.log(maxWidth, (myVideo.currentTime / myVideo.duration) * maxWidth)
        progressValue.style.width = (myVideo.currentTime / myVideo.duration) * maxWidth;

    }

})

let subtitlesArray = [{
    fromTime: 1,
    toTime: 2,
    text: "Welcome how are you"
}, {
    fromTime: 2,
    toTime: 5,
    text: "I'm good thanks what about you"
}, {
    fromTime: 5,
    toTime: 9,
    text: "I'm well too"
}, {
    fromTime: 9,
    toTime: 12,
    text: "bye bye"
}]

myVideo.addEventListener("timeupdate", function(e) {
    localStorage["video" + videoId] = myVideo.currentTime;

    let subtitles = subtitlesArray.filter((item) =>
        myVideo.currentTime >= item.fromTime &&
        myVideo.currentTime <= item.toTime
    );
    if (subtitles.length > 0) {
        let subtitle = subtitles[0];
        subtitleDiv.innerHTML = subtitle.text;
    }
    let maxWidth = progressBackground.clientWidth;
    progressValue.style.width = (myVideo.currentTime / myVideo.duration) * maxWidth;
})


function toggle() {
    if (myVideo.paused) {
        play();
    } else {
        pause();
    }
}

function play() {
    myVideo.play();
    overlay.style.display = "none";
}

function stop() {
    pause();
    myVideo.currentTime = "0";
}

function mute() {
    if (myVideo.muted == true) {
        myVideo.muted = false;
        volumeOn.style.display = "inline";
        volumeOff.style.display = "none";
    } else {
        myVideo.muted = true;
        volumeOn.style.display = "none";
        volumeOff.style.display = "inline";
    }

}

function pause() {
    myVideo.pause();
    overlay.style.display = "block";
}

function moveForward() {
    myVideo.currentTime += 1;
}

function moveBackward() {
    myVideo.currentTime -= 1;
}

function videoSpeedChanged() {
    myVideo.playbackRate = Number(videoSpeed.value);
}

function fullScreen() {
    // myVideo.webkitRequestFullScreen();
    let fullscreen = myVideo.webkitRequestFullscreen || myVideo.mozRequestFullScreen || myVideo.msRequestFullscreen;
    fullscreen.call(myVideo);
}

function showControls() {
    controls.style.display = "block";
}

function hideControls() {
    controls.style.display = "none";
}

function showSpeed() {
    speedContainer.classList.toggle("show");
}

function smallScreen() {
    container.classList.toggle("screen");
}


console.log({ myVideo });

// End Video Section