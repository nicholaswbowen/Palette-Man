import React, { Component } from 'react';
import {Carousel, Col} from 'react-bootstrap';
import {ColorSwatch} from '../colorSwatch/colorSwatch'
import {generateScaledColorsList} from '../common/generateColors'

export class ScaleCarosuel extends Component {
    constructor(){
        super();
        this.state = {colorScale: [], index: 0, direction: null};
        this.handleSelect = this.handleSelect.bind(this);
        this.generateScaledColorsList = this.generateScaledColorsList.bind(this);
        this.paginateColors = this.paginateColors.bind(this);
    }
    componentDidMount(){
        this.generateScaledColorsList();
    }
    componentDidUpdate(prevProps){
        if(this.props.scaleStart !== prevProps.scaleStart){
            this.generateScaledColorsList();
            this.setState({index: 0})
        }
    }
    generateScaledColorsList(){
        let newScale = generateScaledColorsList(this.props.scaleStart, this.props.scaleEnd, 20);
        this.setState({colorScale: this.paginateColors(newScale)});
    }
    handleSelect(selectedIndex, e) {
        this.setState({
          index: selectedIndex,
          direction: e.direction
        });
      }
    paginateColors(colors){
        let newColors = [];
        while(colors.length > 0){
            newColors.push(colors.splice(0,5));
        }
        return newColors;
    }
    render() {
        return (<div>
            <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect} interval={null} indicators={false}>
                
                {this.state.colorScale.map((page, index) => {
                    return (<Carousel.Item key={index}>
                        <Col xs={0} md={1}></Col>
                    {page.map((color) => {
                        return(<Col xs={6} md={2} key={color}>
                        
                            <ColorSwatch swatchHeight='125px' color={color} selectColor={this.props.selectColor}/>
                        
                        </Col>)
                    })}
                    </Carousel.Item>)
                })}
                
        </Carousel>
      </div>);
    }
}

