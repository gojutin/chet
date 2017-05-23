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
    emailAddress: "",
    showResetForm: false,
  }

  componentDidMount() {
    const { db } = this.props;
    this.setState({
      allowChet: db.allowChet,
      allowWipe: db.allowWipe,
      allowLogout: db.allowLogout,
      allowDeleteAccount: db.allowDeleteAccount,
    })
  }


  handleEmailAddress = (e) => {
    const emailAddress = e.target.value;
    this.setState({
      emailAddress,
    })
  }

  handlePinReset = () => {
    const { db, saveSettings } = this.props;
    const { emailAddress } = this.state;
    if (emailAddress !== db.email) {
      this.setState({
        error: "Sorry but this is not the correct email address. Please try again."
      })
    } else {
      saveSettings(db.id, {pin: ""})
      this.setState({
        showResetForm: false,
        emailAddress: "",
        error: ""
      })
    }
  }


  handleSettingsToggle = (e, option) => {
    const { saveSettings, db } = this.props;
    const stateName = option.id;
    this.setState(prevState => ({
      [`${stateName}`]: !prevState[`${stateName}`]
    }), _ => {
      saveSettings(db.id,{[`${stateName}`]: this.state[`${stateName}`]});
    })
  }

  render () {
    const { db, deleteUserAccount } = this.props;
    const { allowChet, allowWipe, allowLogout, error, showResetForm } = this.state;
    const settingsOptions = [
      { name: "Allow user to talk to Chet", id: "allowChet", value: allowChet },
      { name: "Allow user to wipe your chatbot's mind", id: "allowWipe", value: allowWipe },
      { name: "Allow user to logout (returns to Chet)", id: "allowLogout", value: allowLogout },
    ]

    return (
      <div>
        <br />
        <h4>Parental Settings</h4>
        { !db.enteredPin &&
          <div>
            { !db.pin &&
              <p>Please create a pin to get started</p>
            }
            { db.pin &&
              <p>Please enter your pin</p>
            }
            <Pin {...this.props} />
            { db.pin &&
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
        { db.enteredPin &&
          <div>
          { settingsOptions.map(option => 
            <Row key={option.id}>
              <Col xs={12}>
                <hr />
                <p className="text-center">{option.name}</p>
                <Toggle
                  defaultChecked={this.props.db[option.id]}
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
        { db.enteredPin &&
          <p 
            className="text-danger" 
            style={{cursor: "pointer"}}
            onClick={() => deleteUserAccount(db.id)}
          >
            <i className="fa fa-trash" style={{paddingRight: 5 + "px"}} /> 
            Delete my account
          </p>
        }
      </div>
    );
  }
}