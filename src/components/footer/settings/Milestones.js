import React from 'react';
import { Col, Row, Progress, Badge } from 'reactstrap';
import { flip, tada } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  flip: {
    animationName: flip,
    animationDuration: '1s'
  },
  tada: {
    animationName: tada,
    animationDuration: '1s'
  },
})

const Trophy = ({phase, profile, progress, done}) => {
	const getColor = () => {
		if (done && phase.level === profile.phase.level) {
			// green
			return "#00C851";
		} else if ((progress  > phase.level) && phase.level < profile.phase.level ) {
			// yellow
			return "#ffbb33";
		} else {
			// light gray
			return "#F0F0F0"
		}
	};

	const readyToAnimate = done && phase.level === profile.phase.level ;
	return (
		<i 
			className={`fa fa-trophy ${readyToAnimate &&  css(styles.flip)}`} 
			style={{
				color: getColor(),
				margin: 5 + "px",
				fontSize: phase.size,
			}} 
		/>
	)
}

export default ({ profile, progress, done }) => {
	const phases = [
		{level: 1, name: "baby bot", words: 0, size: "30px", prize: "new colors!"},
		{level: 2, name: "tot bot", words: 200, size: "40px", prize: "new colors!"},
		{level: 3, name: "kid bot", words: 2000, size: "50px", prize: "new colors!"},
		{level: 4, name: "teen bot", words: 5000, size: "60px", prize: "new colors!"},
		{level: 5, name: "big bot", words: 20000, size: "70px", prize: "new colors!"},
	];

	const nextLevel = phases.filter(phase => 
		phase.level === profile.phase.level + 1)[0]

	return (
		<div style={{marginTop: 15 + "px"}}>

			{ 
				phases.map(phase => 
					<Trophy 
						key={phase.level} 
						phase={phase} 
						progress={progress}
						profile={profile} 
						done={done} 
					/>
				)
			}

			<Progress
				animated
				color="success"
				value={progress}
				style={{ margin: 10 + "px" }}
			/>

			<h2 className={"text-success"}>
				{profile.phase.name}
			</h2>

			{ profile.phase.level < 5 &&
				<div>
					<p style={{margin: 0, color: "gray"}}>next phase: <span className="text-primary">{nextLevel.name}</span></p>
					<p style={{margin: 0, color: "gray"}}>words to go: <span className="text-primary">{nextLevel.words - profile.wordsCount}</span> </p>
					<Badge color="primary" pill>{nextLevel.prize}</Badge>
				</div>
			}

			<hr />
			<Row>
				<Col xs={6} style={{ borderRight: "1px solid lightgray" }}>
					<p>Words</p>
					<h4 className="text-primary">{profile.wordsCount}</h4>
				</Col>
				<Col xs={6} style={{ borderRight: "1px solid lightgray" }}>
					<p>Phrases</p>
					<h4 className="text-primary">{profile.phrasesCount}</h4>
				</Col>
			</Row>
		</div>
	)
}
