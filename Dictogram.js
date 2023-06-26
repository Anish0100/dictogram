// define the API key and URL
const apiKey = '12487f14-8c62-43cc-85c4-d09ed4fb89ae';
const apiUrl = `https://dictionaryapi.com/api/v3/references/sd4/json`;

let videoIdMap;
let player;
let searchInput;
document.addEventListener('DOMContentLoaded', () => {
  searchInput = document.querySelector('#search-input');
  // fetch the videos.json file
  fetch('videos.json')
    .then(response => response.json())
    .then(videos => {
      const searchInput = document.getElementById('search-input');
      const meaning = document.getElementById('word-meaning');
      const display = document.getElementById('display');

      // add an event listener to the search button
      document.getElementById('search-button').addEventListener('click', () => {
        const videoName = searchInput.value.toLowerCase();
        const video = videos.find(video => video.name.toLowerCase() === videoName ||
        (video.keywords && video.keywords.includes(videoName)));
        if (video) {
          if (video.filePath) {
            // display video from local directory
            display.src = video.filePath;
            display.addEventListener('canplay', () => {
              display.play();
            });
            // hide YouTube video if it's currently playing
            if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
              display.style.display = 'block';
              player.pauseVideo();
              player.destroy();
              player = undefined;
            }
          } else if (video.videoID) {
            // remove the local video if it's currently playing
            if (display.src && !display.src.startsWith('https://www.youtube.com/')) {
              display.src = '';
            }
            // load video from YouTube
            loadVideo(video.videoID);
          }
        } else {
          display.innerHTML = `Invalid entry, do you mean ${suggestion.name}?`;
        }
      
        // fetch the Dictogram.json file
        fetch('Dictogram.json')
          .then(response => response.json())
          .then(data => {
            const word = data[videoName];
            if (word) {
              meaning.innerHTML = `<h2>${videoName}</h2><p>${word.definition}</p><p>Example: ${word.example}</p>`;
            } else {
              // fetch the definition from the API
              fetch(`${apiUrl}/${videoName}?key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                  if (data.length > 0) {
                    const definition = data[0].shortdef[0];
                    meaning.innerHTML = `<h2>${videoName}</h2><p>${definition}</p>`;
                  } else {
                    meaning.innerHTML = `Sorry, we couldn't find the definition of ${videoName}.`;
                  }
                })
                .catch(error => console.error(error));
            }
          })
          .catch(error => console.error(error));
      });

      // add an event listener to the search input
      if (searchInput) {
        searchInput.addEventListener('keyup', (event) => {
          if (event.keyCode === 13) {
            document.getElementById('search-button').click();
          }
        });
      }
    
      const wl = document.querySelector('wl');
      if (wl) {
        wl.addEventListener('mouseenter', function() {
          // code to show message box
        });
      }
    });
});

// show player
function loadVideo(videoId) {
  // check if player is already loaded
  if (typeof player === 'undefined') {
    // createfunction onYouTubeIframeAPIReady() {
player = new YT.Player('display', {
  height: '360',
  width: '640',
  videoId: videoId,
  events: {
  'onReady': onPlayerReady,
  'onStateChange': onPlayerStateChange
  }
  });
  } else {
  // player already exists, load new video
  player.loadVideoById(videoId);
  }
  }
  
  // play video when ready
  function onPlayerReady(event) {
  event.target.playVideo();
  }
  
  // pause video and show display when video ends
  function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
  player.pauseVideo();
  display.style.display = 'block';
  }
  }
