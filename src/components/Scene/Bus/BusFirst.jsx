import React, {useEffect, useState} from "react";
import ButtonNext from '../../Scene-component/ButtonNext';
import ButtonChoice from '../../Scene-component/ButtonChoice';
import Description from '../../Scene-component/Description';
import Timer from '../../Scene-component/Timer';
import KeywordDisplay from '../../Scene-component/Keyword-display/KeywordDisplay';
import HealthBar from '../../Scene-component/HealthBar';

const classNames = require('classnames');

export default function BusFirst(props) {
  const [show, setShow] = useState(false)
  const sceneDescription = "You decide the best course of action is to take the bus. You tell Denise you’re leaving, grab your supplies, and head out. Boarding the bus, you quickly realize there is no key in the ignition. Luckily, you have the tools to hotwire the bus. That might take a while though. You decide to use the power to sense if there’s a key hidden somewhere close...";

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
  const PUZZLE = 'Puzzle'
  const CHOICES = 'Choices'
  const styleShow = show ? {} : {visibility: 'hidden'}
  const { mode, transition } = usePuzzleToChoices('Puzzle')
  return (
    <div className='scene-layout'>
      {show ? <Timer puzzleToChoices={transition}></Timer> : <div className='timer-dummy'></div>}
      <div style={styleShow} className='show-animation'>
        <div className='heart-right'>
          {<HealthBar heart={props.heart} style={styleShow} ></HealthBar>}
        </div>
      </div>
      <Description className='descripton-layout' setShow={setShow} text={sceneDescription} maxLen={55}></Description>
      {mode === PUZZLE &&
        <div style={styleShow} className='show-animation'>
          {<KeywordDisplay keyword={'key'} style={styleShow} puzzleToChoices={transition} sceneTransition={props.transition} ></KeywordDisplay>}
        </div>
      }
      {mode === CHOICES && 
        <>
        <ButtonChoice choice={'Hotwire the bus'} scene={'second'} sceneTransition={props.sceneTransition}></ButtonChoice>
        <ButtonChoice choice={'Use key'} scene={'third'} sceneTransition={props.sceneTransition}></ButtonChoice>
        </>
      }
    </div>
  )
}