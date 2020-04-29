import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
  };
};

function RenderCampsite(props) {
  //need to pass all props

  const { campsite } = props; //still need to have the destructured campsite object in this function
  if (campsite) {
    return (
      <Card
        featuredTitle={campsite.name}
        image={{ uri: baseUrl + campsite.image }} //use images from server
      >
        <Text style={{ margin: 10 }}>{campsite.description}</Text>
        <Icon
          name={props.favorite ? 'heart' : 'heart-o'}
          type="font-awesome"
          color="#f50"
          raised
          reverse
          onPress={() =>
            props.favorite
              ? console.log('Already set as a favorite')
              : props.markFavorite()
          }
        />
      </Card>
    );
  }
  return <View />; //if not a value campsite object; returns an empty view component
}

function RenderComments({ comments }) {
  //returns a few lines of text so it's easy to just use text elements
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text} </Text>
        <Text style={{ fontSize: 12 }}>{item.rating} </Text>
        <Text style={{ fontSize: 12 }}>
          {`-- ${item.author}, ${item.date}`}{' '}
        </Text>
      </View>
    );
  };

  return (
    //render comments inside a card element and flat list that expects an array
    <Card title="Comments">
      <FlatList
        data={comments} //comments array
        renderItem={renderCommentItem} //function name....found above
        keyExtractor={(item) => item.id.toString()} //use unique key
      />
    </Card>
  );
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
    };
  }

  markFavorite() {
    this.setState({ favorite: true });
  }

  static navigationOptions = {
    title: 'Campsite Information',
  };

  render() {
    //navigation prop to get the id
    const campsiteId = this.props.navigation.getParam('campsiteId');
    //filter to pull the campsite out from the array we want
    const campsite = this.props.campsites.campsites.filter(
      (campsite) => campsite.id === campsiteId
    )[0];
    //renders comments for specifc campsite
    const comments = this.props.comments.comments.filter(
      (comment) => comment.campsiteId === campsiteId
    );
    return (
      //pass campsite object and the comment object filtered above
      <ScrollView>
        <RenderCampsite
          campsite={campsite}
          favorite={this.state.favorite}
          markFavorite={() => this.markFavorite()}
        />
        <RenderComments comments={comments} />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(CampsiteInfo);
