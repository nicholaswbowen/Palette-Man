import React, { Component } from 'react';
import {Col, Button} from 'react-bootstrap';
import {ColorSwatch} from '../colorSwatch/colorSwatch'
import {generateScaledColorsList} from '../common/generateColors'
import {ScaleCarosuel} from './scaleCarosuel'
export class DetailsView extends Component {
    constructor(){
        super();
        this.state = {whiteScale: [], blackScale: []}
    }
    componentDidMount(){
        let newWhiteScale = generateScaledColorsList(this.props.selectedColor, '#fff', 20);
        this.setState({whiteScale: newWhiteScale})
    }
    componentDidUpdate(prevProps){
        if(this.props.selectedColor !== prevProps.selectedColor){
            let newWhiteScale = generateScaledColorsList(this.props.selectedColor, '#fff', 20);
            this.setState({whiteScale: newWhiteScale})
        }
    }
    render() {
        return (<div>
            <Col xs={10} md={6} mdOffset={3} xsOffset={1} className='big-swatch'>    
                <ColorSwatch swatchHeight='100%' color={this.props.selectedColor} selectColor={this.props.selectColor}/>         
            </Col>
            <Col xs={12}>
                <div className='text-center'>Tints of {this.props.selectedColor}</div>
                <ScaleCarosuel scaleStart={this.props.selectedColor} scaleEnd={'#fff'} selectColor={this.props.selectColor}/>
                <br />
                <div className='text-center'>Shades of {this.props.selectedColor}</div>
                <ScaleCarosuel scaleStart={this.props.selectedColor} scaleEnd={'#000'} selectColor={this.props.selectColor}/>
                
            </Col>
            <Col xs={12} className='text-center'>
                <br />
                <Button onClick={this.props.clearSelectedColor} className='clear-button'>Clear</Button>
            </Col>
            
        </div>);
    }
}

