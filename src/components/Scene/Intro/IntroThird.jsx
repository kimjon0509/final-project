import React, {useEffect, useState} from "react";
import ButtonNext from '../../Scene-component/ButtonNext';
import Description from '../../Scene-component/Description';
import HealthBar from '../../Scene-component/HealthBar';
import ButtonChoice from '../../Scene-component/ButtonChoice';

const classNames = require('classnames');

export default function IntroFirst(props) {

  function usePuzzleToChoices(initial) {
    const [history, setHistory] = useState([initial]);
  
    function transition(changeMode, replace = false) {
      setHistory(prev => {
        if (replace) {
          return [changeMode, ...prev.slice(1)];
        } else {
          return [changeMode, ...prev];
        }
      });
    }
  
    function back() {
      setHistory(prev => {
        if (prev.length > 1) {
          return prev.slice(1);
        } else {
          return prev;
        }
      });
    }
  
    return {mode: history[0], transition, back };
  }

  const CHOICES = 'Choices'

  const { mode, transition } = usePuzzleToChoices('Choices')
  const [show, setShow] = useState(false)
  const styleShow = show ? {} : {visibility: 'hidden'}


  const sceneDescription = "You hear a thud against the door. Denise rushes over. “Vince?”";

  const testDesc = "Hello my name is blah Hello my name is blah Hello my name is blah"
  return (
    <div className='scene-layout'>
      <Description className='descripton-layout' setShow={setShow} puzzleToChoices={transition} text={sceneDescription} maxLen={55}></Description>
      <div style={styleShow} className='show-animation'>
        <div className='heart-right'>
            {mode === CHOICES &&
              <ButtonChoice scene={"introFourth"} sceneTransition={props.sceneTransition} choice={"Next"}></ButtonChoice>
            }
        </div>
      </div>
    </div>
  )
}