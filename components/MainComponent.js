import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'; //main will hold all navigators

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

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
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

const AboutNavigator = createStackNavigator(
  {
    About: { screen: About },
  },
  {
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

const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: Contact },
  },
  {
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

//similar to StackNavigator
const MainNavigator = createDrawerNavigator(
  {
    //route them through the StackNavigator
    Home: { screen: HomeNavigator },
    Directory: { screen: DirectoryNavigator },
    About: { screen: AboutNavigator },
    Contact: { screen: ContactNavigator },
  },
  {
    drawerBackgroundColor: '#CEC8FF',
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
        <MainNavigator />
      </View>
    );
  }
}

export default Main;
