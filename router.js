import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackNavigator, createBottomTabNavigator, SwitchNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import HomeScreen from './Screen/HomeScreen.js';
import ProfileScreen from './Screen/ProfileScreen.js';
import AboutScreen from './Screen/AboutScreen.js';
import ProgressScreen from './Screen/ProgressScreen.js';
import BelumLogin from './Screen/BelumLogin.js';
import { isSignedIn, onSignIn, onSignOut } from "./auth";
import SigningOut from './SigningOut.js';

export const SignedIn = createBottomTabNavigator( {
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (tintColor =='#5eac1a' ?
      <Image source={require('./images/xx_icon_home_on.png')} style={{width:30, height:30}}/>
      :
      <Image source={require('./images/xx_icon_home_off.png')} style={{width:30, height:30}}/>
      ),
    tabBarOptions:{
      activeTintColor: '#5eac1a',
    }
    }
  },
  ProgressScreen: {
    screen: ProgressScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (tintColor =='#5eac1a' ?
      <Image source={require('./images/xx_icon_progress_on.png')} style={{width:30, height:30}}/>
      :
      <Image source={require('./images/xx_icon_progress_off.png')} style={{width:30, height:30}}/>
      ),
    tabBarOptions:{
      activeTintColor: '#5eac1a',
    }, 
    headerStyle: {
      backgroundColor: '#1f80d3',
    },
    headerTintColor: '#1f80d3',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily:"RifficFree",
      letterSpacing:1,
    },
    title: 'Progress',
    }
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (tintColor =='#5eac1a' ?
      <Image source={require('./images/xx_icon_profile_on.png')} style={{width:25, height:33}}/>
      :
      <Image source={require('./images/xx_icon_profile_off.png')} style={{width:25, height:33}}/>
      ),
    tabBarOptions:{
      activeTintColor: '#5eac1a',
    },
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#1f80d3',
    },
    }
  },
  AboutScreen: {
    screen: AboutScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (tintColor =='#5eac1a' ?
      <Image source={require('./images/xx_icon_about_on.png')} style={{width:30, height:30}}/>
      :
      <Image source={require('./images/xx_icon_about_off.png')} style={{width:30, height:30}}/>
      ),
    tabBarOptions:{
      activeTintColor: '#5eac1a',
    }
    }
  }
}, {
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: "bottom",
  backgroundColor: '#5eac1a',
});
type Props = {};


export const SignedOut = createStackNavigator({
  SigningOut: {
    screen: SigningOut,
  },
  SignedIn: {
    screen: SignedIn,
  }
});


export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn,
      },
      SigningOut: {
        screen: SigningOut,
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SigningOut"
    }
  );
};







export default class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}


