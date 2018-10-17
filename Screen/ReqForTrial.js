import React, {Component} from 'react';
import {Platform, ScrollView, Navigator, Slider, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Picker, AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Card, Left, CardItem, Title, Container, Right, Content, Header, Body, Icon } from 'native-base';
import {Button} from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';


export default class ReqForTrial extends React.Component{
  constructor (props){
	 super(props);
	  this.state = {
	    cabang:'',
	    name: '',
	    email: '',
	    schedule:'',
	    showAlert: false,
	  };
	  this.handleNameChange = this.handleNameChange.bind(this);
	  this.handleEmailChange = this.handleEmailChange.bind(this);
	  this.handleScheduleChange = this.handleScheduleChange.bind(this);
	  this.handleCabangChange = this.handleCabangChange.bind(this);
	  this._submitRequest = this._submitRequest.bind(this);
	}
	
	handleNameChange(event){
		console.log('handleNameChange', this);
		this.setState({name: event.target.value});
	}
	handleCabangChange(event){
		console.log('handleCabangChange', this);
		this.setState({cabang: event.target.value});
	}
	handleScheduleChange(event){
		console.log('handleScheduleChange', this);
		this.setState({schedule: event.target.value});
	}
	handleEmailChange(event){
		console.log('handleEmailChange',this);
		this.setState({email: event.target.value});

	}
	_submitRequest(event){
		event.preventDefault();
		let data = {
				name: this.state.name,
				email: this.state.email,
				schedule:this.state.schedule,
				cabang:this.state.cabang,
			};
		fetch('http://localhost/kk-api/request_trial', {
			method: 'POST',
			headers:{
				"Content-Type": "application/json",
				'Accept': 'application/json',
				'Content-Length': data.length,
			},
  			body: JSON.stringify(data),
  		})
  		.then((response)=>response.json())
  		.then((responseJson)=>{
  			this.showAlert();
  		})
  		.catch((error)=>{
  			console.log(error);
  		});
	}
	
	updateValue(text, field){
		if (field == 'name'){
			this.setState({name: text,})
		} 
		else if(field == 'email'){
			this.setState({email: text,})
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
    	<Container>
	    	<Content>
			    <View style={{margin:15, flexDirection: 'column'}}>
			    	<Text style={{flex:1}}>Name</Text>
			    		<TextInput 
			    		value={this.state.name}
			    		style={{height: 20, flex:2, marginBottom: 4, borderColor:'#fafafa', borderWidth:1}} 
			    		placeholderColor placeholder="Your Name"
			    		onChangeText={(text)=>this.updateValue(text, 'name')}/>
			    	<Text style={{flex:3}}>Email</Text>
			    		<TextInput 
			    		value={this.state.email}
			    		style={{height: 20, flex: 4, marginBottom: 4, borderColor:'#fafafa', borderWidth:1}} 
			    		placeholderColor placeholder="Your Email"
			    		autoCapitalize="none"
			    		onChangeText={(text)=>this.updateValue(text, 'email')}/>
			    	<Text style={{flex:5}}>Branches</Text>
			    	<Picker
				     	selectedValue={this.state.cabang}
				  		style={{ height: 50, flex:6 }}
				  		onValueChange={(itemValue, itemIndex) => this.setState({cabang: itemValue})}
				  		>
				  			<Picker.Item label="Gading Serpong" value="GS"/>
				  			<Picker.Item label="Permata Buana" value="PB"/>
				  			<Picker.Item label="Kelapa Gading" value="KG"/>
				  			<Picker.Item label="Denpasar" value="DS"/>
				  			<Picker.Item label="Pondok Indah" value="PI"/>
     				</Picker>
			    	<Text style={{flex:7}}>Preferred Schedule</Text>
			    	<Picker
				     	selectedValue={this.state.schedule}
				  		style={{ height: 50, flex:8}}
				  		onValueChange={(itemValue, itemIndex) => this.setState({schedule: itemValue})}>
				  			<Picker.Item label="Mon, 15.00" value="1"/>
				  			<Picker.Item label="Mon, 16.30" value="2"/>
				  			<Picker.Item label="Tue, 15.00" value="3"/>
				  			<Picker.Item label="Tue, 16.30" value="4"/>
				  			<Picker.Item label="Wed, 15.00" value="5"/>
     				</Picker>	
			    	<View style={{alignItems:'center', flex:9, justifyContent:'center'}}>
				    	<Button
				    	title="REQUEST"
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
						  onPress={this._submitRequest.bind(this)}
						  containerStyle={{ marginTop: 20, flex:10, justifyContent:'flex-end' }}/>
						  <AwesomeAlert
					          show={showAlert}
					          showProgress={false}
					          title="Your request has been sent!"
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