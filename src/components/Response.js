import React from 'react';
import TypeWriter from 'react-typewriter';
import WobblySpinner from 'react-wobbly-spinner';
import {Collapse} from 'react-collapse';

export default ({ loading, typing, showConversation, term } ) => {
  

  return (
    <Collapse isOpened={!showConversation}>
      <div 
        style={{minHeight: "50vh"}} 
        className={showConversation ? "convoMessageEnter": "convoMessageLeave"}>
        { loading &&
            <div style={{marginTop: 5 + "px"}}>
                <WobblySpinner diameter={40} />
            </div>
        }
        { !loading && term !== "" &&
            <TypeWriter typing={typing} minDelay={100}>
                <h2 
                  style={{color: "#31a531", fontFamily: "Source Code Pro, monospace"}} 
                  className={showConversation ? "convoMessageLeave": ""}
                >
                  {term}
                </h2>
              </TypeWriter>
        } 
      </div>
   </Collapse>
  );
}


