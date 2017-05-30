import React from 'react';
import TypeWriter from 'react-typewriter';
import {Collapse} from 'react-collapse';
import Loader from 'react-dots-loader';

export default ({ response, showChat, profile } ) => {
  

  return (
    <Collapse isOpened={!showChat}>
      <div 
        style={{minHeight: "50vh"}} 
        className={showChat ? "convoMessageEnter": "convoMessageLeave"}
      >
        { response.loading &&
            <div style={{ paddingBottom: 12 + "px" }}>
					    <Loader size={8} color={profile.babyChetColor && profile.babyChetMode ? profile.babyChetColor : "#31a531"} />
				    </div>
        }
        { !response.loading && response.term !== "" &&
            <TypeWriter typing={response.typing} minDelay={100} >
                <h2 
                  style={{color: profile.babyChetColor && profile.babyChetMode ? profile.babyChetColor: "#31a531" , fontFamily: "Source Code Pro, monospace"}} 
                  className={showChat ? "convoMessageLeave": ""}
                >
                  {response.term}
                </h2>
              </TypeWriter>
        } 
      </div>
   </Collapse>
  );
}


