import React, { Component } from 'react';
import {  Col, Row } from 'reactstrap';
import 'react-toggle/style.css';
import Toggle from 'react-toggle';

import Pin from './Pin';
import Setting from './Setting';
import { fadeIn } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  fadeIn: {
    animationName: fadeIn,
    animationDuration: '1.0s'
  },
});

export default class UserSettings extends Component {
  
  state = {
    allowChet: true,
    allowLogout: true,
    allowEditProfile: true,
  }

  componentDidMount() {
    const { profile } = this.props;
    this.setState({
      allowChet: profile.allowChet,
      allowLogout: profile.allowLogout,
      allowEditProfile: profile.allowEditProfile,
    })
  }

  handlePinReset = () => {
    const { profile, updateSettings } = this.props;
    updateSettings(profile.id, {pin: "", enteredPin: false});
  }

  handleSettingsToggle = (e, option) => {
    const { updateSettings, profile, toggleBabyChetMode, fetchPhrases } = this.props;
    const stateName = option.id;
    if (stateName === "allowChet" && profile.allowChet && !profile.babyChetMode) {
      toggleBabyChetMode(profile.babyChetMode)
      fetchPhrases(profile.babyChetPhrasesId, profile.babyChetChatId)
    }
    this.setState(prevState => ({
      [`${stateName}`]: !prevState[`${stateName}`]
    }), _ => {
      if (profile.id) {
        updateSettings(profile.id,{[`${stateName}`]: this.state[`${stateName}`]});
      }
    })
  }

  handleDelete = () => {
    const { profile } = this.props;
    this.props.deleteUserAccount(profile.id)
      // updateSettings(profile.id, {pin: ""})
  }

	handleWipe = () => {
		const { profile, wipeBabyChetsMind } = this.props;
		const { babyChetPhrasesId, babyChetChatId, uid } = profile;
		wipeBabyChetsMind(babyChetPhrasesId, babyChetChatId, uid);

    
	}

  render () {
    const { profile, updateSettings, phrases } = this.props;
    const { allowChet, allowLogout, allowEditProfile } = this.state;
    const settingsOptions = [
      { name: "Allow user to talk to Chet", id: "allowChet", value: allowChet },
      { name: "Allow user to edit your chatbot's info", id: "allowEditProfile", value: allowEditProfile },
      { name: "Allow user to logout (returns to Chet)", id: "allowLogout", value: allowLogout },
    ]

    return (
      <div>
        <br />
         { !profile.enteredPin && this.props.activeTab === "2" &&
          <div className={css(styles.fadeIn)}>
            { !profile.pin &&
              <p>Create a pin to get started</p>
            }
            { profile.pin &&
              <p>Please enter your pin</p>
            }
            <Pin profile={profile} updateSettings={updateSettings} /> 
          </div> 

         }
        { profile.enteredPin &&
          <div className={css(styles.fadeIn)}>
          <p 
            className="text-warning"
            style={{textDecoration: "underline", cursor: "pointer"}}
            onClick={() => updateSettings(this.props.profile.id, {enteredPin: false})}
          >
            close
          </p>
          { settingsOptions.map(option => 
            <Row key={option.id}>
              <Col xs={12}>
                <p className="text-center">{option.name}</p>
                <Toggle
                  checked={this.state[option.id]}
                  value={option.name}
                  onChange={(e) => this.handleSettingsToggle(e,option)}
                />
                <hr />
              </Col>
            </Row>
          )}
          <Setting 
            condition={(profile.enteredPin)}
            onClick={this.handleDelete}
            title="Delete my account"
            userEmail={profile.user.email}
          />
          <Setting 
            condition={(profile.enteredPin && phrases.length > 0)}
            onClick={this.handleWipe}
            title="Wipe my chatbot's mind"
            userEmail={profile.user.email}
            babyChetColor={profile.babyChetColor}
          />    
          </div>
        }
        <Setting 
          condition={profile.pin}
          onClick={this.handlePinReset}
          title="Reset my pin"
          userEmail={profile.user.email}
        />
      </div>
        
    );
  }
}