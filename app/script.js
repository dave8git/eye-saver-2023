import React from 'react';
import { render } from 'react-dom';
import { useState } from 'react';

const App = () => {
  // state = {
  //   status: 'off', 
  //   time: 0,
  //   timer: null
  // }
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = () => {
    let minutes = 0; 
    let seconds = 0;
    console.log(time);
    minutes = Math.floor((time / (1000 * 60)) % 60),
    seconds = Math.floor((time / 1000) % 60)

    const minutesTime = (minutes < 10) ? "0" + minutes : minutes;
    const secondsTime = (seconds < 10) ? "0" + seconds : seconds; 

        return minutesTime + ":" + secondsTime;
  }

  const startTimer = () => {
    if(!timer) {
      setTimer(() => setInterval(() => {step(time)}, 1000)),
      setTime(1200),
      console.log(time);
      setStatus('work')
    } 
  };

  const stopTimer = () => {
    clearInterval();
    setStatus('off'),
    setTime(0);
  }

  const step = () => {
    console.log('time', time);
    if(time !== 0) {
        setTime((time) => time - 1)
    } else {
      if(status === 'rest') {
          setStatus('work'),
          setTime(1200)
      } else {
        setStatus('rest'),
        setTime(20)
      }
    }
  }

  const closeApp = () => {
    window.close();
  }
  return(
      <div>
        <h1>Protect your eyes</h1>
        { status === 'off' && (
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        )}
        { status === 'work' && (<img src="./images/work.png" />) }
        { status === 'rest' && (<img src="./images/rest.png" />) }
        { status !== 'off' && (<div className="timer">
          {formatTime()}
        </div>
        )}
        { status === 'off' && (<button className="btn" onClick={() => {startTimer()}}>Start</button>)}
        { status !== 'off' && (<button className="btn" onClick={() => {stopTimer()}}>Stop</button>)}
        <button className="btn btn-close" onClick={() => {closeApp()}}>X</button>
      </div >
    )
  }


render(<App />, document.querySelector('#app'));