import React, { Component } from 'react';
import './styles/mainStyle.scss';
import {Grid, Row} from 'react-bootstrap';
import {SiteNav} from './siteNav/siteNav';
import {SideBar} from './sideBar/sideBar';
import {ContentArea} from './contentArea/contentArea'
import {generateRandomColorsList} from './common/generateColors'
class App extends Component {
  constructor(){
    super();
    this.state = {view: 'list-view', selectedColor: null, colorsList: [], randomColorsList: [] }
    this.selectColor = this.selectColor.bind(this)
    this.clearSelectedColor = this.clearSelectedColor.bind(this)
  }
  componentDidMount(){
    this.setState({randomColorsList: generateRandomColorsList(36) })
  }
  render() {
    return (
      <Grid className="App" fluid>
          <SiteNav selectColor={this.selectColor}/>
          <Row className="site-content">
              <SideBar colors={this.state.colorsList} selectColor={this.selectColor}/>
              <ContentArea selectedColor={this.state.selectedColor} 
                           randomColorsList={this.state.randomColorsList} 
                           selectColor={this.selectColor} 
                           clearSelectedColor={this.clearSelectedColor}/>
          </Row>  

      </Grid>
    );
  }
  selectColor(color){
    let newColorsList = this.state.colorsList;
    if (this.state.colorsList.indexOf(color) === -1){
      newColorsList.unshift(color);
      if (newColorsList.length > 10){
        newColorsList.pop();
      }
    }
  
    this.setState({selectedColor: color, colorsList: newColorsList});

  }
  clearSelectedColor(){
    this.setState({selectedColor: null});
  }
}

export default App;
