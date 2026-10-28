/* =========================================
   BIRTHDAY COUNTDOWN
   7 November 2026
========================================= */

const birthdayDate = new Date(
    "2026-11-07T00:00:00"
).getTime();


const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const countdownElement =
    document.getElementById("countdown");

const celebrationElement =
    document.getElementById("birthdayCelebration");

const subtitleElement =
    document.getElementById("subtitle");

const bakingProgressElement =
    document.getElementById("bakingProgress");


/* Baking bar fills up over the last 30 days */

const bakingWindow = 30 * 24 * 60 * 60 * 1000;


/* =========================================
   COUNTDOWN FUNCTION
========================================= */

function updateCountdown() {

    const now = new Date().getTime();

    const difference = birthdayDate - now;


    /* Birthday has arrived */

    if (difference <= 0) {

        clearInterval(countdownTimer);

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        setTimeout(() => {

            celebrationElement.classList.add("show");

            createCelebrationParticles();

        }, 1000);

        return;
    }


    /* Calculate time */

    const days = Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (difference %
            (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (difference %
            (1000 * 60 * 60)) /
        (1000 * 60)
    );


    const seconds = Math.floor(
        (difference %
            (1000 * 60)) /
        1000
    );


    /* Update UI */

    subtitleElement.textContent =
        days === 0
            ? "Less than a day to go... 🎂💕"
            : `Only ${days} ${days === 1 ? "day" : "days"} left... 🎂💕`;

    bakingProgressElement.style.width =
        Math.min(100, Math.max(5, (1 - difference / bakingWindow) * 100)) + "%";

    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}


/* Start immediately */

updateCountdown();


/* Update every second */

const countdownTimer =
    setInterval(updateCountdown, 1000);


/* =========================================
   FLOATING HEARTS & SPARKLES
========================================= */

const floatingContainer =
    document.getElementById("floatingElements");


const symbols = [
    "♡",
    "♥",
    "✦",
    "✧",
    "✨",
    "♡"
];


function createFloatingElement() {

    const element =
        document.createElement("div");

    element.classList.add("floating");


    /* Random symbol */

    const symbol =
        symbols[
            Math.floor(
                Math.random() * symbols.length
            )
        ];


    element.textContent = symbol;


    /* Random position */

    element.style.left =
        Math.random() * 100 + "vw";


    /* Random size */

    const size =
        10 + Math.random() * 18;

    element.style.fontSize =
        size + "px";


    /* Random animation duration */

    const duration =
        7 + Math.random() * 8;

    element.style.animationDuration =
        duration + "s";


    /* Random delay */

    element.style.animationDelay =
        Math.random() * 5 + "s";


    floatingContainer.appendChild(element);


    /* Remove after animation */

    setTimeout(() => {

        element.remove();

    }, (duration + 5) * 1000);
}


/* Create initial elements */

for (let i = 0; i < 25; i++) {

    createFloatingElement();
}


/* Keep creating them */

setInterval(
    createFloatingElement,
    700
);


/* =========================================
   BIRTHDAY CELEBRATION PARTICLES
========================================= */

function createCelebrationParticles() {

    const celebrationSymbols = [
        "🎉",
        "🎊",
        "💕",
        "💖",
        "✨",
        "🎂",
        "🥳",
        "💗"
    ];


    for (let i = 0; i < 80; i++) {

        const particle =
            document.createElement("div");

        particle.classList.add("floating");

        particle.style.position = "fixed";

        particle.style.left =
            Math.random() * 100 + "vw";

        particle.style.top =
            Math.random() * 100 + "vh";

        particle.style.fontSize =
            15 + Math.random() * 25 + "px";

        particle.style.opacity = "1";

        particle.style.animationDuration =
            3 + Math.random() * 4 + "s";

        particle.textContent =
            celebrationSymbols[
                Math.floor(
                    Math.random() *
                    celebrationSymbols.length
                )
            ];

        document.body.appendChild(particle);


        setTimeout(() => {

            particle.remove();

        }, 7000);
    }
}


/* =========================================
   MUSIC
========================================= */

const audio =
    document.getElementById("birthdayAudio");

const musicOverlay =
    document.getElementById("musicOverlay");

const playButton =
    document.getElementById("playBtn");

const skipButton =
    document.getElementById("skipBtn");


/* Play music */

playButton.addEventListener(
    "click",
    async () => {

        try {

            await audio.play();

            musicOverlay.classList.add("hidden");

        } catch (error) {

            console.error(
                "Unable to play audio:",
                error
            );

            alert(
                "Unable to play the music. Please check your browser settings."
            );
        }
    }
);


/* Skip music */

skipButton.addEventListener(
    "click",
    () => {

        musicOverlay.classList.add("hidden");

    }
);