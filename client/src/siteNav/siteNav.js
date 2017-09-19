import React, { Component } from 'react';
import {Navbar, Row, FormGroup, FormControl, Popover, Overlay, Col} from 'react-bootstrap';
import logo from '../assets/logo-symbol.svg';
import {checkColorFormat} from '../common/validateColor';
import {setHeader} from '../common/setHeader';
import {ColorPanel} from '../common/colorPanel';
// pass in a color and height. get a  responsive swatch with its name.

export class SiteNav extends Component {
    constructor(){
        super();
        this.state = {
            showSuggestions: false, 
            errorMessage: 'hi', 
            searchBar: null,
            lastSuggestionId: undefined,
            suggestionsArray: []
        };
        this.setSuggestions = this.setSuggestions.bind(this);
    }
    fetchSuggestions(colorType,startColor){
        return fetch(`/api/colorsSuggestions/?colorType=${colorType}&startColor=${startColor.replace('#', '%23')}`, setHeader)
            .then((response) => {
                return response.json()})
    }
    handleChange(e){
        let target = e.target;
        this.setState({showSuggestions: false})
        window.clearTimeout(this.timerCheck);
        this.timerCheck = window.setTimeout(() => {
            this.setSuggestions( checkColorFormat(target.value) , target.value);
            this.setState({searchBar: target})
        }, 600)
    }

    setSuggestions(colorType, startColor){
        if (colorType === 'invalid format' || !colorType ){

            this.setState({errorMessage: 'Sorry, the format you entered is invlaid.'})
            this.setState({showSuggestions: false})

        }else if (colorType === 'namedColor' || colorType === 'hexColor'){
            this.fetchSuggestions(colorType, startColor)
                .then((response) => {
                    this.setState({showSuggestions: true, suggestionsArray: response.data})
                })

        }else if (colorType === 'rgb'){

            // just use the color, if it passed the regex valididation it will just render in the browser. 
            this.setState({showSuggestions: true, suggestionsArray: [startColor]})

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
                            {this.state.suggestionsArray.map((color)=> {
                                return <ColorPanel color={color.x11Name || color.hex} key={color.hex} selectColor={this.props.selectColor}/>
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