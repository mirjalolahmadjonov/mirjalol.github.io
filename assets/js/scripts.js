const menuList = document.getElementById('menuList');

function toggleMenu() {
    menuList.classList.toggle('active');
}

// Get all navbar links
const navbarLinks = document.querySelectorAll('.navbar a');

// Function to highlight the active section in the navbar
function highlightNavbarLink() {
    // Get the vertical scroll position of the window
    const scrollPosition = window.scrollY;

    // Loop through each section on the page
    document.querySelectorAll('section').forEach((section) => {
        // Check if the top of the section is above the current scroll position
        if (scrollPosition >= section.offsetTop - 50 && scrollPosition < section.offsetTop + section.offsetHeight - 50) {
            // Remove the 'active' class from all navbar links
            navbarLinks.forEach((link) => {
                link.classList.remove('active');
            });

            // Get the corresponding navbar link for the current section
            const correspondingLink = document.querySelector(`.navbar a[href="#${section.id}"]`);

            // Add the 'active' class to the corresponding navbar link
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Add event listener for scroll event
window.addEventListener('scroll', highlightNavbarLink);

// Call the function initially to highlight the active section on page load
highlightNavbarLink();


// script.js
document.addEventListener('DOMContentLoaded', function() {
    const phrases = [
        "Web Developer",
        "Mobile Developer",
        "Project Manager",
        "UI/UX Designer",
        "Graphic Designer"
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    const speed = 100; // Speed in milliseconds for typing
    const delayBetweenPhrases = 2000; // Delay before starting next phrase in milliseconds

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
