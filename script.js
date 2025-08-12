// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Accordion toggles for skill groups and generic item-cards
function setupToggles(selector){
  document.querySelectorAll(selector).forEach(el => {
    const btn = el.querySelector('.item-toggle');
    if(!btn) return;
    btn.addEventListener('click', () => {
      el.classList.toggle('active');
      // smooth focus for expanded content
      if(el.classList.contains('active')){
        const panel = el.querySelector('.item-panel');
        panel && panel.scrollIntoView({behavior:'smooth', block:'nearest'});
      }
    });
  });
}

// For multiple container types
setupToggles('.accordion .item');
setupToggles('.items-list .item-card');

// Contact form simple handler (no backend) - simulate send
const contactForm = document.getElementById('contact-form');
if(contactForm){ contactForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = this.name.value || 'there';
  alert('Thanks, ' + name + '! Your message was received (simulated).');
  this.reset();
});}

// Intersection observer for reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('visible'); }
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(s => observer.observe(s));

// Small enhancement: click profile to pulse and highlight resume link
const profile = document.getElementById('profile-img');
if(profile){
  profile.addEventListener('click', () => {
    profile.animate([{transform:'scale(1)'},{transform:'scale(1.08)'},{transform:'scale(1)'}],{duration:420});
  });
}

// Accessibility: allow Enter key to toggle when focused on button-like toggles
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' && document.activeElement.classList.contains('item-toggle')){
    document.activeElement.click();
  }
});



// Create Confetti Burst
function startConfetti() {
  const duration = 2 * 1000; // 2 seconds
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
    }));
  }, 250);
}

// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Simulate sending message
  setTimeout(() => {
    alert("Message Sent Successfully!");
    startConfetti();
    document.getElementById("contactForm").reset();
  }, 500);
});



function triggerConfetti() {
    const confettiContainer = document.getElementById("success-confetti");
    confettiContainer.innerHTML = ""; // Clear old confetti

    for (let i = 0; i < 50; i++) { // Number of confetti pieces
        const confetti = document.createElement("div");
        confetti.classList.add("confetti-piece");

        // Random colors
        const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
        confetti.style.setProperty("--confetti-color", colors[Math.floor(Math.random() * colors.length)]);

        // Random horizontal position
        confetti.style.left = `${Math.random() * 100}%`;

        // Random delay for natural look
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;

        confettiContainer.appendChild(confetti);
    }

    // Remove confetti after animation ends
    setTimeout(() => {
        confettiContainer.innerHTML = "";
    }, 3000);
}

// Call triggerConfetti() after successful form submission
document.querySelector("#contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    // Your form submission logic here...
    // On success:
    triggerConfetti();
});
