import React, { Component } from 'react';
 
import { Input, Button, Modal, ModalBody, Col, Row, Progress, TabContent, TabPane, Nav } from 'reactstrap';
import ColorIcon from './ColorIcon';
import generateName from 'sillyname';


// components
import SettingsTab from './SettingsTab';
import Milestones from './Milestones';
import UserSettings from './UserSettings';

export default class SettingsModal extends Component {

	state = {
		showModal: false,
		name: "",
		color: "",
		showConfirmWipe: false,
		activeTab: "1",
		sleepMode: false,
		showSave: false,
	}

	componentDidMount() {
		const { dbName, dbColor } = this.props;
		this.handleSleepMode()
		.then(() => {
			this.setState({
				name: dbName ? dbName : "",
				color: dbColor ? dbColor : "",
			})
		})
	}

	sillyname = () => {
		const name = generateName();
		this.setState({
			name,
			showSave: true,
		}, () => {
			this.handleSubmit();
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
    }));
		this.props.handleWipeBabyChetsMind();
	}

	toggleModal = () => {
		const { dbColor, dbName, babyChetMode } = this.props;

		this.props.saveSettings(this.props.db.id, {enteredPin: false});

		this.setState({
			activeTab: "1",
		})
		if (babyChetMode) {
			this.setState(prevState => ({
				showModal: !prevState.showModal,
				name: dbName ? dbName : "",
				color: dbColor ? dbColor : "",
				showSave: false,
			}))
		} else if (!this.state.sleepMode && !babyChetMode) {
			this.setState(prevState => ({
				showModal: !prevState.showModal
			}))	
			this.handleSleepMode();
		} else {
			this.setState(prevState => ({
				showModal: !prevState.showModal
			}))	
		}  
  }

	handleChange = (e) => {
		this.setState({
			name: e.target.value,
			showSave: true,
		}, () => {
			this.handleSubmit();
		})
	}

	handleSleepMode = () => {
		return new Promise ((resolve, reject) => {
				if (this.props.babyChetMode) {
					this.setState({
							showModal: false,
					});
				}
				this.props.handleBabyChet();

				resolve();
		})
		
	}

	handleColor = (color) => {
		this.setState({
			color,
			showSave: true,
		}, () => {
			this.handleSubmit();
		})
	}

	// 1 second delay after typing before it saves to the database
	handleSubmit = () => {
		let timeoutId;
		const { name, color } = this.state;
		clearTimeout(timeoutId);
    timeoutId = setTimeout(() => { 
      this.props.handleSubmit(name, color);
			console.log("saved")
    }, 1000);
		
	}

	  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
		if (this.state.activeTab === "3") {
			this.props.saveSettings(this.props.db.id, {enteredPin: false})
		}
  }

	handleLogout = () => {
		this.props.logout().then(() => {
			this.props.handleBabyChet();
		});
	}
	render() {

		const { showModal, name, showConfirmWipe, color, activeTab, showSave } = this.state;
		const { dbName, values, babyChetMode, db} = this.props;
		const colors = [
			"#f44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#03A9F4", "#00BCD4", 
			"#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", 
			"#795548", "#9E9E9E", "#607D8B",
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
				
				<i className={`fa fa-2x fa-child ${babyChetMode ? "text-warning" : ""}`}
				onClick={this.toggleModal} style={{ cursor: "pointer", color: "gray" }} />

				<Modal 
					isOpen={showModal} 
					className="text-center modal-shadow" 
					toggle={this.toggleModal} 
				>
					<ModalBody 
						style={{
							fontFamily: "Comfortaa, monospace", 
							maxHeight: 80 + "vh"
						}}
						className="scroll"
					>
						<i 
							className={`fa pull-right ${showSave ? "fa-check-square-o text-success": "fa-times text-danger"}`}
							style={{
								cursor: "pointer",
								fontSize: 1.3 + "em"
							}}
							onClick={this.toggleModal}
						/>

						  <Nav tabs style={{ cursor: "pointer"}}>
	
                <SettingsTab 
                  toggleTab={this.toggle}
                  tabNumber="1"
                  activeTab={activeTab}
                >
                  <i className="fa fa-cog fa-2x" />
                </SettingsTab>
								{ babyChetMode &&
                <SettingsTab 
                  toggleTab={this.toggle}
                  tabNumber="2"
                  activeTab={activeTab}
                >
                  <i className="fa fa-info-circle fa-2x" />
                </SettingsTab>
								}	
								<SettingsTab
									toggleTab={this.toggle}
                  tabNumber="3"
                  activeTab={activeTab}
								>
								<img
									src={db.photo}
									alt="Profile pic"
									height={30}
									style={{
										borderRadius: 50 + "%",
									}}
								/>	
								</SettingsTab>	
            </Nav>
						
						
						<TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
									<br />
									
						{ babyChetMode &&
										<div>
						<h4 style={{marginTop: 10 + "px"}}>My chatbot's name:</h4>

								<Input 
									type="text" 
									value={name} 
									onChange={this.handleChange} 
									style={{ fontSize: 1.5 + "em", color,}} 
								/>

								<i 
									className="fa fa-random text-warning" 
									style={{cursor: "pointer", margin: 15 + "px"}} 
									onClick={this.sillyname}
								/>

						<br />
						<h4>My chatbot's color:</h4>
						<Col xs={12} md={{size: 10, offset: 1}} >
							{colorIcons}
						</Col>

						{ (db.allowWipe === undefined || db.allowWipe) && values.length > 0  &&
							<p 
								style={{
									marginTop: 15 + "px", 
									textDecoration: "underline",
									cursor: "pointer",
									padding: 5 + "px"
								}}
								className={`${!showConfirmWipe ? "text-danger" : ""}`}
								onClick={this.toggleConfirmWipe}
							>
								{!showConfirmWipe ? `Wipe my chatbot's mind` : `Nevermind` }
							</p>
						}
						
					
					<div style={{marginTop: 10 + "px"}}>
						{ showConfirmWipe &&
							<div>
								<p>
									{dbName} has learned {db.wordCount} words and {values.length} phrases.
								</p>
								<p> Are you sure you want to wipe {dbName}'s mind? This action cannot be undone.</p>
								<Button 
								  size="lg"
									color="danger"
									onClick={this.handleWipe}
									style={{cursor: "pointer", marginBottom: 10 + "px"}}
								>
									Wipe my chatbot's mind
								</Button>
							</div>
						}
						</div>
						
							<Row>
							 { (db.allowChet === undefined || db.allowChet) && 
								<Col xs={12} md={{size: 6, offset: this.props.db.allowLogout ? 0 : 3}}>
									<Button
											block
											size="lg"
											onClick={this.handleSleepMode}
											style={{ cursor: "pointer", marginTop: 10 + "px"}}
											className="text-center"
										>
											Switch to Chet
									</Button>
								</Col>
								}
								{ this.props.db.allowLogout && 
									<Col xs={12} md={{size: 6, offset: this.props.db.allowChet ? 0 : 3}}>
										<Button
											block
											size="lg"
											onClick={this.props.logout}
											style={{ cursor: "pointer", marginTop: 10 + "px"}}
											className="text-center"
										>
											Logout
										</Button>
									</Col>
								}
							</Row>
						

						</div>
						}
						</TabPane>
					</TabContent>
					<TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="2">

							{ !!db.phrasesCount && db.phase &&
								<div >
									<br />
									<div style={{color}}>
											<i 
												className={`fa fa-child ${db.phase.size}`}
											/>
											<p>{db.name}</p>
									</div>
											<Progress 
												animated 
												color="success" 
												value={db.growthPercentage} 
												style={{marginTop: 5 + "px"}}
											/>
										  <Milestones phase={db.phase ? db.phase.phase : ""} />
								</div>	
							}
						<hr />	
						<Row>
							<Col xs={4} style={{borderRight: "1px solid lightgray"}}>
								<p>Words</p>
								<h4 className="text-primary">{db.wordCount}</h4>
							</Col>
							<Col xs={4} style={{borderRight: "1px solid lightgray"}}>
								<p>Phrases</p>
								<h4 className="text-primary">{values.length}</h4>
							</Col>
							<Col xs={4}>
								<p>Chats</p>
								<h4 className="text-primary">{db.conversationCount}</h4>
							</Col>
							</Row>
							</TabPane>
					</TabContent>
					<TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="3">
								<UserSettings
									logout={this.handleLogout}
									saveSettings={this.props.saveSettings}
									db={db}
								/>								
						</TabPane>
					</TabContent>
				</ModalBody>
			</Modal>
		</div>
		)
	}
}