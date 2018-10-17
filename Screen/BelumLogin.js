import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Text, TextInput, View, Alert,Image, AppRegistry, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {Button} from 'react-native-elements';
import { Card, Left, CardItem, Title, Container, Right, Content, Header, Body } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import {onSignIn, setStorage } from '../auth.js';
import ProgressScreen from './ProgressScreen.js';
var STORAGE_KEY = 'student_id';


export default class LoginRootStack extends React.Component{
	render(){
		return <RootStack/>;
	}
} 


export class BelumLoginScreen extends React.Component {
    constructor(props) {
    super(props);
    this.state = { 
    	loading: true,
    	email: '',
    	username: '',
    	enc_passwd: '',
    	showAlert: false,
    };
	}
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  async _onValueChange(item, selectedValue){
  	try{
  		await AsyncStorage.setItem(item, selectedValue);
  	}
  	catch (error){
  		console.log('AsyncStorage error' + error.message);
  	}
  }
  async _userLogout(){
  	try{
  		await AsyncStorage.removeItem(STORAGE_KEY);
  		alert.alert("Logout Success!")
  	}
  	catch(error){
  		console.log('AsyncStorage error'+ error.message);
  	}
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      GROBOLD: require("../assets/fonts/GROBOLD.ttf"),
      RifficFree: require("../assets/fonts/RifficFree-Bold.ttf"),
    });
    this.setState({ loading: false });
  }
  _userLogin(event){
  	event.preventDefault();
  	const {username} = this.state;
	const {enc_passwd} = this.state;
  	let data = {
				login: username,
				password: enc_passwd,
			};
  		fetch("http://localhost/kk-api/auth/login/", {
  			method: "POST",
  			body: JSON.stringify(data),
  		})
  		.then((response)=>{
  			if(response.status){
	  			this.showAlert();
	  			setStorage(true)
	    		onSignIn()
	      		.then(() => this.props.navigation.dispatch("SignedIn"));
      		}
      		else {
      			Alert.alert('Login Failed', 'Invalid username or password');
      		}
  		})
  	}
updateValue(text, field){
		if (field == 'username'){
			this.setState({username: text,})
		} 
		else if(field == 'enc_passwd'){
			this.setState({enc_passwd: text,})
		} else if(field=='email'){
			this.setState({email: text,})
		} 
	}
	render(){
	if (this.state.loading) {
      return <Expo.AppLoading/>;
    }
    const {showAlert} = this.state;
		return(
		<Container style={{backgroundColor: '#1f80d3'}}>
			    <View flex style={{margin:15}}>
			    <View style={{alignItems:'center', justifyContent:'center'}}>
		    		<Image style={{alignItems: 'center', justifyContent:'center'}} source={require('../images/kodekiddo.png')}/>
		    	</View>
			    	<View flex style={{flex:2, flexDirection:'column'}}>
						<TextInput 
						autoCapitalize="none"
			    		style={{marginBottom: 10, padding: 10, borderRadius:25, backgroundColor:'rgba(255, 255, 255, 0.3)'}} 
			    		placeholder="Username"
			    		placeholderTextColor='#fff'
			    		color='#fff'
			    		onChangeText={(text)=>this.updateValue(text, 'username')}/>
						<TextInput 
			    		style={{marginBottom: 10, padding: 10, borderRadius:25, backgroundColor:'rgba(255, 255, 255, 0.3)'}} 
			    		secureTextEntry={true} placeholder="Password"
			    		placeholderTextColor='#fff'
			    		color='#fff'
			    		onChangeText={(text)=>this.updateValue(text, 'enc_passwd')}/>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('BelumPunyaAkun')}><Text style={{color: '#fff', fontSize: 11}}>Don't have an account? Register now!</Text></TouchableOpacity>
				    	<View style={{alignItems:'center', justifyContent:'center'}}>
					    	<Button
					    	title="LOGIN"
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
							  onPress={this._userLogin.bind(this)}/>
							  <AwesomeAlert
					          show={showAlert}
					          showProgress={false}
					          title={this.state.username}
					          message="Login Success!"
					          closeOnTouchOutside={true}
					          closeOnHardwareBackPress={true}
					          showCancelButton={false}
					          showConfirmButton={true}
					          confirmText="OK"
					          confirmButtonColor="#5eac1a"
					          onConfirmPressed={() => {
					            this.hideAlert();
					          }}
					        />
			    		</View>
			    	</View>
		    	</View>
		    	</Container>
			);
	}
}


export class BelumPunyaAkun extends React.Component {
	constructor(props) {
    super(props);
    this.state = { 
    	loading: true,
    	nim:'',
    	showAlert: false,
    };
  }
  updateValue(text, field){
		if (field == 'nim'){
			this.setState({nim: text,})
		} 
	}
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      GROBOLD: require("../assets/fonts/GROBOLD.ttf"),
      RifficFree: require("../assets/fonts/RifficFree-Bold.ttf"),
    });
    this.setState({ loading: false });
  }
    _userSignup(){
    		fetch("http://localhost/kk-api/request_password", {
    			method: "POST",
    			body: JSON.stringify({
    				nim: this.state.nim,
    			})
    		})
			    .then((response) => {
			    	if(response.status){
			    	this.showAlert();
			    } else {
			    	Alert.alert('Invalid NIM', 'Please input your valid NIM');
			    }
			    })
			    .catch((error) => {
			      console.error(error);
			    });
    	}
	render(){
		const {showAlert} = this.state;
		if (this.state.loading) {
      return <Expo.AppLoading/>;
    }
		return(
		<Container style={{backgroundColor: '#1f80d3'}}>
		<Content>
			    <View style={{margin:15}}>
			   		<View style={{alignItems:'center', justifyContent:'center'}}>
			    		 <Image source={require('../images/kodekiddo.png')} style={{width:183, height: 150, marginTop:10, justifyContent:'center'}}/>
			    	</View>
			    	<View flex style={{flexDirection:'column'}}>
						<Text style={{color: '#fff', marginBottom:10}}>Input your Nim to get your account!</Text>
						<TextInput 
			    		style={{marginBottom: 10, padding: 10,borderRadius:25, backgroundColor:'rgba(255, 255, 255, 0.3)'}} 
			    		placeholder="Nim"
			    		color="#fff"
			    		placeholderTextColor='#fff'
			    		onChangeText={(text)=>this.updateValue(text, 'nim')}/>
			    	</View>
			    	<View style={{alignItems:'center', justifyContent:'center'}}>
			    	<Button
			    	title="SEND"
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
					  onPress={this._userSignup.bind(this)}/>
					<AwesomeAlert
					          show={showAlert}
					          showProgress={false}
					          title="Your account has been created!"
					          message="We will inform you the password via email."
					          closeOnTouchOutside={true}
					          closeOnHardwareBackPress={true}
					          showCancelButton={false}
					          showConfirmButton={true}
					          confirmText="OK"
					          confirmButtonColor="#5eac1a"
					          onConfirmPressed={() => {
					            this.hideAlert();
					          }}
					        />
		    		</View>
		    	</View>
	    	</Content>
	    	</Container>
			);
	}
}

const RootStack = createStackNavigator({
	BelumLoginScreen: {
		screen: BelumLoginScreen,
	},
	BelumPunyaAkun:{
		screen: BelumPunyaAkun,
	},
},
	{
		initialRouteName: 'BelumLoginScreen',
	}
);

