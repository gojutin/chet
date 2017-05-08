import React from 'react';
import TypeWriter from 'react-typewriter';
import WobblySpinner from 'react-wobbly-spinner';
import {Collapse} from 'react-collapse';

export default ({response, loading, typing, showConversation}) => {

  return (
    <Collapse isOpened={!showConversation}>
      <div 
        style={{minHeight: "50vh"}} 
        className={showConversation ? "convoMessageEnter": "convoMessageLeave"}>
        { loading 
            ? <div style={{marginTop: 5 + "px"}}>
                <WobblySpinner diameter={40} />
              </div>
            :  <TypeWriter typing={typing} minDelay={100}>
                  <h1 
                    style={{color: "#31a531"}} 
                    className={showConversation ? "convoMessageLeave": ""}
                    
                    
                  >
                    {response.term}
                  </h1>
                </TypeWriter>
        } 
      </div>
   </Collapse>
  );
}


