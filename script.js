/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});


/* =========================
   CLOSE MENU AFTER CLICK
========================= */

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


/* =========================
   ACTIVE NAVBAR LINK
========================= */

window.addEventListener("scroll", () => {

    let sections = document.querySelectorAll("section");
    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


/* =========================
   SMOOTH SCROLL
========================= */

navLinks.forEach(link => {

    link.addEventListener("click", function(e) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});
/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(
    ".about-container, .skill, .project-card, .testimonial-card, .contact-container"
);

const revealOnScroll = () => {

    revealElements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add("show");
        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* =========================
   NAVBAR BACKGROUND ON SCROLL
========================= */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(8, 11, 23, 0.95)";
        header.style.boxShadow = "0 5px 25px rgba(0,0,0,0.3)";

    } else {

        header.style.background = "rgba(10,12,28,.75)";
        header.style.boxShadow = "none";

    }

});


/* =========================
   SKILL BAR ANIMATION
========================= */

const skillBars = document.querySelectorAll(".progress-bar");

const animateSkills = () => {

    skillBars.forEach(bar => {

        const barTop = bar.getBoundingClientRect().top;

        if (barTop < window.innerHeight - 100) {

            const finalWidth = bar.getAttribute("style");

            bar.style.width = "0";

            setTimeout(() => {
                bar.style.width =
                    finalWidth.replace("width:", "")
                              .replace(";", "");
            }, 200);

        }

    });

};

window.addEventListener("scroll", animateSkills);



/* =========================
   CURRENT YEAR
========================= */

const copyright = document.querySelector(".copyright");

if (copyright) {

    const year = new Date().getFullYear();

    copyright.innerHTML =
        `© ${year} Krishna Tiwari. All Rights Reserved.`;

}
/* =========================
   ANIMATED STAT COUNTERS
========================= */

const statNumbers = document.querySelectorAll(".stat-box h3");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const statsSection = document.querySelector(".stats");

    if (!statsSection) return;

    const position = statsSection.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {

        counterStarted = true;

        statNumbers.forEach(number => {

            const text = number.innerText;
            const value = parseInt(text);

            if (isNaN(value)) return;

            const suffix = text.includes("%")
                ? "%"
                : text.includes("+")
                ? "+"
                : "";

            let current = 0;

            const increment = Math.max(
                1,
                Math.ceil(value / 50)
            );

            const counter = setInterval(() => {

                current += increment;

                if (current >= value) {

                    current = value;

                    clearInterval(counter);

                }

                number.innerText = current + suffix;

            }, 30);

        });

    }

}

window.addEventListener("scroll", startCounters);

startCounters();


/* =========================
   TYPING EFFECT
========================= */

const heroTitle = document.querySelector(".hero-left h3");

const typingText = "Creative And Problem-Solver";

if (heroTitle) {

    heroTitle.innerText = "";

    let textIndex = 0;

    function typeText() {

        if (textIndex < typingText.length) {

            heroTitle.innerText +=
                typingText.charAt(textIndex);

            textIndex++;

            setTimeout(typeText, 80);

        }

    }

    typeText();

}


/* =========================
   PROJECT CARD EFFECT
========================= */

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0) scale(1)";

    });

});


/* =========================
   CV BUTTON
========================= */

const cvButtons =
    document.querySelectorAll(".btn-outline");

cvButtons.forEach(button => {

    button.addEventListener("click", (event) => {

        event.preventDefault();

        alert(
            "Your CV will be available here. Add your CV PDF link to this button."
        );

    });

});


/* =========================
   BACK TO TOP
========================= */

const backToTop = document.createElement("button");

backToTop.innerHTML =
    '<i class="fa-solid fa-arrow-up"></i>';

backToTop.className = "back-to-top";

document.body.appendChild(backToTop);

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

});
// ================= EMAILJS CONTACT FORM =================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.send(
            "service_s27zggc",
            "template_lwb0ood",
            {
                from_name: this.querySelector('input[type="text"]').value,
                from_email: this.querySelector('input[type="email"]').value,
                subject: this.querySelectorAll('input[type="text"]')[1].value,
                message: this.querySelector("textarea").value
            },
            "fsHfzqPDhSlitTKBB"
        )
        .then(function () {
            alert("✅ Your message has been sent successfully! I will contact you soon.");
            contactForm.reset();
        })
        .catch(function (error) {
            console.error(error);
            alert("❌ Message failed to send. Please try again.");
        });

    });

}