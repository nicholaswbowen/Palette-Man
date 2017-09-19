import React, { Component} from 'react';
import {Col, Button} from 'react-bootstrap';
import {generateRandomColor} from '../common/generateColors';
import {ColorPanel} from '../common/colorPanel';

// pass in a color and height. get a  responsive swatch with its name.

export class SideBar extends Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this)
    }
    render() {
        return (<Col xs={12} md={3} className='site-sidebar'>
        <Col xs={12} className='text-center'>
            <Button onClick={this.handleClick} name='random' className='random-button'> Random </Button>
        </Col>        
        <Col xs={12} className='text-center'>
            {this.props.colors.map((color) => {
                    return (<Col xs={6} md={12} key={color}>
                        <ColorPanel color={color} selectColor={this.props.selectColor} />
                    </Col>)
                })
            }
        </Col>

        </Col>);
    }
    handleClick(e){
        if (e.target.name === 'random'){
            this.props.selectColor( generateRandomColor() )
        }
        
    }
}