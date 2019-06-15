import React, { useState, Fragment } from 'react';

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

function App() {
  const [isLightOn, changeLight] = useState();
  const toggleLight = () => {
    changeLight(!isLightOn);
  };

  return (
    <Fragment>
      <LightElement illuminated={isLightOn} />
      <LightSwitch onClick={toggleLight} isLightOn={isLightOn} />
    </Fragment>
  );
}

export default App;
