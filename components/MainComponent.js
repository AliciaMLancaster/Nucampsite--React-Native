import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation'; //main will hold all navigators

const DirectoryNavigator = createStackNavigator(
  {
    //one argument with the components available for this stack
    Directory: { screen: Directory },
    CampsiteInfo: { screen: CampsiteInfo },
  },
  {
    //optinonal second argument
    //defaults to show this component
    initialRouteName: 'Directory',
    //Nav options are set with various objects that configure the settings for the navigator
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#5637DD',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
    },
  }
);

class Main extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          //changes the padding based on platform
          paddingTop:
            Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <DirectoryNavigator />
      </View>
    );
  }
}

export default Main;
