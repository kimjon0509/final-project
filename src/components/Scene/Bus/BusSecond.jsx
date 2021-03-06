import React, {useEffect, useState} from "react";
import ButtonNext from '../../Scene-component/ButtonNext';
import ButtonChoice from '../../Scene-component/ButtonChoice';
import Description from '../../Scene-component/Description';
import Timer from '../../Scene-component/Timer';
import KeywordDisplay from '../../Scene-component/Keyword-display/KeywordDisplay';
import HealthBar from '../../Scene-component/HealthBar';
import {webSocket} from '../../../webSocket'
const classNames = require('classnames');

export default function BusSecond(props) {
  const [show, setShow] = useState(false)
  const sceneDescription1 = "As you are trying to hotwire the bus, you hear sudden screeching, coming in your direction. You just need a few more seconds. Glancing through the windshield, you see zombies rushing towards you at frightening speed. You lunge for the door lever and pull. The zombies run headfirst into the glass, howling and slamming themselves against it. At last the wires catch and the bus growls to life. You slam the pedal to the floor, plowing through the zombies, crushing their rotting forms with the hulk of the bus. The engine thunders as you swerve onto the street, the trailing zombies falling quickly behind...";
  const sceneDescription2 = "After the adrenaline fades and you’ve been driving for a while, you spot a gas station ahead. The hospital isn’t near your apartment and you need directions. You find a torn up map on a board outside the convenience store and write down directions. Before leaving, you both eye the darkened interior of the convenience store. Having brought flashlights, you contemplate going in. The sound of the idling bus reverberates around the lot. Your minds tingle in warning, but it’s unclear from which course..."
  const testDesc = "Hello, I hotwired the bus, and now im at the gas station"

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
  const [path, setPath] = useState(false)
  const buttonClass = classNames("button", {
    "correct-path": path,
  });

  const PUZZLE = 'Puzzle'
  const CHOICES = 'Choices'
  const styleShow = show ? {} : {visibility: 'hidden'}
  const { mode, transition } = usePuzzleToChoices('Puzzle')

  useEffect(() => {
    webSocket.on('puzzle to choices', (message) => {
      transition(message);
    });
        
    webSocket.on('show best path', (message) => {
      setPath(message)
    });
      
    webSocket.on('show', (message) => {
      setShow(message);
    });

    return function cleanup() {
      webSocket.off('puzzle to choices');
      webSocket.off('show best path');
      webSocket.off('show');
    }
  }, [])

  return (
    <div className='scene-layout'>
      {show ? <Timer 
        //sockets
        socketPuzzleToChoices={props.socketPuzzleToChoices}
        socketSceneTransition={props.socketSceneTransition}
        >
      </Timer> : <div className='timer-dummy'></div>}
      <div style={styleShow} className='show-animation'>
        <div className='heart-right'>
          {<HealthBar heart={props.heart} 
          style={styleShow} >
            </HealthBar>}
        </div>
      </div>
      <Description className='descripton-layout' text={sceneDescription2} maxLen={55}  socketSetShow={props.socketSetShow}></Description>
      {mode === PUZZLE &&
        <div style={styleShow} className='show-animation'>
          {<KeywordDisplay 
          keyword={'petrol'} 
          style={styleShow}  
          sceneTransition={props.sceneTransition} 
           //socket functions
           socketSetInput={props.socketSetInput}
           socketPuzzleToChoices={props.socketPuzzleToChoices}
           socketSetInputFieldBoxClass={props.socketSetInputFieldBoxClass}
           socketSceneTransition={props.socketSceneTransition}
           socketSetPath={props.socketSetPath}
           
           playerId={props.playerId}
           playerArr={props.playerArr}
          >
            </KeywordDisplay>}
        </div>
      }
      {mode === CHOICES && 
        <>
        <ButtonChoice 
        choice={'Check Convienence Store'} 
        scene={'fourth'} 
        //sockets
        socketSceneTransition={props.socketSceneTransition} 
        >
        </ButtonChoice>
        <ButtonChoice 
        correctPath={buttonClass} 
        choice={'Go back to bus'} 
        scene={'fifth'} 
        //sockets
        socketSceneTransition={props.socketSceneTransition}
        >

        </ButtonChoice>
        </>
      }
    </div>
  )
}