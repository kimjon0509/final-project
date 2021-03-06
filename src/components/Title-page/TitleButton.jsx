import React, {useEffect, useState} from "react";
import './TitleButton.scss'


export default function TitleButton(props) {

  return (
    <button className="main-page-button" onClick={() => {
      props.socketSceneTransition('Bus')}
    }>{props.buttonText}</button>
  );
}
