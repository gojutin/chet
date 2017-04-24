import React from 'react';
import TypeWriter from 'react-typewriter';
import WobblySpinner from 'react-wobbly-spinner';

export default ({response, loading, typing}) => 
  <div>
    { loading 
        ? <WobblySpinner />
        : <TypeWriter typing={typing} minDelay={100}>
            <h1 className="text-success" style={{fontSize: 4 + "em"}}>{response.term}</h1>
          </TypeWriter>
    } 
  </div>