import React from 'react';
import TypeWriter from 'react-typewriter';
import {Collapse} from 'react-collapse';
import Loader from 'react-dots-loader';

export default ({ loading, typing, showConversation, term } ) => {
  

  return (
    <Collapse isOpened={!showConversation}>
      <div 
        style={{minHeight: "50vh"}} 
        className={showConversation ? "convoMessageEnter": "convoMessageLeave"}>
        { loading &&
            <div style={{ paddingBottom: 12 + "px" }}>
					    <Loader size={8} color="green" />
				    </div>
        }
        { !loading && term !== "" &&
            <TypeWriter typing={typing} >
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


