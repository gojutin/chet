import React, { Component } from 'react';
import {  Col, Row, Label, Input, Button } from 'reactstrap';
import 'react-toggle/style.css';
import Toggle from 'react-toggle';

import Pin from './Pin';

export default class UserSettings extends Component {
  
  state = {
    allowChet: true,
    allowWipe: true,
    allowLogout: true,
    allowEditProfile: true,
    emailAddress: "",
    showResetForm: false,
  }

  componentDidMount() {
    const { profile } = this.props;
    this.setState({
      allowChet: profile.allowChet,
      allowWipe: profile.allowWipe,
      allowLogout: profile.allowLogout,
      allowDeleteAccount: profile.allowDeleteAccount,
      allowEditProfile: profile.allowEditProfile,
    })
  }


  handleEmailAddress = (e) => {
    const emailAddress = e.target.value;
    this.setState({
      emailAddress,
    })
  }

  handlePinReset = () => {
    const { profile, saveSettings } = this.props;
    const { emailAddress } = this.state;
    if (emailAddress !== profile.email) {
      this.setState({
        error: "Sorry but this is not the correct email address. Please try again."
      })
    } else {
      saveSettings(profile.id, {pin: ""})
      this.setState({
        showResetForm: false,
        emailAddress: "",
        error: ""
      })
    }
  }

  handleSettingsToggle = (e, option) => {
    const { updateSettings, profile, toggleBabyChetMode, fetchPhrases } = this.props;
    const stateName = option.id;
    if (stateName === "allowChet" && profile.allowChet && !profile.babyChetMode) {
      toggleBabyChetMode(profile.babyChetMode)
      fetchPhrases(profile.babyChetPhrasesId)
    }
    this.setState(prevState => ({
      [`${stateName}`]: !prevState[`${stateName}`]
    }), _ => {
      if (profile.id) {
        updateSettings(profile.id,{[`${stateName}`]: this.state[`${stateName}`]});
      }
    })
  }

  render () {
    const { deleteUserAccount, profile, updateSettings } = this.props;
    const { allowChet, allowWipe, allowLogout, allowEditProfile, error, showResetForm } = this.state;
    const settingsOptions = [
      { name: "Allow user to talk to Chet", id: "allowChet", value: allowChet },
      { name: "Allow user to wipe your chatbot's mind", id: "allowWipe", value: allowWipe },
      { name: "Allow user to edit your chatbot's info", id: "allowEditProfile", value: allowEditProfile },
      { name: "Allow user to logout (returns to Chet)", id: "allowLogout", value: allowLogout },
    ]

    return (
      <div>
        <br />
        <h4>Parental Settings</h4>
        { !profile.enteredPin &&
          <div>
            { !profile.pin &&
              <p>Please create a pin to get started</p>
            }
            { profile.pin &&
              <p>Please enter your pin</p>
            }
            <Pin profile={profile} updateSettings={updateSettings} />
            { profile.pin &&
              <p 
                className="text-warning" 
                style={{textDecoration: "underline", cursor: "pointer"}}
                onClick={() => this.setState(prevState => ({showResetForm: !prevState.showResetForm}))}
              >
                reset my pin
              </p>
            }
            { showResetForm && 
            <div>
              <Label>Enter your email address associated with this account.</Label>
              <Input 
                value={this.state.emailAddress}
                onChange={this.handleEmailAddress}
              />
              { error && 
                <p className="text-warning">{error}</p>
              }
              <br />
              <Button
                color="primary"
                onClick={this.handlePinReset}
                style={{cursor: "pointer"}}
              >
                Reset my pin
              </Button>
              
            </div>
            }
          </div>
        }
        { profile.enteredPin &&
          <div>
          { settingsOptions.map(option => 
            <Row key={option.id}>
              <Col xs={12}>
                <hr />
                <p className="text-center">{option.name}</p>
                <Toggle
                  defaultChecked={this.props.profile[option.id]}
                  checked={this.state[option.id]}
                  value={option.name}
                  onChange={(e) => this.handleSettingsToggle(e,option)}
                />
              </Col>
            </Row>
          )}
          </div>
        }
        <hr />
        { profile.enteredPin &&
          <p 
            className="text-danger" 
            style={{cursor: "pointer"}}
            onClick={() => deleteUserAccount(profile.id)}
          >
            <i className="fa fa-trash" style={{paddingRight: 5 + "px"}} /> 
            Delete my account
          </p>
        }
      </div>
    );
  }
}