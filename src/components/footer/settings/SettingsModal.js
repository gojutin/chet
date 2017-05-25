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
		showConfirmWipe: false,
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
			this.handleSubmit();
		})
	}

	toggleConfirmWipe = () => {
		this.setState(prevState => ({
      	showConfirmWipe: !prevState.showConfirmWipe
    	}))
	}

	handleWipe = () => {
		const { profile, wipeBabyChetsMind } = this.props;
		const { babyChetPhrasesId, babyChetChatId, uid } = profile;
		this.setState(prevState => ({
      	showConfirmWipe: !prevState.showConfirmWipe,
    }));
		wipeBabyChetsMind(babyChetPhrasesId, babyChetChatId, uid);
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
			this.handleSubmit();
		})
	}


	handleBabyChetMode = () => {
		const { profile } = this.props;
		const  { babyChetMode, babyChetPhrasesId } = profile;
		return new Promise ((resolve, reject) => {
			this.props.toggleBabyChetMode( babyChetMode, babyChetPhrasesId ).then((dbRef) => {
				this.props.fetchPhrases(dbRef);
				this.props.toggleSettingsModal()
				resolve();
			})
		})
	}

	// 1 second delay after typing before it saves to the database
	handleSubmit = (color) => {
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
		if (this.state.activeTab === "3") {
			this.props.updateSettings(this.props.profile.id, {enteredPin: false})
		}
  }

	handleLogout = () => {
		this.props.logout().then(() => {
			this.props.toggleSettingsModal()
			this.props.fetchPhrases("values")

		})
		
	}

	render() {

		const { babyChetName, showConfirmWipe, activeTab } = this.state;
		const { dbName, values, deleteUserAccount, show, toggleSettingsModal, profile} = this.props;
		const { babyChetMode, babyChetColor } = this.props.profile;
		const colors = [
			"#f44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#03A9F4", "#00BCD4", 
			"#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B",
		];

		const colorIcons = colors.map(color => 
			<ColorIcon 
				key={color}
				color={color}
				dbColor={babyChetColor}
				onClick={() => this.handleSubmit(color)}
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
								{ profile.babyChetMode &&
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
									src={profile.user.photo}
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
					<div>
						<h4 style={{marginTop: 10 + "px"}}>My chatbot's name:</h4>
							{ !profile.allowEditProfile && 
								<h4 style={{color: profile.babyChetColor}}> {babyChetName} </h4>
							}

							{ profile.allowEditProfile && 
									<div>
										<Input 
											type="text" 
											value={babyChetName} 
											onChange={this.handleChange} 
											style={{ fontSize: 1.5 + "em", color: profile.babyChetColor,}} 
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
									</div>
							}

						{ profile.allowWipe && values.length > 0  &&
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
									{dbName} has learned {profile.wordCount} words and {values.length} phrases.
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
							 {  profile.allowChet && 
								<Col xs={12} md={{size: 6, offset: profile.allowLogout ? 0 : 3}}>
									<Button
											block
											size="lg"
											onClick={this.handleBabyChetMode}
											style={{ cursor: "pointer", marginTop: 10 + "px"}}
											className="text-center"
										>
											Switch
									</Button>
								</Col>
								}
								{ profile.allowLogout && 
									<Col xs={12} md={{size: 6, offset: profile.allowChet ? 0 : 3}}>
										<Button
											block
											size="lg"
											onClick={this.handleLogout}
											style={{ cursor: "pointer", marginTop: 10 + "px"}}
											className="text-center"
										>
											Logout
										</Button>
									</Col>
								}
							</Row>
						

						</div>
						
						</TabPane>
					</TabContent>
					<TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="2">

							{ profile.babyChetMode &&
								<div >
									<br />
									<div style={{color: babyChetColor}}>
											<i 
												className={`fa fa-child ${profile.phase ? profile.phase.size: "" }`}
											/>
											<p>{profile.name}</p>
									</div>
											<Progress 
												animated 
												color="success" 
												value={profile.growthPercentage} 
												style={{marginTop: 5 + "px"}}
											/>
										  <Milestones phase={profile.phase ? profile.phase.phase : ""} />
								</div>	
							}
						<hr />	
						<Row>
							<Col xs={4} style={{borderRight: "1px solid lightgray"}}>
								<p>Words</p>
								<h4 className="text-primary">{profile.wordCount}</h4>
							</Col>
							<Col xs={4} style={{borderRight: "1px solid lightgray"}}>
								<p>Phrases</p>
								<h4 className="text-primary">{values.length}</h4>
							</Col>
							<Col xs={4}>
								<p>Chats</p>
								<h4 className="text-primary">{profile.chatCount}</h4>
							</Col>
							</Row>
							</TabPane>
					</TabContent>
					<TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="3">
								<UserSettings
									updateSettings={this.props.updateSettings}
									profile={profile}
									deleteUserAccount={deleteUserAccount}
									toggleBabyChetMode={this.props.toggleBabyChetMode}
									fetchPhrases={this.props.fetchPhrases}
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