// var navbarAnchors = document.querySelectorAll('.main-nav a');
// navbarAnchors.forEach(function(anchor) {
//   if (anchor.href == window.location.href) {
//     anchor.classList.add('active');
//   }
// });

// const navBar = document.querySelector(".main-nav")
//       allLi = document.querySelectorAll(".main-nav-li");


// allLi.forEach((li, index) => {
//   li.addEventListener("click", e => {
//     e.preventDefault();
//     navBar.querySelector(".active").classList.remove("active");
//     li.classList.add("active");

//     const indicator = document.querySelector(".indicator");
//     indicator.style.transform = `translateX(calc(${index * 90}px))`;
//   });
// });



// *************************
// *    MAIN MBTI PAGE     *
// *************************
function setFlexDirection(direction) {
  const flexContainer = document.querySelector('.table-result');
  flexContainer.style.flexDirection = direction;
}

let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-80px"; // Adjust with the height of your navbar
  }
  prevScrollpos = currentScrollPos;
}



// *************************
// * MAIN MBTI-Input Field *
// *************************
// check if input field is not empty and not disappear when may tinype user
// const mbtiInputs = document.querySelectorAll('.add-name');
// const inputContainers = document.querySelectorAll('.mbti-type-input');


const mbtiInputs = document.querySelectorAll('.add-name');
const inputContainers = document.querySelectorAll('.mbti-type-input');
const mbtiImages = document.querySelectorAll('.mbti-type-n-img');

const greenTypes = ['ENFJ', 'ENFP', 'INFJ', 'INFP'];
const purpleTypes = ['ENTJ', 'ENTP', 'INTJ', 'INTP']
const blueTypes = ['ESFJ', 'ESTJ', 'ISFJ', 'ISTJ']
const goldTypes = ['ESFP', 'ESTP', 'ISFP', 'ISTP']

mbtiInputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    const inputContainer = input.closest('.mbti-boxes').querySelector('.mbti-type-input');
    const mbtiImage = mbtiImages[index];

    if (input.value.length > 0) {
      inputContainer.classList.add('active');
      // Change content URL to GIF based on the input value
      // const type = input.getAttribute('id');
      // const gifURL = `/resources/images/MBTI Avatars/gif/${type}-GIF.gif`;
      // mbtiImage.style.content = `url('${gifURL}')`;

      if (greenTypes.includes(type)) {
        mbtiImage.style.filter = 'drop-shadow(0 0 8px var(--mbti-green))';
      } else if (purpleTypes.includes(type)) {
        mbtiImage.style.filter = 'drop-shadow(0 0 8px var(--mbti-purple))';
      }else if (blueTypes.includes(type)) {
        mbtiImage.style.filter = 'drop-shadow(0 0 8px var(--mbti-blue))';
      } else if (goldTypes.includes(type)) {
        mbtiImage.style.filter = 'drop-shadow(0 0 8px var(--mbti-gold))';
      }

    } else {
      inputContainer.classList.remove('active');


      // Revert to default image or remove GIF when input is empty
      mbtiImage.style.content = ''; // Revert to default image or ''
      mbtiImage.style.filter = '';
    }
  });
});



// *******************************
// *         MBTI PAGE           *
// *******************************

const imageContainer = document.querySelector('.cards');
const cursorCircle = document.querySelector('.cursor-circle');

imageContainer.addEventListener('mousemove', (e) => {
  const x = e.pageX - imageContainer.offsetLeft;
  const y = e.pageY - imageContainer.offsetTop;
  
  cursorCircle.style.display = 'block';
  cursorCircle.style.left = `${x}px`;
  cursorCircle.style.top = `${y}px`;
  cursorCircle.style.clipPath = `circle(25px at ${x}px ${y}px)`; /* Adjust radius */
});





