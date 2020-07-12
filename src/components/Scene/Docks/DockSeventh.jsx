import React, {useEffect, useState} from "react";
import ButtonNext from '../../Scene-component/ButtonNext';
import ButtonChoice from '../../Scene-component/ButtonChoice';
import Description from '../../Scene-component/Description';
import Timer from '../../Scene-component/Timer';
import KeywordDisplay from '../../Scene-component/Keyword-display/KeywordDisplay';
import HealthBar from '../../Scene-component/HealthBar';

import {webSocket} from '../../../webSocket';

const classNames = require('classnames');

export default function DockFifth(props) {
  const [show, setShow] = useState(false)
  const sceneDescription = "You approach the boaters with the intent to talk. One of them, a young woman with a mask over her mouth, notices the two of you and they all turn. “Stop right there.” She levels a rifle in your direction. “One of you better start talking, or this isn’t going to end well for you.” You attempt to probe her mind for an answer that might get you through this...";

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
  const SUCCESS = 'Success'
  
  const styleShow = show ? {} : {visibility: 'hidden'}
  const { mode, transition } = usePuzzleToChoices('Puzzle')

  const [path, setPath] = useState(false)
  const buttonClass = classNames("button", {
    "correct-path": path,
  });

  // webSocket.on('puzzle to choices', (message) => {
  //   transition(message);
  // });
  
  // webSocket.on('show best path', (message) => {
  //   setPath(message);
  // });

  return (
    <div className='scene-layout'>
      {show ?
        <Timer
          sceneTransition={props.sceneTransition}
          scene={'ninth'}
          addHeart={props.addHeart}
          removeHeart={props.removeHeart}

          // SOCKETS
          socketPuzzleToChoices={props.socketPuzzleToChoices}
          socketSceneTransition={props.socketSceneTransition}>
        </Timer> : <div className='timer-dummy'></div>}

      <div style={styleShow} className='show-animation'>
        <div className='heart-right'>
          {<HealthBar 
            heart={props.heart}
            style={styleShow}>   
          </HealthBar>}
        </div>
      </div>
      <Description 
        className='descripton-layout'
        setShow={setShow}
        text={sceneDescription}
        maxLen={55}>
      </Description>

      {mode === PUZZLE &&
        <div style={styleShow} className='show-animation'>
          {<KeywordDisplay
            setPath={setPath}
            keyword={'rescue'}
            style={styleShow}
            puzzleToChoices={transition}

            // SOCKETS
            socketSetInput={props.socketSetInput}
            socketSceneTransition={props.socketSceneTransition}
            socketPuzzleToChoices={props.socketPuzzleToChoices}
            socketSetInputFieldBoxClass={props.socketSetInputFieldBoxClass}
            socketSetPath={props.socketSetPath}
            socketSetShow={props.socketSetShow}

            // PLAYERS
            playerId={props.playerId}
            playerArr={props.playerArr}>
          </KeywordDisplay>}
        </div>
      }

      <div style={styleShow} className='show-animation'>
        <div className='heart-right'>
            {mode === CHOICES &&
              <ButtonChoice 
                scene={"fourth2"} 
                sceneTransition={props.sceneTransition} 
                choice={"Next"}
                // SOCKETS
                socketSceneTransition={props.socketSceneTransition}>
              </ButtonChoice>
            }
        </div>
      </div>

    </div>
  )
}