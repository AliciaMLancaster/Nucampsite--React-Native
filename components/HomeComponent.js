import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    promotions: state.promotions,
    partners: state.partners,
  };
};

function RenderItem(props) {
  //expect to pass an item that will destructure from the props objects
  const { item } = props;
  if (props.isLoading) {
    return <Loading />;
  }
  if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }
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
  constructor(props) {
    super(props);
    this.state = {
      scaleValue: new Animated.Value(0),
    };
  }

  animate() {
    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: 1500,
    }).start();
  }

  componentDidMount() {
    this.animate();
  }

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      //render groups or lists or items...loads all of child components at once vs flat list which does one part of a list is rendered at a time
      <Animated.ScrollView
        style={{ transform: [{ scale: this.state.scaleValue }] }}
      >
        <RenderItem
          item={
            this.props.campsites.campsites.filter(
              (campsite) => campsite.featured
            )[0]
          }
          //use filter to find the featured campsite
          isLoading={this.props.campsites.isLoading}
          errMess={this.props.campsites.errMess}
        />
        <RenderItem
          item={
            this.props.promotions.promotions.filter(
              (promotion) => promotion.featured
            )[0] //use filter to find the promoted campsite
          }
          isLoading={this.props.promotions.isLoading}
          errMess={this.props.promotions.errMess}
        />
        <RenderItem
          item={
            this.props.partners.partners.filter(
              (partner) => partner.featured
            )[0]
          } //use filter to find the partner campsite
          isLoading={this.props.partners.isLoading}
          errMess={this.props.partners.errMess}
        />
      </Animated.ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);
