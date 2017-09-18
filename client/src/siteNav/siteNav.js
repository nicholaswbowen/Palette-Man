import React, { Component } from 'react';
import {Navbar, Row, FormGroup, FormControl, Popover, Overlay, Col} from 'react-bootstrap';
import logo from '../assets/logo-symbol.svg';
import {checkColorFormat} from '../common/validateColor';
import {ColorPanel} from '../common/colorPanel';
// pass in a color and height. get a  responsive swatch with its name.

export class SiteNav extends Component {
    constructor(){
        super();
        this.state = {suggestions: [], showSuggestions: false, errorMessage: 'hi', searchBar: null};
        this.setSuggestions = this.setSuggestions.bind(this);
    }
    handleChange(e){
        this.setState({showSuggestions: false})
        let target = e.target;
        window.clearTimeout(this.timerCheck);
        this.timerCheck = window.setTimeout(() => {
            this.setSuggestions( checkColorFormat(target.value) );
            this.setState({searchBar: target})
        }, 600)
    }
    setSuggestions(colorType){
        if (colorType === 'invalid format' || !colorType ){
            this.setState({errorMessage: 'Sorry, the format you entered is invlaid.'})
            this.setState({showSuggestions: false})
        }else if (colorType === 'name' || colorType === 'hex-code'){
            this.setState({showSuggestions: true})
            // fetch suggestions passing in the colortype. 
        }else if (colorType === 'rgb'){
            this.setState({showSuggestions: true})
            // just use the color, if it passed the regex valididation it will just render in the browser. 
        }
    }
    render() {
        return (<Row className="site-navbar">
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/"><img src={logo} alt="site logo"/></a>
                    </Navbar.Brand>

                </Navbar.Header>

            <Navbar.Form pullRight>
                <FormGroup>
                    <FormControl type="text" placeholder="Enter a color..." onChange={this.handleChange.bind(this)}/>
                    {this.state.showSuggestions ? <Overlay show={this.state.showSuggestions} 
                        target={this.state.searchBar}           
                        placement="bottom"
                        container={this}>
                        <Popover id='search-suggestions' style={{width: this.state.searchBar ? this.state.searchBar.offsetWidth : 0 }}>
                            <Col xs={12}>
                            {['red', 'yellow', 'blue'].map((color)=> {
                                return <ColorPanel color={color} key={color} selectColor={this.props.selectColor}/>
                            })}
                            </Col>
                        </Popover>
                    </Overlay> : null}
                </FormGroup>
            </Navbar.Form>

            </Navbar>        
          </Row>);
    }
}