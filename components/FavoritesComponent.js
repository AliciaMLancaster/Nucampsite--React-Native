import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    favorites: state.favorites,
  };
};

class Favorites extends Component {
  static navigationOptions = {
    title: 'My Favorites',
  };

  render() {
    const { navigate } = this.props.navigation; //navigate prop
    const renderFavoriteItem = ({ item }) => {
      //function uses the destructuring current item from array
      return (
        //returns the following
        <ListItem
          title={item.name}
          subtitle={item.descrption}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
          onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })} //make every fav in list clicked to route to campsite info component
        />
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
        data={this.props.campsites.campsites.filter(
          (
            campsite //filter entire campsites array= matches favorites array
          ) => this.props.favorites.includes(campsite.id) //check if favorites array includes the id of that campsite
        )}
        renderItem={renderFavoriteItem} //name of function
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Favorites);
