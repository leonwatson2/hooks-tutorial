import React, { useReducer, useContext, createContext } from 'react';

const AppContext = createContext();

export const LightElement = _ => {
  const { isLightOn: illuminated } = useContext(AppContext);
  return (
    <div id='light-bulb' className={illuminated ? 'on' : 'off'}>
      <span className='bulb off' />
      <span className='bulb on' />
    </div>
  );
};

export const LightSwitch = _ => {
  const { isLightOn, onClick } = useContext(AppContext);
  return (
    <div className={`cube-switch ${isLightOn ? ' active' : ''}`}>
      <span className='switch' onClick={onClick}>
        <span className='switch-state off'>Off</span>
        <span className='switch-state on'>On</span>
      </span>
    </div>
  );
};

export const Count = props => {
  const { timesOff, timesOn } = useContext(AppContext);
  return (
    <div className={`numbers`}>
      <label>Number Of Times</label>
      <div className='number'>
        <label>On</label>
        <span>{timesOn}</span>
      </div>
      <div className='number'>
        <label>Off</label>
        <span>{timesOff}</span>
      </div>
    </div>
  );
};

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
    default:
      return state;
  }
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
  const contextValue = { onClick: toggleLight, isLightOn, timesOff, timesOn };
  return (
    <AppContext.Provider value={contextValue}>
      <LightElement />
      <LightSwitch  />
      <Count />
    </AppContext.Provider>
  );
}

export default App;
