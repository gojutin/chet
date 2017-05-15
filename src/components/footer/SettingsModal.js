import React, { Component } from 'react';

import { Input, Button, Modal, ModalBody, ModalFooter, Col } from 'reactstrap';
import ColorIcon from './ColorIcon';

export default class SettingsModal extends Component {

	state = {
		showModal: false,
		name: "",
		color: "",
		showConfirmWipe: false,
		showValues: false,
	}

	componentDidMount() {
		this.setState({
			name: this.props.dbName,
		})
	}

	toggleConfirmWipe = () => {
		this.setState(prevState => ({
      	showConfirmWipe: !prevState.showConfirmWipe
    	}))
	}

	handleWipe = () => {
		this.setState(prevState => ({
      	showConfirmWipe: !prevState.showConfirmWipe,
				name: this.props.dbName,
				color: this.props.dbColor,
    }));
		this.props.handleWipeBabyChetsMind();
	}

	toggleModal = () => {
		const { dbColor, dbName } = this.props;
		if (!this.state.showModal) {
			this.setState(prevState => ({
      	showModal: !prevState.showModal,
				name: dbName ? dbName : "",
				color: dbColor ? dbColor : "",
				showConfirmWipe: false,
    	}))
		} else {
			this.setState(prevState => ({
      	showModal: !prevState.showModal
    	}))
		}
    
  }

	handleChange = (e) => {
		this.setState({
			name: e.target.value,
		})
	}

	handleColor = (color) => {
		this.setState({
			color,
		})
	}

	handleSubmit = () => {
		const { name, color } = this.state;
		this.props.handleSubmit(name, color);
		this.toggleModal();
	}

	render() {
		const { showModal, name, color, showConfirmWipe} = this.state;
		const { dbName, values, conversations } = this.props;
		const colors = [
			"#ffbb33", "#d9534f", "#5bc0de", "#5cb85c", 
			"#428bca", "#aa36d8", "#d836a7", "#3E4551", "#ef6c00",
		];

		const colorIcons = colors.map(color => 
			<ColorIcon 
				key={color}
				color={color}
				selectedColor={this.state.color}
				dbColor={this.props.dbColor}
				onClick={this.handleColor}
			/>
		)

		return (
			<div style={{display: "inline"}}>
				<i className="fa fa-cog fa-2x" onClick={this.toggleModal} style={{ color: "gray", cursor: "pointer" }} />
				<Modal isOpen={showModal} className="text-center modal-shadow" >
					<ModalBody style={{fontFamily: "Comfortaa, monospace"}}>
						<h4>My chatbot's name:</h4>
						<Input size="lg" type="text" value={name} onChange={this.handleChange} style={{color: color ?  color: this.props.dbColor, fontSize: 1.6 + "em"}} />
						<br />
						<h4>My chatbot's color:</h4>

						{colorIcons}
						<hr />
						<p>{dbName} knows {values.length} phrase{values.length !== 1 && "s"}. </p>
						<p>{dbName} has had {conversations.length < 2 ? 0 : conversations.length - 1} previous conversation{conversations.length !== 2 && "s"}.
						</p>
						{/*{ values.map(({term}) => 
							<p>{term}</p>
							)
						}*/}

					</ModalBody>

					<ModalFooter>
						
						<Col xs={6}>
						<Button
								color="danger"
								onClick={this.toggleModal}
								style={{ cursor: "pointer", width: 80 + "%" }}
							>
								Cancel
						</Button>
						</Col>
						<Col xs={6}>
							<Button
								color="success"
								onClick={this.handleSubmit}
								style={{ cursor: "pointer", width: 80 + "%" }}
							>
								Save
						</Button>
						</Col>						
					</ModalFooter>
						{ values.length > 0 && 
							<p 
								style={{
									marginTop: 15 + "px", 
									textDecoration: "underline",
									cursor: "pointer"
								}}
								className={`${!showConfirmWipe ? "text-danger" : ""}`}
								onClick={this.toggleConfirmWipe}
							>
								{!showConfirmWipe ? `Wipe ${dbName}'s mind` : `Nevermind` }
							</p>
						}
					
					
						{ showConfirmWipe &&
							<div>
								<p> Are you sure you want to wipe {dbName}'s mind? This action cannot be undone.</p>
								<Button 
									color="danger"
									onClick={this.handleWipe}
									style={{cursor: "pointer", marginBottom: 10 + "px"}}
								>
									Wipe {dbName}'s mind
								</Button>
							</div>
						}
				</Modal>
		</div>
		)
	}
}