import React, { Component } from 'react';
import {Col} from 'react-bootstrap';
import {ListView} from './listView'
import {DetailsView} from './detailsView'
import {setHeader} from '../common/setHeader';
const PAGE_SIZE = 24;
export class ContentArea extends Component {
    constructor(){
        super();
        this.state = { 
            activeColorsPage: {colors: [], index:0},
            allPages: []
        }
        this.fetchColorPage = this.fetchInitialColorsPage.bind(this);
        this.addColorPage = this.addColorPage.bind(this)
        this.selectPage = this.selectPage.bind(this)
        this.getLastIdOfPage = this.getLastIdOfPage.bind(this)
    }
    componentWillMount(){
        this.fetchInitialColorsPage(PAGE_SIZE)
            .then(() => {
                this.setActiveColorsPage(0);
            });
      }

      addColorPage(page){
        let newPages = this.state.allPages;
        newPages.push(page);
        this.setState({allPages: newPages});
      }

      setActiveColorsPage(index){
        let newActivePage = {colors: this.state.allPages[index], index: index}
        this.setState({activeColorsPage: newActivePage})
      }

      fetchInitialColorsPage(size){
        return fetch(`/api/colorsPage/?quanity=${size}`, setHeader )
            .then((response) => response.json())
            .then((response) => {
                this.addColorPage(response.data)
              })
      }
      fetchColorsPage(size, id){
        return fetch(`/api/colorsPage/?quanity=${size}&startId=${id}`, setHeader )
            .then((response) => response.json())
            .then((response) => {
                this.addColorPage(response.data)
              })
      }
      selectPage(index){
        if(this.state.allPages[index]){
            this.setActiveColorsPage(index);

        }else{            
            let id = this.getLastIdOfPage(index)
            this.fetchColorsPage(PAGE_SIZE,id)
                .then(() => {
                    this.setActiveColorsPage(index);
                });
        }
      }
      getLastIdOfPage(pageIndex){
        let page = this.state.allPages[pageIndex-1]
        let id = page[page.length-1]._id
        return id;
      }
    render() {
        return (<Col xs={12} md={9}>
        <br />
        
            {!this.props.selectedColor ? <ListView activeColorsPage={this.state.activeColorsPage} 
                                                   selectColor={this.props.selectColor} 
                                                   allPages={this.state.allPages}
                                                   selectPage={this.selectPage}
                                                   /> 
            : null}  
            {this.props.selectedColor ? <DetailsView selectedColor={this.props.selectedColor} 
                                                     selectColor={this.props.selectColor} 
                                                     clearSelectedColor={this.props.clearSelectedColor}/> 
            : null} 
        </Col>);
    }
}

