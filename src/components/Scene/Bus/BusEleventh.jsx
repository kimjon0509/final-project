import React, { useEffect, useState } from "react";
import Description from '../../Scene-component/Description';
import HealthBar from '../../Scene-component/HealthBar'

const classNames = require('classnames');

export default function BusFirst(props) {
  const [show, setShow] = useState(false)
  const styleShow = show ? {} : { visibility: 'hidden' }
  const sceneDescription = "The vehicle slows and stops beside the bus. You see two men step out, pistols in their holsters. They call out. You’re both ready, pistols in hand, waiting for a clear shot. You see your opportunity and open fire. You hear a shout, and one of them fires back at you, grazing your arm. You fire again. Both men are on the ground. You’re in pain, but you check the drivers and the car for supplies. You decide to move all your resources into the car, it being faster and quieter than the bus. You drive off, telling yourselves it had to be done. You continue on your journey, eventually reaching the city and the hospital. You made it.";
  useEffect(() => {
    props.removeHeart()
  }, [])

  const testDesc = "Hello my name is blah Hello my name is blah Hello my name is blah"
  return (
    <div className='scene-layout'>
      <div className='heart-right'>
        <div style={styleShow} className='show-animation'>
          {<HealthBar heart={props.heart} ></HealthBar>}
        </div>
      </div>
      <Description className='descripton-layout' socketSetShow={props.socketSetShow} text={sceneDescription} maxLen={55}></Description>
    </div>
  )
}