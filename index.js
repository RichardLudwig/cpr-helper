// variables
const compressions = 30;
const ventilations = 2;
const beep = new Audio('./beep.mp3');

// build sleep function - https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 100bpm audio metronome helper function
function sound() {
  beep.play();
}

// pause helper function
function pause() {
  beep.pause();
}

// cpr function to run with intervals
async function cpr() {
  sound();
  // disable button while function running
  // issue is that, if not disabled, will run multiple rounds simultaneously for every button click
  document.getElementById('cpr-button').disabled = true;

  // cycles through compressions
  for (let i = 1; i <= compressions; i++) {

    // 600 MS IS 100BPM WHICH IS THE STANDARD TIMING FOR CPR
    await sleep(600);
    // when last compression is iterated
    if (i == compressions) {
      // prints last compression in round
      document.getElementById('cpr').innerHTML = `Compression #${i}`;    
      // switch to ventilations
      for (let j = 1; j <= ventilations; j++) {
        await sleep(600);
        // when last ventilation is iterated
        if (j == ventilations) {
          // prints last ventilation in round
          document.getElementById('cpr').innerHTML = `Ventilation #${j}`;
          // pause sound()
          pause();
          // sleep function so user can see last ventilation
          await sleep(600);
          // function ending so remove button disability to allow new round
          document.getElementById('cpr-button').disabled = false;
          // helpful message that round is done
          document.getElementById('cpr').innerHTML = 'Round Done';
          // ends function
          return;
        }
        // prints ventilation when iterated
        document.getElementById('cpr').innerHTML = `Ventilation #${j}`;
      }
    }
    // prints compression when iterated  
    document.getElementById('cpr').innerHTML = `Compression #${i}`;    
  }
}