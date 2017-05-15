import React from 'react';

export default ({color, onClick, dbColor, selectedColor}) => {
	let theColor = () => {
		if (!selectedColor) {
			return dbColor;
		} else {
			return selectedColor;
		}
			
	}
	return (
		<div style={{display: "inline", padding: 0, margin: 0}}>
			{ (theColor() === color) &&
				<i 
					className="fa fa-child fa-2x" 
					style={{
							color, 
							marginLeft: 5 + "px", 
							marginRight: 5 + "px", 
							cursor: "pointer",
							border: `1px solid ${color}`,
							borderRadius: 4 + "px"
						}}
					onClick={() => onClick(color)}
				/>

			}
			{ theColor() !== color  &&
				<i 
					className="fa fa-child fa-2x" 
					style={{
							color, 
							marginLeft: 5 + "px", 
							marginRight: 5 + "px", 
							cursor: "pointer"
						}}
					onClick={() => onClick(color)}
				/>
			}
			</div>
	)
}
