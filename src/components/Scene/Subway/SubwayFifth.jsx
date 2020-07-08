import React, {useEffect, useState} from "react";
import ButtonNext from '../../Scene-component/ButtonNext';
import ButtonChoice from '../../Scene-component/ButtonChoice';
import Description from '../../Scene-component/Description';
import Timer from '../../Scene-component/Timer';
import KeywordDisplay from '../../Scene-component/Keyword-display/KeywordDisplay';
import HealthBar from '../../Scene-component/HealthBar';

const classNames = require('classnames');

export default function SubwayFifth(props) {
  const [show, setShow] = useState(false)
  const sceneDescription = "You bring the train to a stop. Opening the door and hopping down onto the tracks, you realize the figure is a man, in rough shape but alive. As you move to help him, you hear a sudden shriek from behind you -- the noise of the train must have drawn the attention of some zombies. It sounds like they’re approaching fast. Using your uncanny abilities, you try to mask your presence from them long enough to get the man on board…";

  const testDesc = "Hello my name is blah Hello my name is blah Hello my name is blah"

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
  
    return {mode: history[0], transition };
  }
  const PUZZLE = 'Puzzle'
  const CHOICES = 'Choices'
  const styleShow = show ? {} : {visibility: 'hidden'}
  const { mode, transition } = usePuzzleToChoices('Puzzle')

  return (
    <div className='scene-layout'>
      {show ? <Timer 
      transition={transition}
      pass={'pass'}
      scene={'deathOne'}
      sceneTransition={props.sceneTransition}
      ></Timer> : <div className='timer-dummy'></div>}
      <div style={styleShow} className='show-animation'>
        <div className='heart-right'>
          {<HealthBar
            style={styleShow}
            heart={props.heart}
          ></HealthBar>}
        </div>
      </div>
      <Description className='descripton-layout' setShow={setShow} text={sceneDescription} maxLen={55} pass={'pass'}></Description>
      {mode === PUZZLE &&
        <div style={styleShow} className='show-animation'>
          {<KeywordDisplay
          keyword={'deed'}
          style={styleShow} 
          pass={'pass'}
          scene={'sixth'}
          sceneTransition={props.sceneTransition}></KeywordDisplay>}
        </div>
      }
    </div>
  )
}