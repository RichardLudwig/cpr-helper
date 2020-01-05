// variables
const COMPRESSIONS = 30;
const VENTILATIONS = 2;
const COMPRESSION_SOUND = new Audio('./beep.mp3');
const VENTILATION_SOUND = new Audio('./wind.mp3');

// build sleep function - https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 100bpm audio metronome helper function
function compressionSound() {
  COMPRESSION_SOUND.play();
}

// ventilation sound helper function
function ventilationSound() {
  VENTILATION_SOUND.play();
}

// pause helper functions
function pauseCompressions() {
  COMPRESSION_SOUND.pause();
}

function pauseVentilations() {
  VENTILATION_SOUND.pause();
}

// cpr function to run with intervals
async function cpr() {
  compressionSound();
  // disable button while function running
  // issue is that, if not disabled, will run multiple rounds simultaneously for every button click
  document.getElementById('cpr-button').disabled = true;

  // cycles through COMPRESSIONS
  for (let i = 1; i <= COMPRESSIONS; i++) {

    // 600 MS IS 100BPM WHICH IS THE STANDARD TIMING FOR CPR
    await sleep(600);
    // when last compression is iterated
    if (i == COMPRESSIONS) {
      // prints last compression in round
      document.getElementById('cpr').innerHTML = `Compression #${i}`;    
      // switch to VENTILATIONS
      // pause sound()
      pauseCompressions();
      for (let j = 1; j <= VENTILATIONS; j++) {
        // when last ventilation is iterated
        if (j == VENTILATIONS) {
          // prints last ventilation in round
          await sleep(2000);
          document.getElementById('cpr').innerHTML = `Ventilation #${j}`;
          await sleep(2000);
          // sleep function so user can see last ventilation
          // function ending so remove button disability to allow new round
          pauseVentilations();
          document.getElementById('cpr-button').disabled = false;
          // helpful message that round is done
          document.getElementById('cpr').innerHTML = 'Round Done';
          // ends function
          return;
        }
        ventilationSound();
        await sleep(600);
        // prints ventilation when iterated
        document.getElementById('cpr').innerHTML = `Ventilation #${j}`;
      }
    }
    // prints compression when iterated  
    document.getElementById('cpr').innerHTML = `Compression #${i}`;    
  }
}