import React, { Component } from 'react';
import { Text, ScrollView, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => {
  return {
    partners: state.partners,
  };
};

function Mission() {
  return (
    <Card title="Our Mission">
      <Text style={{ margin: 10 }}>
        We present a curated database of the best campsites in the vast woods
        and backcountry of the World Wide Web Wilderness. We increase access to
        adventure for the public while promoting safe and respectful use of
        resources. The expert wilderness trekkers on our staff personally verify
        each campsite to make sure that they are up to our standards. We also
        present a platform for campers to share reviews on campsites they have
        visited with each other.
      </Text>
    </Card>
  );
}

class About extends Component {
  static navigationOptions = {
    title: 'About Us',
  };

  render() {
    const renderPartner = ({ item }) => {
      return (
        <ListItem
          title={item.name} //partner names
          subtitle={item.description} //partner description
          leftAvatar={{ source: { uri: baseUrl + item.image } }} //partner image
          //render groups or lists or items...loads all of child components at once vs flat list which does one part of a list is rendered at a time
        />
      );
    };

    return (
      <ScrollView>
        <Mission />
        <Card title="Community Partners">
          <FlatList
            data={this.props.partners.partners} //pass from current state partners array
            renderItem={renderPartner} //call back function
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(About);
