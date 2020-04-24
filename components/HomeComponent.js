import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { PROMOTIONS } from '../shared/promotions';
import { PARTNERS } from '../shared/partners';

function RenderItem({ item }) {
  //expect to pass an item that will destructure from the props objects
  if (item) {
    //if truthy returns a card
    return (
      <Card
        featuredTitle={item.name}
        image={require('./images/react-lake.jpg')} //will get from server later
      >
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  }
  return <View />;
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //bring data in the main component state with a constructor
      campsites: CAMPSITES,
      promotions: PROMOTIONS,
      partners: PARTNERS,
    };
  }

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      //render groups or lists or items...loads all of child components at once vs flat list which does one part of a list is rendered at a time
      <ScrollView>
        <RenderItem
          item={this.state.campsites.filter((campsite) => campsite.featured)[0]} //use filter to find the featured campsite
        />
        <RenderItem
          item={
            this.state.promotions.filter((promotion) => promotion.featured)[0] //use filter to find the promoted campsite
          }
        />
        <RenderItem
          item={this.state.partners.filter((partner) => partner.featured)[0]} //use filter to find the partner campsite
        />
      </ScrollView>
    );
  }
}

export default Home;
