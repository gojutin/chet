import React from 'react';
import { SocialIcon } from 'react-social-icons';

export default ({network, click}) => 
	<SocialIcon 
		network={network}
		style={{ height: 35, width: 35, margin: 5 + "px", cursor: "pointer" }}
		onClick={() => click(network)}
	/>