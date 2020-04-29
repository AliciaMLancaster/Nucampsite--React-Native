import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    promotions: state.promotions,
    partners: state.partners,
  };
};

function RenderItem({ item }) {
  //expect to pass an item that will destructure from the props objects
  if (item) {
    //if truthy returns a card
    return (
      <Card
        featuredTitle={item.name}
        image={{ uri: baseUrl + item.image }} //will get from server later
      >
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  }
  return <View />;
}

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      //render groups or lists or items...loads all of child components at once vs flat list which does one part of a list is rendered at a time
      <ScrollView>
        <RenderItem
          item={
            this.props.campsites.campsites.filter(
              (campsite) => campsite.featured
            )[0]
          } //use filter to find the featured campsite
        />
        <RenderItem
          item={
            this.props.promotions.promotions.filter(
              (promotion) => promotion.featured
            )[0] //use filter to find the promoted campsite
          }
        />
        <RenderItem
          item={
            this.props.partners.partners.filter(
              (partner) => partner.featured
            )[0]
          } //use filter to find the partner campsite
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);
