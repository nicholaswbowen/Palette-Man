import React, { Component } from 'react';
import {Col} from 'react-bootstrap';
import {ColorSwatch} from '../colorSwatch/colorSwatch'

export class ListView extends Component {
    constructor(){
        super();
        this.state = {test: []}
    }
    render() {
        return (<div className='site-content'>
                {this.props.colorsList.map((color,index) => {
                    return <Col xs={6} md={3} lg={2} key={color}>
                    
                        <ColorSwatch swatchHeight='125px' color={color} selectColor={this.props.selectColor}/>
                    
                    </Col>
                })}
        </div>);
    }
}

