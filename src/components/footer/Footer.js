import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import FooterIcon from './FooterIcon';
import SettingsModal from './settings/SettingsModal';
import HelpModal from './help/HelpModal';
import LoginButton from './LoginButton';

export default class Footer extends Component {

	state = {
		showHelpModal: false,
		showSettingsModal: false,
		activeHelpTab: "1",
		dropDownOpen: false,
	}

	toggleDropDown = () => {
		this.setState(prevState => ({
			dropDownOpen: !prevState.dropDownOpen
		}));
	}

	toggleHelpModal = () => {
		this.setState(prevState => ({
			showHelpModal: !prevState.showHelpModal
		}), () => {
			if (!this.state.showModal) {
				this.setState({
					activeHelpTab: "1",
				})
			}
		})
	}

	toggleSettingsModal = () => {
		this.setState(prevState => ({
			showSettingsModal: !prevState.showSettingsModal
		}));
		if (this.props.profile.id) {
			this.props.updateSettings(this.props.profile.id, {enteredPin: false})
		}
		
	}

	toggleHelpTabs = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeHelpTab: tab
			});
		}
	}


	render() {
		const {
			handleNightMode, nightMode,
			login, logout, deleteUserAccount,
			toggleConversation, showConversation,
			handleBabyChet, toggleBabyChetMode,
			values, profile, fetchPhrases,
		} = this.props;

		const { babyChetName} = profile;
		const { showHelpModal, activeHelpTab } = this.state;

		return (
			<div
				style={{
					position: "fixed",
					bottom: 0,
					height: 55 + "px",
					width: 100 + "%",
					padding: 10 + "px",
					color: nightMode ? "black" : "white",
				}}
				className={nightMode ? "bg-black" : "bg-white"}
			>
				<div style={{ paddingTop: 8 + "px" }}>
					<Row className="text-center">

						<Col
							xs={{ size: 3, offset: 0 }}
							md={{ size: 1, offset: 4 }}
						>
							{!profile.uid &&
								<LoginButton
									profile={profile}
									login={login}
									fetchPhrases={fetchPhrases}
									handleBabyChet={handleBabyChet}
									toggleBabyChetMode={toggleBabyChetMode}
									loggingIn={profile.loggingIn}
								/>
							}
							{ profile.uid &&
							<i className={`fa fa-2x fa-cog ${this.state.showSettingsModal ? "text-warning" : ""}`}
								onClick={this.toggleSettingsModal} style={{ cursor: "pointer", color: "gray" }} />
							}
							{ // db.uid  && values && this.props.db &&
								this.state.showSettingsModal &&

								<SettingsModal
									profile={profile}
									dbName={babyChetName}
									values={values}
									fetchPhrases={this.props.fetchPhrases}
									handleBabyChet={handleBabyChet}
									toggleBabyChetMode={this.props.toggleBabyChetMode}
									wipeBabyChetsMind={this.props.wipeBabyChetsMind}
									show={this.state.showSettingsModal}
									toggleSettingsModal={this.toggleSettingsModal}
									logout={logout}
									deleteUserAccount={deleteUserAccount}
									updateSettings={this.props.updateSettings}
								/>
							}
						</Col>
						<Col xs={3} md={1}>
							<FooterIcon
								type="tasks"
								condition={showConversation}
								onClick={toggleConversation}
							/>
						</Col>

						<Col xs={3} md={1} id="google">
							<FooterIcon
								type="moon-o"
								condition={nightMode}
								onClick={() => handleNightMode(nightMode)}
							/>
						</Col>

						<Col xs={3} md={1}>
							<FooterIcon
								type="question-circle-o"
								condition={showHelpModal}
								onClick={this.toggleHelpModal}
							/>
							<HelpModal
								showHelpModal={showHelpModal}
								toggleHelpModal={this.toggleHelpModal}
								activeHelpTab={activeHelpTab}
								toggleHelpTabs={this.toggleHelpTabs}
							/>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

