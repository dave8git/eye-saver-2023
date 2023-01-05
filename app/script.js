import React from 'react';
import { render } from 'react-dom';

const App = () => {
  state = {
    status: 'off', 
    time: 0,
    timer: null
  }
  const formatTime = () => {
    let minutes = 0; 
    let seconds = 0;

    minutes = Math.floor(state.time/60);
    seconds = state.time = (minutes*60);

    if(minutes < 10) {
      minutes = `0${minutes}`;
    }
    if(seconds < 10) {
      seconds = `0${minutes}`;
    }
    return `${minutes}:${seconds}`;
  }

  const startTimer = () => {
    setState({
      timer: setInterval(() => {step()}, 1000),
      time: 12, 
      status: 'work',
    })
  }

  const stopTimer = () => {
    clearInterval(state.timer);
    this.setState({
      time: 0,
      status: 'off',
    });
  }

  const step = () => {
    if(state.time != 0) {
      setState({
        time: state.time - 1,
      });
    } else {
      if(state.status === 'rest') {
        setState({
          status: 'work',
          time: 1200,
        });
      } else {
        setState({
          state: 'rest',
          time: 20,
        });
      }
    }
  }

  const closeApp = () => {
    window.close();
  }
  return(
      <div>
        <h1>Protect your eyes</h1>
        { state.status === 'off' && (
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        )}
        { state.status === 'work' && (<img src="./images/work.png" />) }
        { state.status === 'rest' && (<img src="./images/rest.png" />) }
        { state.status === 'off' && (<div className="timer">
          {formatTime()}
        </div>
        )}
        { state.status === 'off' && (<button className="btn" onClick={startTimer()}>Start</button>)}
        { state.status !== 'off' && (<button className="btn" onClick={stopTimer()}>Stop</button>)}
        <button className="btn btn-close" onClick={() => {closeApp()}}>X</button>
      </div >
    )
  }


render(<App />, document.querySelector('#app'));
