// let arrow = document.querySelectorAll(".arrow");
//     for (var i = 0; i < arrow.length; i++) {
//       arrow[i].addEventListener("click", (e)=>{
//      let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
//      arrowParent.classList.toggle("showMenu");
//       });
//     }
//     let sidebar = document.querySelector(".sidebar");
//     let sidebarBtn = document.querySelector(".bx-menu");
//     console.log(sidebarBtn);
//     sidebarBtn.addEventListener("click", ()=>{
//       sidebar.classList.toggle("close");
//     });

const openMenu = document.querySelector('#show-menu');
const hideMenuIcon = document.querySelector('#hide-menu');
const sideMenu = document.querySelector('#nav-menu');
const menuBars = document.getElementsByClassName('menu-bars');

openMenu.addEventListener('click', function() {
  sideMenu.classList.add('active');
});

hideMenuIcon.addEventListener('click', function() {
  sideMenu.classList.remove('active');
});
document.addEventListener('click', function(event) {
  let targetElement = event.target; // Clicked element

  // Check if the clicked element is outside the navbar or its parent elements
  while (targetElement != null) {
    if (targetElement === sideMenu || targetElement === openMenu) {
      return; // Clicked element is inside the navbar, do nothing
    }
    targetElement = targetElement.parentElement;
  }

  // Clicked element is outside the navbar, remove the 'active' class
  sideMenu.classList.remove('active');
});


$(document).ready(function() {
  $('.scrollspy-items a').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    
    // Calculate the scroll offset relative to the scrollspy content container
    var offset = 20; // Adjust this value to set the desired space at the top
    var scrollOffset = $(target).position().top + $('.scrollspy-content').scrollTop() - offset;
    
    // Scroll to the target regardless of its position
    $('.scrollspy-content').animate({
      scrollTop: scrollOffset
    }, 500);
  });
});




function pdfSelector(filePath) {
  const link = document.createElement('a');
  link.href=filePath;
  link.download=filePath.substring(filePath.lastIndexOf('/') + 1);
  link.click();
}


var videoContainer = document.getElementById('video-container');
var cancelButton = document.getElementById('cancel-button');
var isVideoPlaying = false;
var isScrollActive = false;

window.addEventListener('scroll', function() {
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (isVideoPlaying && scrollPosition > videoContainer.offsetTop) {
    videoContainer.style.position = 'fixed';
    videoContainer.style.top = '10px'; // Adjust the top position when sticky
    videoContainer.style.width = '30%'; // Adjust the width as needed
    videoContainer.style.height = '0px';
    cancelButton.style.display = 'block';
    isScrollActive = true;
  } else {
    videoContainer.style.position = 'absolute';
    videoContainer.style.top = '5%'; // Adjust the top position when not sticky
    videoContainer.style.width = '98%';
    videoContainer.style.height = '70%';
    cancelButton.style.display = 'none';
    isScrollActive = false;
  }
  
});

cancelButton.addEventListener('click', function() {
  videoContainer.style.position = 'absolute';
  videoContainer.style.top = '5%'; // Adjust the top position when not sticky
  videoContainer.style.width = '98%';
  videoContainer.style.height = '70%';
  cancelButton.style.display = 'none';
});

var videoElement = document.getElementById('display');
videoElement.addEventListener('play', function() {
  isVideoPlaying = true;
});

videoElement.addEventListener('pause', function() {
  isVideoPlaying = false;
});

var searchBox = document.getElementById('search-input');
searchBox.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    if (searchBox.value.trim() !== '') {
      isVideoPlaying = true;
      videoContainer.style.display = 'block';
    } else {
      isVideoPlaying = false;
      videoContainer.style.display = 'none';
    }
  }
});

window.addEventListener('load', function() {
  window.scrollTo(0, 0);
});



// window.addEventListener('scroll', function() {
//   var videoContainer = document.getElementById('video-container');
//   var videoTop = videoContainer.offsetTop;
//   var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

//   if (scrollPosition > videoTop) {
//     videoContainer.style.position = 'fixed';
//     videoContainer.style.top = '10px'; // Adjust the top position when sticky
//     videoContainer.style.width = '30%'; // Adjust the width as needed
//     videoContainer.style.height = '0px';  
  
//   } else {
//     videoContainer.style.top = '100px'; // Adjust the top position when not sticky
//     videoContainer.style.width = '98%';
//     videoContainer.style.height = '70%';
//     videoContainer.style.position = 'absolute';
//     videoContainer.style.top = '5%';
//   }
// });

// // for (let i = 0; i < menuBars.length; i++) {
//   menuBars[i].addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent the default navigation behavior

//     // Add your code to open/close the nav menu here

//     // Scroll the page to the top
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   });
