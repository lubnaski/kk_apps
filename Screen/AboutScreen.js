import React, {Component} from 'react';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { createMaterialTopTabNavigator } from 'react-navigation';
import VisitWebsite from './VisitWebsite.js';
import Branches from './Branches.js';
import ReqForTrial from './ReqForTrial.js';
import { StyleSheet, FlatList, Text, View, Image } from 'react-native';
import ContactUs from './ContactUs.js';
import { Card, Left, CardItem, Title, Container, Right, Content, Header, Body, Icon } from 'native-base';


const AboutTabNavigator = createMaterialTopTabNavigator(
	{
	VisitWebsite: {
		screen: VisitWebsite,
		navigationOptions: 
		{
			tabBarIcon: 
		        <Image source={require('../images/ButtonUnguProfile.png')}/>,
		    title: 'Visit Website',
		    labelStyle: { fontSize: 3 },
		    }
        
	},
	Branches: {
		screen: Branches,
		tabBarIcon: ({ tintColor }) => (
        <Image source={require('../images/ButtonPoint.png')}/>)
	},
	RequestForTrial: {
		screen: ReqForTrial,
		navigationOptions: 
		{tabBarIcon: ({ tintColor }) => (
		        <Image source={require('../images/ButtonPoint.png')}/>),
		title: 'Request For Trial',
	}
	},
	ContactUs: {
		screen: ContactUs,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
		        <Image source={require('../images/ButtonPoint.png')}/>),
			title: 'Contact Us',
	}
	},
},
{	
	animationEnabled: true,
  	swipeEnabled: true,
  	showLabel: false,
  	showIcon: true,
  	tabBarOptions: {
		style:{
	    	backgroundColor: '#802bca',
	    }
  	},
  });

export default class AboutScreen extends React.Component {
	static navigationOptions = {
    title: 'About',
	}
	constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      GROBOLD: require("../assets/fonts/GROBOLD.ttf"),
      RifficFree: require("../assets/fonts/RifficFree-Bold.ttf"),
    });
    this.setState({ loading: false });
  }
	render(){
		if (this.state.loading) {
      return <Expo.AppLoading />;
    }
		return(
			<Container>
		      <Header
		        style= {{backgroundColor: '#1f80d3'}}>
			      <Left>
			        <Image source={require('../images/kodekiddo.png')} style={{width: 40, height: 32.5}}/>
			      </Left>
		      	<Body>
		        	<Title>
		        		<Text style={{fontFamily:"RifficFree", letterSpacing:1, color:"#fff"}}>KODE KIDDO</Text></Title>
		      	</Body>
		      	<Right>
		      	</Right>
		    </Header>
		    <AboutTabNavigator/>
		    </Container>
			);
	}
}