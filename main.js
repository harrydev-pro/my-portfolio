const menuBar = document.getElementById("hamburger");
const slideEl = document.getElementById("slidedown");
const closeEl = document.getElementById("xmark");
const offEl = document.getElementById("toggle-off");
const onEl = document.getElementById("toggle-on");
const progressBars = document.querySelectorAll(".progress");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");
const messageEl = document.getElementById("message");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sendEL = document.getElementById("sendBtn");
const statusEl = document.getElementById('form-status');
const form = document.getElementById('contact-form');
phoneEl.addEventListener('input', () => {
  phoneEl.value = phoneEl.value.replace(/[^+\d]/g, ''); // block letters, spaces, ()
});

// 2. Validate on submit: 8 to 15 digits, + optional
const internationalPhonePattern = /^\+?\d{8,15}$/;

//for validation

sendEL.addEventListener('click',async function(event) {
event.preventDefault()

let isValid = true;

if(nameEl.value.trim() === ''){
  document.getElementById('name-error').style.display = "block";
  isValid = false;
}
else{ 
  document.getElementById('name-error').style.display = "none";
}

const rawPhone = phoneEl.value.trim();
  const phoneDigitsOnly = rawPhone.replace(/\D/g, ''); // remove + for length check


  if (rawPhone === '') {
    document.getElementById('phone-error').textContent = "Phone number is required";
    document.getElementById('phone-error').style.display = "block";
    isValid = false;
  } else if (!internationalPhonePattern.test(rawPhone)) {
    document.getElementById('phone-error').textContent = "Enter 8-15 digits. Use + for country code. Ex: +2348031234567";
    document.getElementById('phone-error').style.display = "block";
    isValid = false;
  }
  else{
     document.getElementById('phone-error').style.display = "none";
  }



if (!emailPattern.test(emailEl.value) || emailEl.value.trim()  === '') {
 document.getElementById('mail-error').style.display = "block";
 isValid = false;

}
else{
  document.getElementById('mail-error').style.display = "none";
}

if(messageEl.value.trim() === ''){
  document.getElementById('text-error').style.display = "block";
  isValid = false;
}
else{
   document.getElementById('text-error').style.display = "none";
}

if(!isValid) return;
 

document.getElementById('replyto').value = emailEl.value;
  statusEl.textContent = "Sending...";
  statusEl.style.color = "green";

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      statusEl.textContent = "✅ Message sent!";
      statusEl.style.color = "green";
      form.reset(); // 5. THIS clears all inputs
    } else {
      statusEl.textContent = "❌ Something went wrong. Try again.";
      statusEl.style.color = "red";
    }
  } catch {
    statusEl.textContent = "❌ Network error. Check your connection.";
    statusEl.style.color = "red";
  }
}
);

// for  progress bar
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("animated")
      ) {
        entry.target.classList.add("animated");

        // stagger each bar by 120ms
        setTimeout(() => {
          entry.target.style.width = entry.target.dataset.width;
        }, i * 120);
      }
    });
  },
  {
    threshold: 0.3, // trigger when 30% of bar is visible. Lower = triggers earlier
  },
);

progressBars.forEach((bar) => observer.observe(bar));

// for text typing animation
const words = [
  "frontend developer",
  
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.getElementById("typing");

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typedText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 50 : 120; // delete faster

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 2000; // pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length; // next word
    speed = 500; // pause before typing
  }

  setTimeout(type, speed);
}

// Start animation
type();

// for dark mode and light mode
const saveMode = localStorage.getItem("theme");
if (saveMode === "dark") {
  document.body.classList.add("dark");
  onEl.style.display = "none";
  offEl.style.display = "block";
} else {
  document.body.classList.remove("dark");
  onEl.style.display = "block";
  offEl.style.display = "none";
}

onEl.addEventListener("click", () => {
  onEl.style.display = "none";
  offEl.style.display = "block";
  document.body.classList.add("dark");
  localStorage.setItem("theme", "dark");
});
offEl.addEventListener("click", () => {
  onEl.style.display = "block";
  offEl.style.display = "none";
  document.body.classList.remove("dark");
  localStorage.setItem("theme", "light");
});

// for dropdown
menuBar.addEventListener("click", () => {
  slideEl.classList.toggle("active");
  closeEl.style.display = "block";
  menuBar.style.display = "none";
});
closeEl.addEventListener("click", () => {
  slideEl.classList.remove("active");
  closeEl.style.display = "none";
  menuBar.style.display = "block";
});
