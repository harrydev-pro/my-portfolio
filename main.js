const menuBar = document.getElementById('hamburger');
const slideEl =document.getElementById('slidedown');
const closeEl =document.getElementById('xmark');
const offEl =document.getElementById('toggle-off');
const onEl =document.getElementById('toggle-on');
const progressBars = document.querySelectorAll('.progress');




// for  progress bar
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      
      // stagger each bar by 120ms
      setTimeout(() => {
        entry.target.style.width = entry.target.dataset.width;
      }, i * 120);
    }
  });
}, { 
  threshold: 0.3 // trigger when 30% of bar is visible. Lower = triggers earlier
});

progressBars.forEach(bar => observer.observe(bar));


// for text typing animation
const words = ["frontend developer", "backend developer", "full stack developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting =false;
const typedText = document.getElementById("typing")


function type(){
const currentWord = words[wordIndex];

if(isDeleting){
    typedText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
}
else {
    typedText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting? 50 : 120; // delete faster

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
const saveMode = localStorage.getItem('theme');
if(saveMode === "dark"){
    document.body.classList.add('dark');
    onEl.style.display = "none"
    offEl.style.display = "block"
}
else{
    document.body.classList.remove('dark');
    onEl.style.display = "block"
    offEl.style.display = "none"
}

onEl.addEventListener('click', ()=>{
    onEl.style.display = "none"
    offEl.style.display = "block"
     document.body.classList.add('dark');
     localStorage.setItem('theme', "dark")
})
offEl.addEventListener('click', ()=>{
    onEl.style.display = "block"
    offEl.style.display = "none"
     document.body.classList.remove('dark');
      localStorage.setItem('theme', "light")
})




// for dropdown
menuBar.addEventListener("click", ()=>{
    slideEl.classList.toggle('active');
    closeEl.style.display = "block"
    menuBar.style.display = "none"
    
})
closeEl.addEventListener("click", ()=>{
    slideEl.classList.remove('active');
    closeEl.style.display = "none"
    menuBar.style.display = "block"
    
})