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
		babyChetName: "",
		activeTab: "1",
		sleepMode: false,
	}

	componentDidMount() {
		this.setState({
			babyChetName: this.props.profile.babyChetName
		})
	}

	sillyname = () => {
		const babyChetName = generateName();
		this.setState({
			babyChetName,
		}, () => {
			this.handleUpdateSettings();
		})
	}

	componentWillUnMount() {
		if (this.props.profile.id) {
			this.props.updateSettings(this.props.profile.id, {enteredPin: false});
		}
		this.setState({
			activeTab: "1",
		})
	}

	handleChange = (e) => {
		this.setState({
			babyChetName: e.target.value,
		}, () => {
			this.handleUpdateSettings();
		})
	}


	handleBabyChetMode = () => {
		const { profile } = this.props;
		const  { babyChetMode, babyChetPhrasesId } = profile;
		return new Promise ((resolve, reject) => {
			this.props.toggleBabyChetMode( babyChetMode, babyChetPhrasesId ).then((dbRef) => {
				this.props.fetchPhrases(dbRef, profile.babyChetChatId);
				this.props.toggleSettingsModal()
				resolve();
			})
		})
	}

	// 1 second delay after typing before it saves to the database
	handleUpdateSettings = (color) => {
		const { profile, updateSettings } = this.props;
		let timeoutId;
		clearTimeout(timeoutId);
		const { babyChetName } = this.state;
		if (color) {
			updateSettings(profile.id, {babyChetName, babyChetColor: color});
		} else {
			timeoutId = setTimeout(() => { 
				let babyChetColor = color ? color : profile.babyChetColor;
      	updateSettings(profile.id, {babyChetName, babyChetColor});
    	}, 1000);
		}		
	}

	toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
		if (this.state.activeTab === "2") {
			this.props.updateSettings(this.props.profile.id, {enteredPin: false})
		}
  }

	handleLogout = () => {
		this.props.logout().then(() => {
			this.props.toggleSettingsModal();
			this.props.fetchPhrases("values");
		})
		
	}

	render() {

		const { babyChetName, activeTab } = this.state;
		const { dbName, phrases, deleteUserAccount, show, toggleSettingsModal, profile} = this.props;
		const { babyChetColor } = this.props.profile;
		const colors = [
			"#f44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#03A9F4", "#00BCD4", 
			"#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B",
		];

		const colorIcons = colors.map(color => 
			<ColorIcon 
				key={color}
				color={color}
				dbColor={babyChetColor}
				handleUpdateSettings={() => this.handleUpdateSettings(color)}
			/>
		)

		return (
			<div style={{display: "inline"}}>
				{ profile.id && 
				<Modal 
					isOpen={show} 
					className="text-center modal-shadow" 
					toggle={toggleSettingsModal} 
				>
					<ModalBody 
						style={{
							fontFamily: "Comfortaa, monospace", 
							maxHeight: 80 + "vh"
						}}
						className="scroll"
					>
						<i 
							className={`fa pull-right fa-times text-danger`}
							style={{
								cursor: "pointer",
								fontSize: 1.3 + "em"
							}}
							onClick={toggleSettingsModal}
						/>

						  <Nav tabs style={{ cursor: "pointer"}}>
	
                <SettingsTab 
                  toggleTab={this.toggle}
                  tabNumber="1"
                  activeTab={activeTab}
                >
                  <i className="fa fa-cog fa-2x" />
                </SettingsTab>
								
								<SettingsTab
									toggleTab={this.toggle}
                  tabNumber="2"
                  activeTab={activeTab}
								>
								<div>
								<img
									src={profile.user.photo}
									alt="Profile pic"
									height={34}
									style={{
										borderRadius: 50 + "%",
										margin: 0,
									}}
								/>	
								</div>
								</SettingsTab>	
								{ profile.babyChetMode &&
									<SettingsTab 
										toggleTab={this.toggle}
										tabNumber="3"
										activeTab={activeTab}
									>
										<i className="fa fa-info-circle fa-2x" />
									</SettingsTab>
								}
								{ (profile.allowLogout || profile.enteredPin) &&
                  <Button 
										color="primary"

										style={{cursor: "pointer", border: "none", height: 80 + "%", margin: 3 + "px", marginTop: 8 + "px"}} 
										onClick={this.handleLogout}
										aria-label="Logout button"
									>
										Logout
									</Button>
								}
               
            </Nav>
						
						
						<TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
					<div>
						<p style={{marginTop: 15 + "px"}}>My chatbot's name</p>
							{ !profile.allowEditProfile && 
								<h4 style={{color: profile.babyChetColor}}> {babyChetName} </h4>
							}

							{ profile.allowEditProfile && 
									<div>
										<Row>
											<label style={{display: "none"}}>Your chatbots name</label>
											<Input 
												type="text" 
												value={babyChetName} 
												onChange={this.handleChange} 
												style={{ width: 90 + "%", fontSize: 1.5 + "em", color: profile.babyChetColor, marginLeft: 8 + "px"}} 
											/>

											<i 
												className="fa fa-random text-warning pull-right" 
												style={{cursor: "pointer", paddingLeft: 5 + "px", paddingTop: 15 + "px"}} 
												onClick={this.sillyname}
											/>
											
										</Row>
										<br />
										<p>My chatbot's color</p>
										<Col xs={12} md={{size: 10, offset: 1}} >
											{colorIcons}
										</Col>
									</div>
							}
							<hr />
						
							<Row>
								
							 {  profile.allowChet && 
								<Col xs={12} onClick={this.handleBabyChetMode} style={{cursor: "pointer"}} >
								{/*<p 
									className="text-center" 
									style={{marginBottom: 0}}
								>
									Switch to {profile.babyChetMode ? "Chet" : profile.babyChetName}
								</p>*/}
								<div 
									style={{cursor: "pointer"}}
								>
								<p style={{marginBottom: 0}}>Switch</p>
								{ profile.babyChetMode 
										? <img 
												src="chet_logo-min.png" 
												alt="Chet logo"
												height={75}  
											/>
										: 

											<i 
												className="fa fa-child fa-4x" 
												style={{color: profile.babyChetColor }} 
											/>

								}
									</div>									
								</Col>
								}
							</Row>
						</div>
						
						</TabPane>
					</TabContent>
					<TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="3">


								<div >
									{/*<div style={{color: babyChetColor}}>
											<i 
												className={`fa fa-child ${profile.phase ? profile.phase.size: "" }`}
												style={{zIndex: 5000}}
											/>

											<p>{profile.name}</p>
									</div>*/}
										
										  <Milestones 
												level={profile.phase ? profile.phase.level : ""} 
											/>
												<Progress 
												animated 
												color="success" 
												value={profile.growthPercentage} 
												style={{marginTop: 5 + "px"}}
											/>
								</div>	

						<hr />	
						<Row>
							<Col xs={4} style={{borderRight: "1px solid lightgray"}}>
								<p>Words</p>
								<h4 className="text-primary">{profile.wordsCount}</h4>
							</Col>
							<Col xs={4} style={{borderRight: "1px solid lightgray"}}>
								<p>Phrases</p>
								<h4 className="text-primary">{phrases.length}</h4>
							</Col>
							<Col xs={4}>
								<p>Chats</p>
								<h4 className="text-primary">{profile.chatCount}</h4>
							</Col>
							</Row>
							</TabPane>
					</TabContent>
					<TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="2">
								<UserSettings
									updateSettings={this.props.updateSettings}
									profile={profile}
									phrases={phrases}
									handleLogout={this.handleLogout}
									deleteUserAccount={deleteUserAccount}
									wipeBabyChetsMind={this.props.wipeBabyChetsMind}
									toggleBabyChetMode={this.props.toggleBabyChetMode}
									fetchPhrases={this.props.fetchPhrases}
									dbName={dbName}
									activeTab={this.state.activeTab}
								/>								
						</TabPane>
					</TabContent>
				</ModalBody>
			</Modal>
			}
		</div>
		)
	}
}