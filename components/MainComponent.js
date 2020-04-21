import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View } from 'react-native';
import { CAMPSITES } from '../shared/campsites';

class Main extends Component {
  //container component to presentational components
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES, //holds campsite data
      selectedCampsite: null, //reserves space in local state that keeps track of which campsite is selected
    };
  }

  onCampsiteSelect(campsiteId) {
    //event handlers gets passed campsiteID that will update this selectedCampsite property when selected
    this.setState({ selectedCampsite: campsiteId }); //updates the state
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Directory
          campsites={this.state.campsites} //pass the state data to Directory component
          onPress={(campsiteId) => this.onCampsiteSelect(campsiteId)}
          //2nd prop called onPress; pass an arrow function that takes campsiteId as the parameter and contains the onCampsiteSelect event handler inside the function body
        />
        <CampsiteInfo
          campsite={
            //pass prop called campsite
            this.state.campsites.filter(
              //need to take the whole array and filters the campsite with the matching id
              (campsite) => campsite.id === this.state.selectedCampsite
            )[0] //returns an array so we will grab the 1st item in the array at index 0
          }
        />
      </View>
    );
  }
}

export default Main;
