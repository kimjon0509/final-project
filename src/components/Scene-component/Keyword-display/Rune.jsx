import React, {useEffect, useState} from "react";
import './Runes.scss'
export default function Rune(props) {
// remove later
  const [shuffleWord, setShuffleWord] = useState([])

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  useEffect(() => {
    setShuffleWord(shuffle(props.keyword.split('')))
  }, [])

  function getRuneChar(shuffledWord) {
    const runeArr = [];
    const rune = {
      a: '&#5860;',
      b: '&#5858;',
      c: '&#5854;',
      d: '&#5824;',
      e: '&#5856;',
      f: '&#5792;',
      g: '&#5816;',
      h: '&#5819;',
      i: '&#5857;',
      j: '&#5812;',
      k: '&#5827;',
      l: '&#5847;',
      m: '&#5855;',
      n: '&#5832;',
      o: '&#5809;',
      p: '&#5840;',
      q: '&#5861;',
      r: '&#5839;',
      s: '&#5866;',
      t: '&#5795;',
      u: '&#5870;',
      v: '&#5871;',
      w: '&#5867;',
      x: '&#5852;',
      y: '&#5831;',
      z: '&#5827;',
    }
    shuffledWord.forEach(char => {
      runeArr.push(rune[char]);
    });
    return runeArr.map((rune, i) => {
      return (
        <span key={i}
          className='rune-output'
          onClick={() => {
            if(props.input.length < props.keyword.length)
            props.setInput([...props.input, decodeHtml(rune)])}}>
          {decodeHtml(rune)}
        </span>
      )
    })
  };

  return (
    <div className='rune-collection'>
      {getRuneChar(shuffleWord)}
    </div>
  );
}
