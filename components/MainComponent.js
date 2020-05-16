import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Favorites from './FavoritesComponent';
import Login from './LoginComponent';
import {
  View,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation'; //main will hold all navigators
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import {
  fetchCampsites,
  fetchComments,
  fetchPromotions,
  fetchPartners,
} from '../redux/ActionCreators';
import NetInfo from '@react-native-community/netinfo';

const mapDispatchToProps = {
  fetchCampsites,
  fetchComments,
  fetchPromotions,
  fetchPartners,
};

const DirectoryNavigator = createStackNavigator(
  {
    //one argument with the components available for this stack
    Directory: {
      //can set nav options for this screen individually
      screen: Directory,
      navigationOptions: ({ navigation }) => ({
        //pass in the navigation prop in the parameter list
        headerLeft: (
          <Icon
            name="list"
            type="font-awesome"
            iconStyle={styles.stackIcon} //linked from below
            onPress={() => navigation.toggleDrawer()} //onPress prop to make it interaction and use nav prop with built in toggledrawer method
          />
        ),
      }),
    },
    CampsiteInfo: {
      screen: CampsiteInfo,
    },
  },
  {
    //optional second argument
    initialRouteName: 'Directory', //defaults to show this component when you open app
    //Nav options are set with various objects that configure the settings for the navigator
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#5637DD',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
    },
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#5637DD',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft: (
        <Icon
          name="home"
          type="font-awesome"
          iconStyle={styles.stackIcon} //linked from below
          onPress={() => navigation.toggleDrawer()} //onPress prop to make it interaction and use nav prop with built in toggledrawer method
        />
      ),
    }),
  }
);

const AboutNavigator = createStackNavigator(
  {
    About: { screen: About },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#5637DD',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft: (
        <Icon
          name="info-circle"
          type="font-awesome"
          iconStyle={styles.stackIcon} //linked from below
          onPress={() => navigation.toggleDrawer()} //onPress prop to make it interactive so when the icon is clicked it opens the drawer
        />
      ),
    }),
  }
);

const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: Contact },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#5637DD',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft: (
        <Icon
          name="address-card"
          type="font-awesome"
          iconStyle={styles.stackIcon} //linked from below
          onPress={() => navigation.toggleDrawer()} //onPress prop to make it interaction and use nav prop with built in toggledrawer method
        />
      ),
    }),
  }
);

const ReservationNavigator = createStackNavigator(
  {
    Reservation: { screen: Reservation },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#5637DD',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft: (
        <Icon
          name="tree"
          type="font-awesome"
          iconStyle={styles.stackIcon} //linked from below
          onPress={() => navigation.toggleDrawer()} //onPress prop to make it interaction and use nav prop with built in toggledrawer method
        />
      ),
    }),
  }
);

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: { screen: Favorites },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#5637DD',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft: (
        <Icon
          name="heart"
          type="font-awesome"
          iconStyle={styles.stackIcon} //linked from below
          onPress={() => navigation.toggleDrawer()} //onPress prop to make it interaction and use nav prop with built in toggledrawer method
        />
      ),
    }),
  }
);

const LoginNavigator = createStackNavigator(
  {
    Login: { screen: Login },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#5637DD',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft: (
        <Icon
          name="sign-in"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container} //in styles sheet
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require('./images/logo.png')} //this view container takes up 1/3 of the drawer header space the other 2/3
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Nucamp</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

//similar to StackNavigator but holds all of the drawer navigators
const MainNavigator = createDrawerNavigator(
  {
    //route them through the StackNavigator
    Login: {
      screen: LoginNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="sign-in"
            type="font-awesome"
            size={24}
            color={tintColor}
          /> //tint color will change when active
        ),
      },
    },
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor} /> //tint color will change when active
        ),
      },
    },
    Directory: {
      screen: DirectoryNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="list" type="font-awesome" size={24} color={tintColor} /> //tint color will change when active
        ),
      },
    },
    Reservation: {
      screen: ReservationNavigator,
      navigationOptions: {
        drawerLabel: 'Reserve Campsite',
        drawerIcon: ({ tintColor }) => (
          <Icon name="tree" type="font-awesome" size={24} color={tintColor} /> //tint color will change when active
        ),
      },
    },
    Favorites: {
      screen: FavoritesNavigator,
      navigationOptions: {
        drawerLabel: 'My Favorites',
        drawerIcon: ({ tintColor }) => (
          <Icon name="heart" type="font-awesome" size={24} color={tintColor} /> //tint color will change when active
        ),
      },
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: 'About Us',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="info-circle"
            type="font-awesome"
            size={24}
            color={tintColor}
          /> //tint color will change when active
        ),
      },
    },
    Contact: {
      screen: ContactNavigator,
      navigationOptions: {
        drawerLabel: 'Contact Us',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="address-card"
            type="font-awesome"
            size={24}
            color={tintColor}
          /> //tint color will change when active
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#CEC8FF',
    contentComponent: CustomDrawerContentComponent, //tells the main nav to use that component to render the content of the side drawer
  }
);

class Main extends Component {
  componentDidMount() {
    //calls the action creators after the component has been created; use lifecycle method
    this.props.fetchCampsites(); //call each action creator here
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchPartners();

    NetInfo.fetch().then((connectionInfo) => {
      Platform.OS === 'ios'
        ? Alert.alert('Initial Network Connectivity Type:', connectionInfo.type)
        : ToastAndroid.show(
            'Initial Network Connectivity Type: ' + connectionInfo.type,
            ToastAndroid.LONG
          );
    });

    this.unsubscribeNetInfo = NetInfo.addEventListener((connectionInfo) => {
      this.handleConnectivityChange(connectionInfo);
    });
  }

  componentWillUnmount() {
    this.unsubscribeNetInfo();
  }

  handleConnectivityChange = (connectionInfo) => {
    let connectionMsg = 'You are now connected to an active network.';
    switch (connectionInfo.type) {
      case 'none':
        connectionMsg = 'No network connection is active.';
        break;
      case 'unknown':
        connectionMsg = 'The network connection state is now unknown.';
        break;
      case 'cellular':
        connectionMsg = 'You are now connected to a cellular network.';
        break;
      case 'wifi':
        connectionMsg = 'You are now connected to a WiFi network.';
        break;
    }
    Platform.OS === 'ios'
      ? Alert.alert('Connection change:', connectionMsg)
      : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          //changes the padding based on platform
          paddingTop:
            Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#5637DD',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60,
  },
  stackIcon: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 24,
  },
});

export default connect(null, mapDispatchToProps)(Main);
