import React from 'react';
import { render } from 'react-dom';
import { useState, useEffect } from 'react';

const App = () => {
  // state = {
  //   status: 'off', 
  //   time: 0,
  //   timer: null
  // }
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null); // zabezpieczenie przed kliknięciem guzika start dwa razy (jeżeli działa nie uruchomi się ponownie)

  const formatTime = () => {
    let minutes = Math.floor(time / 60); 
    let seconds = time % 60;

    const minutesTime = (minutes < 10) ? "0" + minutes : minutes;
    const secondsTime = (seconds < 10) ? "0" + seconds : seconds; 

        return minutesTime + ":" + secondsTime;
  }

  const startTimer = () => {
    if(!timer) {
      setStatus('work');
      setTime(1200);
      setTimer(() => setInterval(() => setTime(time => time - 1), 1000)); // setInterval przy pierwszym uruchomieniu dostaje nr. identyfikacyjny, i ma ten numer przez cały czas aż do wykonania clearInterval(). Ten nr. identyfikacyjny jest zapisywany w zmiennej timer. 
    }  // setTime --> zmieniamy zmienną time która jest w pamięci (czyli zmienną time ze stanu lokalnego). Gdybyśmy wzięli po prostu zmienną time, byłaby to wartość z momentu uruchomienia setInterval. 
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
    setStatus('off');
    setTime(0);
  }

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

 useEffect(() => {
  if (timer && time === 0) { // timer zmienia się przy start/stop, time co sekundę jeżeli timer jest uruchomiony, [timer jest null, a time 0 - taki przypadek jest np. przed uruchomieniem aplikacji]
    playBell();
    if (status === 'rest') {
      setStatus('work'); 
      setTime(1200)
    } else {
      setStatus('rest');
      setTime(20)
    }
  }
 }, [timer, time])

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