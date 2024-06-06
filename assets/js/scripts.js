const menuList = document.getElementById('menuList');

function toggleMenu() {
    menuList.classList.toggle('active');
}


let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');

    if (window.scrollY > lastScrollY) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }

    lastScrollY = window.scrollY;
});


const navbarLinks = document.querySelectorAll('.navbar a');

// Function to highlight the active section in the navbar
function highlightNavbarLink() {
    const scrollPosition = window.scrollY;
    document.querySelectorAll('section').forEach((section) => {
        if (scrollPosition >= section.offsetTop - 50 && scrollPosition < section.offsetTop + section.offsetHeight - 50) {
            navbarLinks.forEach((link) => {
                link.classList.remove('active');
            });

            const correspondingLink = document.querySelector(`.navbar a[href="#${section.id}"]`);

            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}
window.addEventListener('scroll', highlightNavbarLink);

highlightNavbarLink();


document.addEventListener('DOMContentLoaded', function () {
    const phrases = [
        "Web Developer",
        "Mobile Developer",
        "Project Manager",
        "UI/UX Designer",
        "Graphic Designer"
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    const speed = 100;
    const delayBetweenPhrases = 2000;

    function typeWriter() {
        if (currentCharIndex < phrases[currentPhraseIndex].length) {
            document.getElementById("typewriter").innerHTML += phrases[currentPhraseIndex].charAt(currentCharIndex);
            currentCharIndex++;
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(deleteWriter, delayBetweenPhrases);
        }
    }

    function deleteWriter() {
        if (currentCharIndex > 0) {
            document.getElementById("typewriter").innerHTML = phrases[currentPhraseIndex].substring(0, currentCharIndex - 1);
            currentCharIndex--;
            setTimeout(deleteWriter, speed);
        } else {
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
});
