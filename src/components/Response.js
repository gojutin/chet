import React from 'react';
import TypeWriter from 'react-typewriter';
import {Collapse} from 'react-collapse';
import Loader from 'react-dots-loader';

export default ({ response, showConversation } ) => {
  

  return (
    <Collapse isOpened={!showConversation}>
      <div 
        style={{minHeight: "50vh"}} 
        className={showConversation ? "convoMessageEnter": "convoMessageLeave"}>
        { response.loading &&
            <div style={{ paddingBottom: 12 + "px" }}>
					    <Loader size={8} color="green" />
				    </div>
        }
        { !response.loading && response.term !== "" &&
            <TypeWriter typing={response.typing} minDelay={100} >
                <h2 
                  style={{color: "#31a531", fontFamily: "Source Code Pro, monospace"}} 
                  className={showConversation ? "convoMessageLeave": ""}
                >
                  {response.term}
                </h2>
              </TypeWriter>
        } 
      </div>
   </Collapse>
  );
}


