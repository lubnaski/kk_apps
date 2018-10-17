import React, {Component} from 'react';
import {Platform, CameraRoll, TextInput, ScrollView, Navigator, Slider, StyleSheet, Alert, Text, View, Image, TouchableOpacity, Picker, AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Card, Left, CardItem, Title, Container, Right, Content, Header, Body } from 'native-base';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { Camera, ImagePicker, Permissions, Constants } from 'expo';

//edit profile

export default class ProfileTab extends React.Component{
	constructor(props){
		super(props);
		this.state={
			picture_profile: null,
			uploading: false,
			students:[],
			confirm_passwd: '',
			username:'',
			loading:true,
			enc_passwd:'',
			oldpasswd:'',
		};
		
	}
	renderPicture() {
	    if (this.state.picture_profile == null 
	      || this.state.picture_profile == "") {
	      return <Text>your text</Text>;
		}
	}
	getStudents(){
		fetch('http://localhost/kk-api/student/id/151', {
			method: 'GET',
			headers:{
				Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InN0dWRlbnRfaWQiOiIxNTEiLCJzdHVkZW50X25ld19pZCI6IjAyMDA2IiwibmltIjoiRFBTLTAyMDA2IiwibmFtZSI6IkFERlNEU0ZGU1NEIiwiZ2VuZGVyIjoibSIsInNjaG9vbCI6IiIsInNjaGdyYWRlIjoiIiwic3RhdHVzIjoiMiIsInBvaW50IjoiMCIsImVtYWlsIjoibHVibmEubWFoZGFuaWFAbmV0b2ZpZGVhLmNvbSIsIm5pY2tuYW1lIjoiIiwicGhvbmVfbnVtIjoiMSIsIkRPQiI6IjIwMTgtMTAtMTAiLCJwYXJlbnRfbmFtZSI6InBlcCBndWFyZGlvbGEiLCJwYXJlbnRfZW1haWwiOiJwZXAuZ3VhcmRpb2xhQGdtaWwuY29tIiwicGFyZW50X3Bob25lX251bSI6InNkZmZkc2RmIiwidXNlcm5hbWUiOiJEUFMtMDIwMDYiLCJlbmNfcGFzcyI6IjdlYjY2MmY4NmY5MzljNmExZmJhYTFhZDZkZjJkNGJiIiwicGljdHVyZV9wcm9maWxlIjpudWxsLCJwcm9ncmFtX2lkIjoiMSIsImJyYW5jaF9pZCI6IjQiLCJkZWZhdWx0U2NoZWR1bGUwMSI6IjQ4IiwiZGVmYXVsdFNjaGVkdWxlMDIiOiIwIiwiZnJlcXVlbmN5IjoiMSIsImlzVGVzdCI6Ik4iLCJ0b2tlbl9kZXZpY2UiOiIifSwiaWF0IjoxNTM5NzUwMTg2LCJleHAiOjE1NDAzNTQ5ODZ9.FN1g678NVm8hyJtTRt1QenobHxanG9lmucbvkblTXM0'
			}
		})
		.then((response)=> response.json())
		.then((responseData)=> {
			this.setState({
				students: responseData.data,
				loading: false,
			})
			Alert.alert(console.log(responseData.data.name));
		})
		.catch((error)=>{
			console.log(error);
		});
	}
	_updatePassword = ()=>{
		const {passwd} = this.state;
		const {oldpasswd} = this.state;
		const {confirm_passwd} = this.state;
		if(this.state.passwd) {
			if (this.state.confirm_passwd!=this.state.passwd){
				Alert.alert('Password does not match.');
				} else {
			fetch('http://localhost/kk-api/update_password/', {
			method: 'POST',
			header: {
				Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InN0dWRlbnRfaWQiOiIxNTEiLCJzdHVkZW50X25ld19pZCI6IjAyMDA2IiwibmltIjoiRFBTLTAyMDA2IiwibmFtZSI6IkFERlNEU0ZGU1NEIiwiZ2VuZGVyIjoibSIsInNjaG9vbCI6IiIsInNjaGdyYWRlIjoiIiwic3RhdHVzIjoiMiIsInBvaW50IjoiMCIsImVtYWlsIjoibHVibmEubWFoZGFuaWFAbmV0b2ZpZGVhLmNvbSIsIm5pY2tuYW1lIjoiIiwicGhvbmVfbnVtIjoiMSIsIkRPQiI6IjIwMTgtMTAtMTAiLCJwYXJlbnRfbmFtZSI6InBlcCBndWFyZGlvbGEiLCJwYXJlbnRfZW1haWwiOiJwZXAuZ3VhcmRpb2xhQGdtaWwuY29tIiwicGFyZW50X3Bob25lX251bSI6InNkZmZkc2RmIiwidXNlcm5hbWUiOiJEUFMtMDIwMDYiLCJlbmNfcGFzcyI6IjdlYjY2MmY4NmY5MzljNmExZmJhYTFhZDZkZjJkNGJiIiwicGljdHVyZV9wcm9maWxlIjpudWxsLCJwcm9ncmFtX2lkIjoiMSIsImJyYW5jaF9pZCI6IjQiLCJkZWZhdWx0U2NoZWR1bGUwMSI6IjQ4IiwiZGVmYXVsdFNjaGVkdWxlMDIiOiIwIiwiZnJlcXVlbmN5IjoiMSIsImlzVGVzdCI6Ik4iLCJ0b2tlbl9kZXZpY2UiOiIifSwiaWF0IjoxNTM5NzUwMTg2LCJleHAiOjE1NDAzNTQ5ODZ9.FN1g678NVm8hyJtTRt1QenobHxanG9lmucbvkblTXM0'
			},
			body: JSON.stringify({
				student_id: $student_id,
				oldpassword: oldpasswd,
				newpassword: passwd,
			})
		}).then((response) => response.json())
			.then((response)=>{

			}).catch((error)=>{
				console.error(error);
			});
				}
			}
	}
	_updatePicture=()=>{
		const{picture_profile} = this.state;
		const{username} = this.state;
		fetch('http://localhost/kk-api/update_password/', {
			method: 'POST',
			headers:{
				Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InN0dWRlbnRfaWQiOiIxNTEiLCJzdHVkZW50X25ld19pZCI6IjAyMDA2IiwibmltIjoiRFBTLTAyMDA2IiwibmFtZSI6IkFERlNEU0ZGU1NEIiwiZ2VuZGVyIjoibSIsInNjaG9vbCI6IiIsInNjaGdyYWRlIjoiIiwic3RhdHVzIjoiMiIsInBvaW50IjoiMCIsImVtYWlsIjoibHVibmEubWFoZGFuaWFAbmV0b2ZpZGVhLmNvbSIsIm5pY2tuYW1lIjoiIiwicGhvbmVfbnVtIjoiMSIsIkRPQiI6IjIwMTgtMTAtMTAiLCJwYXJlbnRfbmFtZSI6InBlcCBndWFyZGlvbGEiLCJwYXJlbnRfZW1haWwiOiJwZXAuZ3VhcmRpb2xhQGdtaWwuY29tIiwicGFyZW50X3Bob25lX251bSI6InNkZmZkc2RmIiwidXNlcm5hbWUiOiJEUFMtMDIwMDYiLCJlbmNfcGFzcyI6IjdlYjY2MmY4NmY5MzljNmExZmJhYTFhZDZkZjJkNGJiIiwicGljdHVyZV9wcm9maWxlIjpudWxsLCJwcm9ncmFtX2lkIjoiMSIsImJyYW5jaF9pZCI6IjQiLCJkZWZhdWx0U2NoZWR1bGUwMSI6IjQ4IiwiZGVmYXVsdFNjaGVkdWxlMDIiOiIwIiwiZnJlcXVlbmN5IjoiMSIsImlzVGVzdCI6Ik4iLCJ0b2tlbl9kZXZpY2UiOiIifSwiaWF0IjoxNTM5NzUwMTg2LCJleHAiOjE1NDAzNTQ5ODZ9.FN1g678NVm8hyJtTRt1QenobHxanG9lmucbvkblTXM0',
			},
			body: JSON.stringify({
				avatar: this.state.picture_profile,
				username: this.state.username,
			})
		}).then((response)=> response.json())
			.then((response)=>{

			}).catch((error)=>{
				console.error(error);
			})
	}
	updateValue(text, field){
		if (field == 'username'){
			this.setState({username: text,})
		} 
		else if(field == 'enc_passwd'){
			this.setState({enc_passwd: text,})
		} else if(field=='confirm_passwd'){
			this.setState({confirm_passwd: text})
		} else if(field == 'oldpasswd'){
			this.setState({oldpasswd: text,})
		}
	}
	componentDidMount() {
		this.getStudents();
	}

  render(){
    return(
   	<Container>
      <Header
        style= {{backgroundColor: '#1f80d3'}}>
	      <Left>
	        <Image source={require('../images/kodekiddo.png')} style={{width: 40, height: 32.5}}/>
	      </Left>
	      <Body>
	        <Title><Text style={{fontFamily:"RifficFree", letterSpacing:1, color:'#fff'}}>KODE KIDDO</Text></Title>
	      </Body>
	      <Right>
	      </Right>
    	</Header>
	    <Content>
		    <View style={{padding:10}}>
		    	<View style={{flexDirection: 'column'}}>
		    		<View style={{flex:1, alignItems:'center', justifyContent: 'flex-start'}}>
		    		<View right 
		    			style={{marginTop:0, width: 40, alignItems:'center'}}>
		    				<TouchableOpacity 
		    				onPress={()=>{Alert.alert("Change profile picture", "Choose your new profile picture", 
		    					[
		    						{
		    							text: "Take a picture", onPress: async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
}
		    						}, 
		    						{
		    							text: "Choose from gallery", onPress: async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  },
		    						},
		    						 {
		    						 	text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'
		    						 }
		    					],
		    						{cancelable: true}); }}>
		    					<Text style={{fontSize:8}}>Change Photo</Text>
        						{this._updatePicture()}
		    					</TouchableOpacity>
		    			</View>
		    		</View>
		    		<View style={{flex: 3}}>
		    			<View style={{flexDirection:'column', justifyContent:'space-between'}}>
		    				<View style={{alignItems:'stretch'}}>
		    					<Text style={{margin:10, color:'#737373', fontWeight:'bold'}}>Change Username</Text>
		    					<TextInput 
								    style={{height: 20, marginBottom: 4, borderColor:'#fafafa', borderWidth:1}} 
								    value={this.state.username}
								    onChangeText={(text)=>this.updateValue(text, 'username')}
								    />
		    				</View>
		    				<Button
								title="UPDATE"
								titleStyle={{ fontWeight: "700", fontSize: 10 }}
								buttonStyle={{
									margin:30,
									backgroundColor: "#5eac1a",
									width: 250,
									marginTop:10,
									height: 45,
									borderColor: "transparent",
									borderWidth: 0,
									borderRadius: 25,
									justifyContent:'center',
									alignItems:'center',
								}}
								onPress={this._updateUsername}
								containerStyle={{ marginTop: 20 }}
							/>
		    				<View style={{alignItems:'stretch'}}>
		    					<Text style={{margin:10, color:'#737373', fontWeight:'bold'}}>Change Password</Text>
		    					<TextInput 
								    style={{height: 20, marginBottom: 4, borderColor:'#fafafa', borderWidth:1}} 
								    placeholder="Old Password"
								    onChangeText={(text)=>this.updateValue(text, 'oldpasswd')}
								    secureTextEntry={true}
								    />
			    			</View>
		    				<View style={{alignItems:'stretch'}}>
		    					<TextInput 
								    style={{height: 20, marginBottom: 4, borderColor:'#fafafa', borderWidth:1}} 
								    placeholder="New Password"
								    secureTextEntry={true}
								    onChangeText={(text)=>this.updateValue(text, 'enc_passwd')}
								    />
		    				</View>
                <View style={{alignItems:'stretch'}}>
		    					<TextInput 
								    style={{height: 20, marginBottom: 4, borderColor:'#fafafa', borderWidth:1}} 
								    placeholder="Confirm Password"
								    secureTextEntry={true}
								    onChangeText={(text)=>this.updateValue(text, 'confirm_passwd')}
								    />
		    				</View>
		            	</View>
		            	<View style={{flexDirection:'row', alignItems: 'flex-start', paddingTop: 10}}>
		               		<View style={{alignItems:'center', justifyContent:'center'}}>
								<Button
									  title="EDIT PASSWORD"
									  titleStyle={{ fontWeight: "700", fontSize: 10 }}
									  buttonStyle={{
									margin:30,
									backgroundColor: "#5eac1a",
									width: 250,
									marginTop:10,
									height: 45,
									borderColor: "transparent",
									borderWidth: 0,
									borderRadius: 25,
									justifyContent:'center',
									alignItems:'center',
								}}
									  onPress={this._updatePassword}
									  containerStyle={{ marginTop: 20 }}
									/>
							</View>
		        		</View>
		    		</View>
		    	</View>
		    </View>
		</Content>
	</Container>
    	);
  }
}



  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

_pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true,
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();

        this.setState({
          picture_profile: uploadResult.location
        });
      }
  }
    catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false,
      });
    }
  };


async function uploadImageAsync(uri){
	let apiUrl= `http://localhost/kk-api/edit_profile/`;
	let uriParts = uri.split('.');
	let fileType = uriParts[uriParts.length - 1];
	let formData = new FormData();
	formData.append('photo', {
		uri,
		name:`photo.${fileType}`,
		type: `picture_profile/${fileType}`,
	});
	//update_password
	let option ={
		method: 'POST',
		body: formData,
		headers: {
			Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InN0dWRlbnRfaWQiOiIzIiwic3R1ZGVudF9uZXdfaWQiOm51bGwsIk5JTSI6IiIsIm5hbWUiOiJQaWt1Iiwic2Nob29sIjoiU2VuaW9yIFNjaG9vbCIsInNjaGdyYWRlIjoiU0QgNiIsInN0YXR1cyI6IjEiLCJwb2ludCI6IjAiLCJlbWFpbCI6IiIsIm5pY2tuYW1lIjoiUGlrdSIsInBob25lX251bSI6IiIsIkRPQiI6IjIwMDYtMDktMTMiLCJwYXJlbnRfbmFtZSI6Ikdpa2EiLCJwYXJlbnRfZW1haWwiOiJnaWthQGdpay5nIiwicGFyZW50X3Bob25lX251bSI6IjA3NjY1NTQ0MjMyMyIsInVzZXJuYW1lIjoicGlrdV9waSIsImVuY19wYXNzIjoiNWY0ZGNjM2I1YWE3NjVkNjFkODMyN2RlYjg4MmNmOTkiLCJwaWN0dXJlX3Byb2ZpbGUiOm51bGwsInByb2dyYW1faWQiOiIzIiwiYnJhbmNoX2lkIjoiMyIsImRlZmF1bHRTY2hlZHVsZTAxIjoiMzEiLCJkZWZhdWx0U2NoZWR1bGUwMiI6IiIsImlzVGVzdCI6IlkiLCJ0b2tlbl9kZXZpY2UiOiIifSwiaWF0IjoxNTM3OTI5MjUzLCJleHAiOjE1Mzg1MzQwNTN9.vE6kP5lXKLvG_gjZVaVHlQh2jG4iuEGqZ-qfv-lenxM',
		},
	};
	return fetch(apiUrl, option);
}
