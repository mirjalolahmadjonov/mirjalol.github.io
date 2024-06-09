//RWD Navbar toggle
const menuList = document.getElementById('menuList');

function toggleMenu() {
	menuList.classList.toggle('active');
}

//Hide when scroll
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

// Highlight the active section
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

// Typewriter

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

// PARICLES

particlesJS("particles-js", {
	"particles": {
		"number": {
			"value": 80,
			"density": {
				"enable": true,
				"value_area": 800
			}
		},
		"color": {
			"value": "#ffffff"
		},
		"shape": {
			"type": "circle",
			"stroke": {
				"width": 0,
				"color": "#000000"
			},
			"polygon": {
				"nb_sides": 5
			}
		},
		"opacity": {
			"value": 0.5,
			"random": true,
			"anim": {
				"enable": true,
				"speed": 1,
				"opacity_min": 0.1,
				"sync": false
			}
		},
		"size": {
			"value": 3,
			"random": true,
			"anim": {
				"enable": false,
				"speed": 40,
				"size_min": 0.1,
				"sync": false
			}
		},
		"line_linked": {
			"enable": true,
			"distance": 150,
			"color": "#ffffff",
			"opacity": 0.4,
			"width": 1
		},
		"move": {
			"enable": true,
			"speed": 6,
			"direction": "none",
			"random": false,
			"straight": false,
			"out_mode": "out",
			"bounce": false,
			"attract": {
				"enable": false,
				"rotateX": 600,
				"rotateY": 1200
			}
		}
	},
	"interactivity": {
		"detect_on": "canvas",
		"events": {
			"onhover": {
				"enable": true,
				"mode": "grab"
			},
			"onclick": {
				"enable": true,
				"mode": "push"
			},
			"resize": true
		},
		"modes": {
			"grab": {
				"distance": 140,
				"line_linked": {
					"opacity": 1
				}
			},
			"bubble": {
				"distance": 400,
				"size": 40,
				"duration": 2,
				"opacity": 8,
				"speed": 3
			},
			"repulse": {
				"distance": 200,
				"duration": 0.4
			},
			"push": {
				"particles_nb": 4
			},
			"remove": {
				"particles_nb": 2
			}
		}
	},
	"retina_detect": true
});

// CANVAS

document.addEventListener("DOMContentLoaded", function () {
	const canvas = document.getElementById('particle-canvas');
	const renderer = new THREE.WebGLRenderer({ canvas });
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	camera.position.z = 5;

	// Particle System
	const particles = new THREE.BufferGeometry();
	const particleCount = 5000; // You can adjust this number for more or fewer particles
	const positions = new Float32Array(particleCount * 3);
	const velocities = new Float32Array(particleCount * 3);

	for (let i = 0; i < particleCount; i++) {
		positions[i * 3] = (Math.random() - 0.5) * 10;
		positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
		positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

		velocities[i * 3] = (Math.random() - 0.5) * 0.005; // Reduced movement range
		velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005; // Reduced movement range
		velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005; // Reduced movement range
	}

	particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

	const particleMaterial = new THREE.PointsMaterial({
		color: 0xffffff,
		size: 0.02 // Smaller particle size
	});

	const particleSystem = new THREE.Points(particles, particleMaterial);
	scene.add(particleSystem);

	// Mouse Interaction
	const mouse = new THREE.Vector2();
	document.addEventListener('mousemove', (event) => {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	});

	function animate(time) {
		const positions = particles.attributes.position.array;
		const velocities = particles.attributes.velocity.array;

		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] += velocities[i * 3];
			positions[i * 3 + 1] += velocities[i * 3 + 1];
			positions[i * 3 + 2] += velocities[i * 3 + 2];

			if (positions[i * 3] > 5 || positions[i * 3] < -5) velocities[i * 3] = -velocities[i * 3];
			if (positions[i * 3 + 1] > 5 || positions[i * 3 + 1] < -5) velocities[i * 3 + 1] = -velocities[i * 3 + 1];
			if (positions[i * 3 + 2] > 5 || positions[i * 3 + 2] < -5) velocities[i * 3 + 2] = -velocities[i * 3 + 2];
		}

		particles.attributes.position.needsUpdate = true;

		camera.position.x += (mouse.x - camera.position.x) * 0.05;
		camera.position.y += (mouse.y - camera.position.y) * 0.05;
		camera.lookAt(scene.position);

		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.render(scene, camera);
		requestAnimationFrame(animate);
	}

	animate(0);

	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	});
});


// SWIPER 
var swiper = new Swiper(".slide-content", {
	slidesPerView: 3,
	spaceBetween: 25,
	loop: true,
	centerSlide: 'true',
	fade: 'true',
	grabCursor: 'true',
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		dynamicBullets: true,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
	0: {
		slidesPerView: 1,
	},
	520: {
		slidesPerView: 2,
	},
	950: {
		slidesPerView: 3,
	},
},
});
