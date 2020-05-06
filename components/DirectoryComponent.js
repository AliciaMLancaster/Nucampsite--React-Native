import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
  };
};

class Directory extends Component {
  //Header title for navigation
  static navigationOptions = {
    title: 'Directory',
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({ item }) => {
      //use destructuring; property called item, will iterate over items in array to put in ListItem
      return (
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <Tile
            title={item.name} //campsite names
            caption={item.description} //campsite description
            featured
            onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })} //when this component is pressed the function will fire; trigger the onPress campsite selector passing props
            imageSrc={{ uri: baseUrl + item.image }} //campsite image
          />
        </Animatable.View>
      );
    };

    if (this.props.campsites.isLoading) {
      return <Loading />;
    }
    if (this.props.campsites.errMess) {
      return (
        <View>
          <Text>{this.props.campsites.errMess}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.campsites.campsites} //pass from current state campsites array
        renderItem={renderDirectoryItem} //call back function
        keyExtractor={(item) => item.id.toString()} //use id number as unique key from campsite array
      />
    );
  }
}

export default connect(mapStateToProps)(Directory);
