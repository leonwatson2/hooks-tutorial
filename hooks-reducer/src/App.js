import React, { useReducer, Fragment } from 'react';

export const LightElement = props => (
  <div id='light-bulb' className={props.illuminated ? 'on' : 'off'}>
    <span className='bulb off' />
    <span className='bulb on' />
  </div>
);

export const LightSwitch = props => (
  <div className={`cube-switch ${props.isLightOn ? ' active' : ''}`}>
    <span className='switch' onClick={props.onClick}>
      <span className='switch-state off'>Off</span>
      <span className='switch-state on'>On</span>
    </span>
  </div>
);

export const Count = props => (
  <div className={`numbers`}>
    <label>Number Of Times</label>
    <div className='number'>
      <label>On</label>
      <span>{props.timesOn}</span>
    </div>
    <div className='number'>
      <label>Off</label>
      <span>{props.timesOff}</span>
    </div>
  </div>
);

function AppReducer(state, action) {
  switch (action.type) {
    case 'toggleLight':
      return {
        ...state,
        isLightOn: !state.isLightOn
      };
    case 'incrementOn':
      return {
        ...state,
        timesOn: state.timesOn + 1
      };
    case 'incrementOff':
      return {
        ...state,
        timesOff: state.timesOff + 1
      };
  }
  return state;
}

const initalState = {
  isLightOn: true,
  timesOff: 0,
  timesOn: 0
};

function App() {
  const [{ isLightOn, timesOff, timesOn }, dispatch] = useReducer(
    AppReducer,
    initalState
  );
  const toggleLight = () => {
    !isLightOn
      ? dispatch({ type: 'incrementOn' })
      : dispatch({ type: 'incrementOff' });
    dispatch({ type: 'toggleLight' });
  };

  return (
    <Fragment>
      <LightElement illuminated={isLightOn} />
      <LightSwitch onClick={toggleLight} isLightOn={isLightOn} />
      <Count timesOff={timesOff} timesOn={timesOn} />
    </Fragment>
  );
}

export default App;
