import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

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

function CampsiteInfo(props) {
  return <RenderCampsite campsite={props.campsite} />;
}

export default CampsiteInfo;
