import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator(
	{ 
		Profile: {
			screen: ProfileScreen, 
		}
		Other: {
			screen: BelomLogin, 
		}
	}
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);