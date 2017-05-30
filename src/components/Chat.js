import React, { Component } from 'react';
import 'react-dots-loader/index.css';
import { Row, Col } from 'reactstrap';
import ScrollToTop from 'react-scroll-up';

// Components
import Bubble from './Bubble';

export default class Chat extends Component {

  render() {
    const { thisChat, delayChat, response, name } = this.props;
    return (
      <div>
        { !thisChat.exchanges && delayChat &&
          <Col xs={12} md={{ size: 8, offset: 2 }}>
            <Bubble
              textColor="white"
              type="chet"
              response={response}
              message="You are now in the conversation view."
              index={1}
            />
          </Col>
        }

        { thisChat && delayChat && thisChat.exchanges &&
          <div>
            
            { thisChat.exchanges.map((exchange, i) => (
                <div
                  key={exchange.createdAt}
                  style={{ fontFamily: "Comfortaa, sans-serif" }}
                >
                  <Row>
                    <Col xs={12} md={{ size: 8, offset: 2 }}>
                      {exchange.chetSays.id === response.id && i === 0 &&
                        <Bubble
                            message={exchange.chetSays.term}
                            type="response"
                            response={response}
                            name={name}
                            i={i}
                          />
                      }

                      {i !== 0 &&
                        
                          <Bubble
                            textColor="white"
                            type="chet"
                            response={response}
                            message={exchange.chetSays.term}
                            index={i}
                          />
                        
                      }
                    </Col>
                    <Col xs={12} md={{ size: 8, offset: 2 }}>
                      
                        <Bubble
                          message={exchange.userSays.term}
                          type="user"
                        />
                     
                    </Col>
                  </Row>
                </div>
              
            ))}
          </div>
        }
        
        <ScrollToTop showUnder={220}>
          <div className="text-warning text-center">
            <i className="fa fa-arrow-circle-up fa-2x" />
          </div>
        </ScrollToTop>
        
        
      </div>
    );
  }
}
