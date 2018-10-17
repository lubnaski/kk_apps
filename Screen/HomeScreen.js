import React from 'react';
import { Component, AsyncStorage, StyleSheet, WebView, Dimensions, FlatList, Text, View, Image } from 'react-native';
import { StackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Card, Left, CardItem, Title, Container, Right, Content, Header, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Video, Font } from 'expo';
import VideoPlayer from '@expo/videoplayer';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import PopupDialog, {DialogTitle, DialogButton} from 'react-native-popup-dialog';
var { width, height } = Dimensions.get('window');



export default class HomeScreen extends React.Component{
  static navigationOptions = {
    title: 'Home',
    headerTitle: <Image source={require('../images/kodekiddo.png')} style= {{width: 61, height: 50}}/>,
    headerLeft: <Image source={require('../images/kodekiddo.png')} style= {{width: 61, height: 50}}/>,
  }

  
constructor (props){
  super(props);
  this.state = {
    refreshing: false,
    data:[],
    loading: true,
  };
}


getData() {
    fetch('http://localhost/kk-api/feeds', { 
    	method: 'GET',
    	headers: { 
    		Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InN0dWRlbnRfaWQiOiIzIiwic3R1ZGVudF9uZXdfaWQiOm51bGwsIk5JTSI6IiIsIm5hbWUiOiJQaWt1Iiwic2Nob29sIjoiU2VuaW9yIFNjaG9vbCIsInNjaGdyYWRlIjoiU0QgNiIsInN0YXR1cyI6IjEiLCJwb2ludCI6IjAiLCJlbWFpbCI6IiIsIm5pY2tuYW1lIjoiUGlrdSIsInBob25lX251bSI6IiIsIkRPQiI6IjIwMDYtMDktMTMiLCJwYXJlbnRfbmFtZSI6Ikdpa2EiLCJwYXJlbnRfZW1haWwiOiJnaWthQGdpay5nIiwicGFyZW50X3Bob25lX251bSI6IjA3NjY1NTQ0MjMyMyIsInVzZXJuYW1lIjoicGlrdV9waSIsImVuY19wYXNzIjoiNWY0ZGNjM2I1YWE3NjVkNjFkODMyN2RlYjg4MmNmOTkiLCJwaWN0dXJlX3Byb2ZpbGUiOm51bGwsInByb2dyYW1faWQiOiIzIiwiYnJhbmNoX2lkIjoiMyIsImRlZmF1bHRTY2hlZHVsZTAxIjoiMzEiLCJkZWZhdWx0U2NoZWR1bGUwMiI6IiIsImlzVGVzdCI6IlkiLCJ0b2tlbl9kZXZpY2UiOiIifSwiaWF0IjoxNTM3OTI5MjUzLCJleHAiOjE1Mzg1MzQwNTN9.vE6kP5lXKLvG_gjZVaVHlQh2jG4iuEGqZ-qfv-lenxM' 
    	} 
    })
    	.then((response) => response.json())
    	.then((responseJson) => {
      		this.setState({
        	data: responseJson.data,
        	loading: false
      		});
    	})
    	.catch(error=>{
    		console.log(error);
    	});
  }

async componentWillMount() {
    await Expo.Font.loadAsync({
      GROBOLD: require("../assets/fonts/GROBOLD.ttf"),
      RifficFree: require("../assets/fonts/RifficFree-Bold.ttf"),
    });
    this.setState({ loading: false });
  }


componentDidMount() {
	this.getData();
}

_renderItem = ({item}) => (
      <NewsFeed 
       item={item}
       id={item.id}/>
    );
_keyExtractor = (item) => item.id;

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
		</Right>
	</Header>
        <Content>
          <FlatList 
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            key={this._keyExtractor} />
        </Content>
    </Container>
  	);
  }
}

class NewsFeed extends React.Component{
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
	    if (this.props.item.youtube_url == null 
	      || this.props.item.youtube_url == "") {
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
  render(){
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
});