import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

class About extends Component {
  static navigationOptions = {
    title: 'About Us',
  };

  render() {
    return (
      //render groups or lists or items...loads all of child components at once vs flat list which does one part of a list is rendered at a time
      <ScrollView />
    );
  }
}

export default About;
