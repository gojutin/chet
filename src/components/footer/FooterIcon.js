import React from 'react';
import WobblySpinner from 'react-wobbly-spinner'

export default ({type, condition, onClick, loggingIn}) =>
	<div>
		{ !loggingIn && 
			<i
				className={`fa fa-${type} fa-2x ${condition ? "text-warning" : ""}`}
				onClick={onClick ? () => onClick(): null}
				style={{ color: "gray", cursor: "pointer" }}
			/>
		}
		{ loggingIn && 
			<WobblySpinner diameter={30} />
		}
	</div>