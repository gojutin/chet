import React from 'react';
import { Row, Col } from 'reactstrap';
import Loader from 'react-dots-loader';
import StatsModal from './StatsModal';
import { StyleSheet, css } from 'aphrodite';

export default ({ message, children, type, name, response  }) => {

	const styles = StyleSheet.create({
		bubble: {
			color: type === "user" ? "black" : "white",
			textAlign: 'left',
			fontSize: '1.1em',
			position: 'relative',
			borderRadius: '1em',
			margin: '10px',
			padding: '0px',
			paddingLeft: '10px',
			paddingRight: '10px',
			paddingBottom: '.5px',
			width: '85%',
			background: (type === "chet" || type === "response") 
				? 'rgb(49, 165, 49)' 
				: '#e8e8e8' ,
			':after': {
				content: '""',
				position: 'absolute',					
				top: 50 + '%',
				width: 0,
				height: 0,
				border: '11px solid transparent',
				borderTop: 0,
				marginTop: -5.5 + 'px',
				// chet
				left: (type === "chet" || type === "response") && 0,
				borderRightColor: (type === "chet" || type === "response") && 'rgb(49, 165, 49)',
				borderLeft: (type === "chet" || type === "response") && 0,
				marginLeft: (type === "chet" || type === "response") && -11 + 'px',
				// user
				right: type === "user" && 0,
				borderLeftColor: type === "user" && '#e8e8e8',
				borderRight: type === "user" && 0,
				marginRight: type === "user" && -11 + 'px',
			}
		},
		text: {
			margin: 5,
			padding: 8,
		}
	});

	return (
		<div className={`${type === "user" ? 'pull-right': ""} ${css(styles.bubble)}`}>

			{response && !response.delay && type === "response" &&
				<div style={{padding: 14 + "px"}}>
					<Loader size={8} color="green" />
				</div>
			}

			{type !== "response" &&
				<Row>
					<Col xs={12}>
						<p className={css(styles.text)}> {message} </p>
					</Col>
				</Row>
			}

			{response && response.delay && type === "response" &&
				<Row>
					<Col xs={10}>
						<p className={css(styles.text)}> {message} </p>
					</Col>
						<Col xs={2}>
							<StatsModal name={name} response={response} />
						</Col>
				</Row>
			}
		</div>
	)
}


