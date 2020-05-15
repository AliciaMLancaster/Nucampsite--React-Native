import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  Alert,
  PanResponder,
  Share,
} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = {
  postFavorite: (campsiteId) => postFavorite(campsiteId),
  postComment: (
    campsiteId,
    rating,
    author,
    text //Dispatch the new postComment action creator
  ) => postComment(campsiteId, rating, author, text),
};

function RenderCampsite(props) {
  //need to pass all props

  const { campsite } = props; //still need to have the destructured campsite object in this function

  const view = React.createRef(); //similar to getElememtbyId using Ref

  const recognizeDrag = ({ dx }) => (dx < -200 ? true : false); //dx= distance across x access

  const recognizeComment = ({ dx }) => (dx > 200 ? true : false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      view.current
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? 'finished' : 'canceled')
        );
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log('pan responder end', gestureState);
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          'Add Favorite',
          'Are you sure you wish to add ' + campsite.name + ' to favorites?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => console.log('Cancel Pressed'),
            },
            {
              text: 'OK',
              onPress: () =>
                props.favorite
                  ? console.log('Already set as a favorite')
                  : props.markFavorite(),
            },
          ],
          { cancelable: false }
        );
      } else if (recognizeComment(gestureState)) {
        props.onShowModal();
      }
      return true;
    },
  });

  const shareCampsite = (title, message, url) => {
    Share.share(
      {
        title: title,
        message: `${title}: ${message} ${url}`,
        url: url,
      },
      {
        dialogTitle: 'Share ' + title,
      }
    );
  };

  if (campsite) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={view}
        {...panResponder.panHandlers}
      >
        <Card
          featuredTitle={campsite.name}
          image={{ uri: baseUrl + campsite.image }} //use images from server
        >
          <Text style={{ margin: 10 }}>{campsite.description}</Text>
          <View style={styles.cardRow}>
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
            <Icon
              name={'pencil'}
              type="font-awesome"
              color="5637DD"
              style={styles.cardItem}
              raised
              reverse
              onPress={() => props.onShowModal()}
            />
            <Icon
              name={'share'}
              type="font-awesome"
              color="#5637DD"
              style={styles.cardItem}
              raised
              reverse
              onPress={() =>
                shareCampsite(
                  campsite.name,
                  campsite.description,
                  baseUrl + campsite.image
                )
              }
            />
          </View>
        </Card>
      </Animatable.View>
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
        <Rating
          readonly
          type="star"
          style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
          startingValue={item.rating}
          imageSize={10}
        />
        <Text style={{ fontSize: 12 }}>
          {`-- ${item.author}, ${item.date}`}{' '}
        </Text>
      </View>
    );
  };

  return (
    //render comments inside a card element and flat list that expects an array
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments} //comments array
          renderItem={renderCommentItem} //function name....found above
          keyExtractor={(item) => item.id.toString()} //use unique key
        />
      </Card>
    </Animatable.View>
  );
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 5,
      author: '',
      text: '',
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(campsiteId) {
    //pass the campsiteId argument along with the 3 form values from state
    this.props.postComment(
      campsiteId,
      this.state.rating,
      this.state.author,
      this.state.text
    );
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      rating: 5,
      author: '',
      text: '',
    });
  }

  markFavorite(campsiteId) {
    this.props.postFavorite(campsiteId);
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
          favorite={this.props.favorites.includes(campsiteId)}
          markFavorite={() => this.markFavorite(campsiteId)}
          onShowModal={() => this.toggleModal()}
        />
        <RenderComments comments={comments} />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              style={{ paddingVertical: 10 }}
              showRating="true"
              startingValue={this.state.rating}
              imageSize={40}
              onFinishRating={(rating) => this.setState({ rating: rating })}
            />
            <Input
              placeholder="Author"
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(authorText) =>
                this.setState({ author: authorText })
              }
              value={this.state.author}
            />
            <Input
              placeholder="Comment"
              leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(commentText) =>
                this.setState({ text: commentText })
              }
              value={this.state.text}
            />
            <View>
              <Button
                title="Submit"
                color="#5637DD"
                onPress={() => {
                  this.handleComment(campsiteId);
                  this.resetForm();
                }}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                color="#808080"
                title="Cancel"
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardRow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 20,
  },
  cardItem: {
    flex: 1,
    margin: 10,
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
