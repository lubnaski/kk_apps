import React, {Component} from 'react';
import {Platform, ScrollView, Navigator, Slider, Linking, StyleSheet, Text, View, Image, TouchableOpacity, Picker, AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Card, Left, CardItem, Title, Container, Right, Content, Header, Body, Icon } from 'native-base';
import { Button } from 'react-native-elements';
import { Font } from 'expo';

export default class VisitWebsite extends React.Component{

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
    	<View style={{margin: 10}}>
	    	<Text style={{textAlign:'center', fontSize:20, fontWeight: 'bold', fontFamily: 'RifficFree'}}>Learn to code with KodeKiddo!</Text>
		    	<View style={{alignItems:'center', justifyContent:'center'}}>
		    		<Image style={{alignItems: 'center', justifyContent:'center'}} source={require('../images/kodekiddo.png')}/>
		    	</View>
	    	<Text style={{textAlign:'justify', margin:10}}>KodeKiddo adalah tempat belajar coding yang interaktif dan seru untuk anak-anak. Kami menawarkan  afterschool enrichment courses dan aktifitas untuk liburan sekolah dengan menggunakan teknologi dan metodologi yang dikembangkan khusus untuk anak. Cara mengajar kami berfokus kepada perkembangan tiap anak sambil mengikuti kurikulum yang seimbang.</Text>
	    	<View style={{alignItems:'center', justifyContent:'center'}}>
	    	<Button
			    title="VISIT WEBSITE"
				titleStyle={{ fontWeight: "700" }}
				buttonStyle={{
					backgroundColor: "#5eac1a",
					width: 250,
					marginTop:10,
					height: 45,
					borderColor: "transparent",
					borderWidth: 0,
					borderRadius: 25
					  }}
					  containerStyle={{ marginTop: 20 }}
				onPress={()=> {Linking.openURL('https://kodekiddo.com/')}}/>
		    </View>
    	</View>
    	);
  }
}