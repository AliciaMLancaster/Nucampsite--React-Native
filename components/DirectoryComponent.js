import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Directory(props) {
  //receives props from Main component (parent)

  const renderDirectoryItem = ({ item }) => {
    //use destructuring; property called item, will iterate over items in array to put in ListItem
    return (
      <ListItem
        title={item.name} //campsite names
        subtitle={item.description} //campsite description
        onPress={() => props.onPress(item.id)} //when this component is pressed the function will fire; trigger the onPress campsite selector passing props
        leftAvatar={{ source: require('./images/react-lake.jpg') }} //campsite image
      />
    );
  };

  return (
    <FlatList
      data={props.campsites} //pass campsites array
      renderItem={renderDirectoryItem} //call back function
      keyExtractor={(item) => item.id.toString()} //use id number as unique key from campsite array
    />
  );
}

export default Directory;
