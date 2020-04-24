import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
    };
  }

  //Header title for navigation
  static navigationOptions = {
    title: 'Directory',
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({ item }) => {
      //use destructuring; property called item, will iterate over items in array to put in ListItem
      return (
        <ListItem
          title={item.name} //campsite names
          subtitle={item.description} //campsite description
          onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })} //when this component is pressed the function will fire; trigger the onPress campsite selector passing props
          leftAvatar={{ source: require('./images/react-lake.jpg') }} //campsite image
        />
      );
    };

    return (
      <FlatList
        data={this.state.campsites} //pass from current state campsites array
        renderItem={renderDirectoryItem} //call back function
        keyExtractor={(item) => item.id.toString()} //use id number as unique key from campsite array
      />
    );
  }
}

export default Directory;
