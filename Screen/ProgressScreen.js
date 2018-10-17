import React from 'react';
import { Component, StyleSheet, FlatList, Text, View, Image, Alert } from 'react-native';
import { StackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Card, Left, CardItem, Title, Container, Right, Content, Header, Body } from 'native-base';
import { Video, Font } from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons, Octicons, } from '@expo/vector-icons';
import BelumLogin from './BelumLogin.js';
import { onSignOut } from '../auth.js';


export default class ProgressScreen extends React.Component{
  static navigationOptions = {
    title: 'Progress',
    }
  //responseSample = "[{\"feeds_id\":\"\",\"branch_id\":\"\",\"title\":\"Holiday Program 2018, June – July 2018\",\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\",\"video_url\":\"http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4\",\"picture_path\":\"require('../images/kodekiddo.png')\",\"thumbnail_path\":\"http://kodekiddo.files.wordpress.com/2018/07/holiday-program-picture7.jpg\",\"posted_by\":\"Lubna\",\"date\":\"20 June 2018\"},{\"feeds_id\":\"\",\"branch_id\":\"\",\"title\":\"Holiday Program 2018, June – July 2018\",\"text\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\",\"video_url\":\"../images/flowers.mp4\",\"picture_path\":\"../images/kodekiddo.png\",\"thumbnail_path\":\"https://kodekiddo.files.wordpress.com/2018/07/holiday-program-picture7.jpg\",\"posted_by\":\"Lubna\",\"date\":\"20 June 2018\"}]";
  getData() {
    fetch('http://localhost/kk-api/summary/student_id/151', {
      method: 'GET',
      headers: {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InN0dWRlbnRfaWQiOiIxNTEiLCJzdHVkZW50X25ld19pZCI6IjAyMDA2IiwibmltIjoiRFBTLTAyMDA2IiwibmFtZSI6IkFERlNEU0ZGU1NEIiwiZ2VuZGVyIjoibSIsInNjaG9vbCI6IiIsInNjaGdyYWRlIjoiIiwic3RhdHVzIjoiMiIsInBvaW50IjoiMCIsImVtYWlsIjoibHVibmEubWFoZGFuaWFAbmV0b2ZpZGVhLmNvbSIsIm5pY2tuYW1lIjoiIiwicGhvbmVfbnVtIjoiMSIsIkRPQiI6IjIwMTgtMTAtMTAiLCJwYXJlbnRfbmFtZSI6InBlcCBndWFyZGlvbGEiLCJwYXJlbnRfZW1haWwiOiJwZXAuZ3VhcmRpb2xhQGdtaWwuY29tIiwicGFyZW50X3Bob25lX251bSI6InNkZmZkc2RmIiwidXNlcm5hbWUiOiJEUFMtMDIwMDYiLCJlbmNfcGFzcyI6IjdlYjY2MmY4NmY5MzljNmExZmJhYTFhZDZkZjJkNGJiIiwicGljdHVyZV9wcm9maWxlIjpudWxsLCJwcm9ncmFtX2lkIjoiMSIsImJyYW5jaF9pZCI6IjQiLCJkZWZhdWx0U2NoZWR1bGUwMSI6IjQ4IiwiZGVmYXVsdFNjaGVkdWxlMDIiOiIwIiwiZnJlcXVlbmN5IjoiMSIsImlzVGVzdCI6Ik4iLCJ0b2tlbl9kZXZpY2UiOiIifSwiaWF0IjoxNTM5NzUwMTg2LCJleHAiOjE1NDAzNTQ5ODZ9.FN1g678NVm8hyJtTRt1QenobHxanG9lmucbvkblTXM0' 
       }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        data: responseJson.data,
        loading: false
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  

constructor (props){
  super(props);
  this.state = {
    refreshing: false,
    data: [],
    loading: true,
  };
}
async componentWillMount() {
    await Expo.Font.loadAsync({
      GROBOLD: require("../assets/fonts/GROBOLD.ttf"),
      RifficFree: require("../assets/fonts/RifficFree-Bold.ttf"),
    });
  }

componentDidMount() {
	this.getData();
}

_renderItem = ({item}) => (
      <ProgressFeed 
       item={item}/>
    );
_keyExtractor = (item, index) => item.feed_id;

_logout = ()=> {Alert.alert('LOGOUT','Are you sure you want to logout?',
  [
    {text: 'Yes', onPress: () => onSignOut()},
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  ])}

  render(){
    if (this.state.loading) {
      return <Expo.AppLoading/>;
    }
  	return(
  	<Container>
  	<Header
  		style= {{backgroundColor: '#1f80d3'}}
		>
		<Left>
		<Image source={require('../images/kodekiddo.png')} style={{width: 40, height: 32.5}}/>
		</Left>
		<Body>
			<Title><Text style={{fontFamily:"RifficFree", letterSpacing:1, color:'#fff'}}>KODE KIDDO</Text></Title>
		</Body>
		<Right>
    <Icon name="bell" color="#fff" size={23} style={{marginRight:10}}/>
		<Icon name="logout" color="#fff" size={23} onPress={this._logout}/>
		</Right>
		
	</Header>
        <Content>
        <FlatList 
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            key={this._keyExtractor}/>
        </Content>
    </Container>
  	);
  }
}

class ProgressFeed extends React.Component{
  renderPicture() {
    if (this.props.item.picture_path == null 
      || this.props.item.picture_path == "") {
      return <View></View>;
    } 
    else {
      return(
        <CardItem>
          <Image source={{uri: this.props.item.picture_path}} style={{ width: 300, height: 300 }}/>
        </CardItem>
      );
    }
  }

  renderThumbnail() {
    if (this.props.item.thumbnail_path == null 
      || this.props.item.thumbnail_path == "") {
      return <View></View>;
    } 
    else {
      return(
        <CardItem>
          <Image source={{uri: this.props.item.thumbnail_path}} style={{ width: 300, height: 300 }}/>
        </CardItem>
      );
    }
  }

  renderVideo() {
    if (this.props.item.video_url == null 
      || this.props.item.video_url == "") {
      return <View></View>;
    } 
    else {
      return(
        <CardItem style={{height:200}}>
          <WebView
            style={{flex:1}}
            javaScriptEnabled={true}
            startInLoadingState={true}
            domStorageEnabled={true}
            source={{uri: this.props.item.youtube_url}}
            useWebKit={true}
          />
        </CardItem>
      );
    }
  }

  render() {
    return(
      <Card>
        <CardItem>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>{this.props.item.title}</Text>
        </CardItem>
        <CardItem>
          <Text>{this.props.item.text}</Text>
        </CardItem>
        {this.renderPicture()}
        {this.renderThumbnail()}
        {this.renderVideo()}
        <CardItem>
          <Text style={{fontSize:9, marginBottom: 0}}>{this.props.item.posted_by}</Text>
        </CardItem>
        <CardItem>
          <Text style={{fontSize:9, marginTop: -20}}>{this.props.item.date}</Text>
        </CardItem>
      </Card>
      );
  }
}


const styles = StyleSheet.create({

	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
  popupContainer:{
    backgroundColor: '#000',
    flex:1,
    marginTop: 70,
    marginBottom:40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius:20,
    borderWidth:4,
    borderColor:'red'
  },
  popupTitle:{
    color:'#fff',
    fontWeight: 'bold',
    fontSize:20,
    textAlign:'center',
    margin:10
  },
  popupExit:{
    flex:1,
    fontSize: 15,
  },
  popupExitButton: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 40,
  },
  textTitle: {
    fontSize: 25,
  },
  PopUpDialog: {
    flex:1,
    justifyContent:'center',
  },
});