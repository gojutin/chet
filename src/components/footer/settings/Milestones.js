import React from 'react';
import { Col, Row, Progress, Badge } from 'reactstrap';

const Trophy = ({phase, profile}) => {

	const getColor = () => {
		if (phase.level === profile.phase.level) {
			return "#00C851";
		} else if (phase.level === profile.phase.level) {
			return "#ffbb33";
		} else {
			return "lightgray"
		}
	}
	return (
		<i 
			className={`fa fa-trophy`} 
			style={{
				color: getColor(),
				margin: 10 + "px",
				fontSize: phase.level + "em"
			}} 
		/>
	)
}




export default ({ profile }) => {
	const phases = [
		{level: 1, name: "baby bot", words: 0},
		{level: 2, name: "tot bot", words: 200},
		{level: 3, name: "kid bot", words: 2000},
		{level: 4, name: "teen bot", words: 3000},
		{level: 5, name: "full grown bot", words: 20000},
	];

	const nextLevel = phases.filter(phase => 
		phase.level === profile.phase.level + 1)[0]
	
	

	return (
		<div style={{marginTop: 15 + "px"}}>
			<Progress
				animated
				color="success"
				value={profile.growthPercentage > 3 ? profile.growthPercentage : 3}
				style={{ marginTop: 5 + "px" }}
			/>

			{ phases.map(phase => 
				<Trophy key={phase.level} phase={phase} profile={profile} />
				)
			}

			<h3 className="text-success">{profile.phase.name}</h3>


					<p style={{margin: 0, color: "gray"}}>next phase: <span className="text-primary">{nextLevel.name}</span></p>
					<p style={{margin: 0, color: "gray"}}>words to go: <span className="text-primary">{nextLevel.words - profile.wordsCount}</span> </p>
					<Badge color="success">new colors!</Badge>
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







