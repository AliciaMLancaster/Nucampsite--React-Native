import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

function RenderCampsite({ campsite }) {
  //destructor
  if (campsite) {
    //makes sure it's not null or undefined; if truthy will execute return
    return (
      <Card
        featuredTitle={campsite.name}
        image={require('./images/react-lake.jpg')}
      >
        <Text style={{ margin: 10 }}>{campsite.description}</Text>
      </Card>
    );
  }
  return <View />; //if not a value campsite object; returns an empty view component
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
    };
  }

  static navigationOptions = {
    title: 'Campsite Information',
  };

  render() {
    //navigation prop to get the id
    const campsiteId = this.props.navigation.getParam('campsiteId');
    //filter to pull the campsite out from the array we want
    const campsite = this.state.campsites.filter(
      (campsite) => campsite.id === campsiteId
    )[0];
    return <RenderCampsite campsite={campsite} />; //pass campsite object from above
  }
}

export default CampsiteInfo;
