import React, {Component} from 'react';
import {Platform, ScrollView, TextInput, Navigator, Slider, Alert, StyleSheet, Text, View, Image, TouchableOpacity, Picker, AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Card, Left, CardItem, Title, Container, Right, Content, Header, Body, Icon } from 'native-base';
import { Button } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';



export default class ContactUs extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
            name: '',
            email:'',
            message: '',
            showAlert:false,
        }
      this.handleNameChange = this.handleNameChange.bind(this);
	  this.handleEmailChange = this.handleEmailChange.bind(this);
	  this.handleMessageChange = this.handleMessageChange.bind(this);
	  this._sendMessage = this._sendMessage.bind(this);
     }
     handleNameChange(event){
		console.log('handleNameChange', this);
		this.setState({name: event.target.value});
	}
	handleEmailChange(event){
		console.log('handleEmailChange', this);
		this.setState({email: event.target.value});
	}
	handleMessageChange(event){
		console.log('handleMessageChange', this);
		this.setState({message: event.target.value});
	}
async _onValueChange(item, selectedValue){
  	try{
  		await AsyncStorage.setItem(item, selectedValue);
  	}
  	catch (error){
  		console.log('AsyncStorage error' + error.message);
  	}
  }
_sendMessage(event){
	event.preventDefault();
		fetch('http://localhost/kk-api/contact_us', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
					'Accept': 'application/json',
				},
	  			body: JSON.stringify({
	  				name: this.state.name,
	  				email: this.state.email,
	  				message: this.state.message,
	  			})
	  		})
	  		.then((response)=>response.json())
	  		.then((responseData)=>{
	  			//Alert.alert(responseData)
	  			this.showAlert();
	  			console.log(responseData);
	  		}).catch((error) => {
			    console.error(error);
			});
}

		updateValue(text, field){
			if(field=='name'){
				this.setState({
					name: text,
				})
			}
			else if(field=='email'){
				this.setState({
					email: text,
				})
			} else if(field=='message'){
				this.setState({
					message: text,
				})
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

  render(){
  	 const {showAlert} = this.state;
    return(
    	<View style={{flex:1, margin:15}}>
	    	<Text>Name</Text>
			<TextInput 
			    style={{height: 20, marginBottom: 4, borderColor:'#fafafa', borderWidth:1}} 
			    placeholder="Your Name"
			    onChangeText={(text)=>this.updateValue(text, 'name')}
			    />
			<Text>Email</Text>
			 <TextInput 
			    autoCapitalize="none"
			    style={{height: 20, marginBottom: 4, borderColor:'#fafafa', borderWidth:1}} 
			    placeholder="Your Email"
			    onChangeText={(text)=>this.updateValue(text, 'email')}/>
			<Text>Message</Text>
			<TextInput
				multiline={true}
				blurOnSubmit={false}
				editable={true}
				numberOfLines={10}
				onChangeText={(text)=>this.updateValue(text, 'message')}
				style={{borderColor:'#fafafa', borderWidth:1, marginBottom: 4, height:100, padding:10}} placeholder="Send us your message"/>
			<View style={{alignItems:'center', justifyContent:'center'}}>
				<Button
					  title="SUBMIT"
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
					  onPress={this._sendMessage.bind(this)}
					  containerStyle={{ marginTop: 20 }}
				/>
				<AwesomeAlert
			          show={showAlert}
			          showProgress={false}
			          title="Your message has been sent!"
			          closeOnTouchOutside={true}
			          closeOnHardwareBackPress={false}
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
    	);
  }
}