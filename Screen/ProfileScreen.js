import React, {Component} from 'react';
import {Platform, ScrollView, Dimensions, Alert, Navigator, Slider, StyleSheet, Text, View, Image, TouchableOpacity, Picker, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Card, Left, Icon, Thumbnail, Segment, Button, CardItem, Title, Container, Right, Content, Header, Body } from 'native-base';
import ProfileTab from './ProfileTab.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Font} from 'expo';

var {height, width} = Dimensions.get('window');


//buat foto achievement, milestones, dll
var images=[
	require('../images/MilestoneCertificate1.png'),
	require('../images/MilestoneCertificate2.png'),
	require('../images/MilestoneCertificate3.png'),
	require('../images/MilestoneCertificate1.png'),
];

	

export default class Root extends React.Component{
	render(){
		return <RootStack/>;
	}
} 


export class ProfileScreen extends React.Component{
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#1f80d3',
    },
    headerTintColor: '#fff',
	}
    constructor(props){
    	super(props);
    	this.state ={
    		activeIndex: 0,
    		loading: true,
    		poin: '',
    		achievement: '',
    		milestones: '',
    		student: [],
            milestones_pdf:'',
    	}
    }

    segmentClicked(index){
    	this.setState({
    		activeIndex: index,
    		loading: true
    	});
    }
    async componentWillMount() {
    await Expo.Font.loadAsync({
      GROBOLD: require("../assets/fonts/GROBOLD.ttf"),
      RifficFree: require("../assets/fonts/RifficFree-Bold.ttf"),
    });
    this.setState({ loading: false });
  }
    checkActive=(index)=>{
    	if (this.state.activeIndex!==index){
    		return(
    			{color: 'grey'}
    		);
    	}
    	else {
    		return(
    			{}
    		);
    	}
    }
    renderSectionOne(){
    	return images.map((image, index)=>{
    		return(
    			<View key={index} style={[{width: (width)/4, height: (width)/4}, {marginBottom:2}, index%3!==0? {paddingLeft: 2}:{paddingLeft: 0}]}>
    				<Image style={{flex:1, alignSelf:'stretch', width: undefined, height: undefined}} source={image}/>
    			</View>
    			);
    	});
    }
    renderSectionMilestones(){
        return milestones_pdf.map((milestones_pdf, index)=>{
            return(
                <View key={index} style={[{width: (width)/4, height: (width)/4}, {marginBottom:2}, index%3!==0? {paddingLeft: 2}:{paddingLeft: 0}]}>
                    <Image style={{flex:1, alignSelf:'stretch', width: undefined, height: undefined}} source={milestones_pdf}/>
                </View>
                );
        });
    }
    renderPoint(){
    fetch('http://localhost/kk-api/student/poin/id/151', { 
    	method: 'GET',
    	headers: { 
    		Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InN0dWRlbnRfaWQiOiIxNTEiLCJzdHVkZW50X25ld19pZCI6IjAyMDA2IiwibmltIjoiRFBTLTAyMDA2IiwibmFtZSI6IkFERlNEU0ZGU1NEIiwiZ2VuZGVyIjoibSIsInNjaG9vbCI6IiIsInNjaGdyYWRlIjoiIiwic3RhdHVzIjoiMiIsInBvaW50IjoiMCIsImVtYWlsIjoibHVibmEubWFoZGFuaWFAbmV0b2ZpZGVhLmNvbSIsIm5pY2tuYW1lIjoiIiwicGhvbmVfbnVtIjoiMSIsIkRPQiI6IjIwMTgtMTAtMTAiLCJwYXJlbnRfbmFtZSI6InBlcCBndWFyZGlvbGEiLCJwYXJlbnRfZW1haWwiOiJwZXAuZ3VhcmRpb2xhQGdtaWwuY29tIiwicGFyZW50X3Bob25lX251bSI6InNkZmZkc2RmIiwidXNlcm5hbWUiOiJEUFMtMDIwMDYiLCJlbmNfcGFzcyI6IjdlYjY2MmY4NmY5MzljNmExZmJhYTFhZDZkZjJkNGJiIiwicGljdHVyZV9wcm9maWxlIjpudWxsLCJwcm9ncmFtX2lkIjoiMSIsImJyYW5jaF9pZCI6IjQiLCJkZWZhdWx0U2NoZWR1bGUwMSI6IjQ4IiwiZGVmYXVsdFNjaGVkdWxlMDIiOiIwIiwiZnJlcXVlbmN5IjoiMSIsImlzVGVzdCI6Ik4iLCJ0b2tlbl9kZXZpY2UiOiIifSwiaWF0IjoxNTM5NzUwMTg2LCJleHAiOjE1NDAzNTQ5ODZ9.FN1g678NVm8hyJtTRt1QenobHxanG9lmucbvkblTXM0' 
    	} 
    })
    	.then((response) => response.json())
    	.then((responseJson) => {
      		this.setState({
        	poin: responseJson.data,
        	loading: false
      		});
    	})
    	.catch(error=>{
    		console.log(error);
    	});
    }
    renderAchievement(){
    	fetch('http://localhost/kk-api/student/count_achievement/id/151', { 
    	method: 'GET',
    	headers: { 
    		Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InN0dWRlbnRfaWQiOiIxNTEiLCJzdHVkZW50X25ld19pZCI6IjAyMDA2IiwibmltIjoiRFBTLTAyMDA2IiwibmFtZSI6IkFERlNEU0ZGU1NEIiwiZ2VuZGVyIjoibSIsInNjaG9vbCI6IiIsInNjaGdyYWRlIjoiIiwic3RhdHVzIjoiMiIsInBvaW50IjoiMCIsImVtYWlsIjoibHVibmEubWFoZGFuaWFAbmV0b2ZpZGVhLmNvbSIsIm5pY2tuYW1lIjoiIiwicGhvbmVfbnVtIjoiMSIsIkRPQiI6IjIwMTgtMTAtMTAiLCJwYXJlbnRfbmFtZSI6InBlcCBndWFyZGlvbGEiLCJwYXJlbnRfZW1haWwiOiJwZXAuZ3VhcmRpb2xhQGdtaWwuY29tIiwicGFyZW50X3Bob25lX251bSI6InNkZmZkc2RmIiwidXNlcm5hbWUiOiJEUFMtMDIwMDYiLCJlbmNfcGFzcyI6IjdlYjY2MmY4NmY5MzljNmExZmJhYTFhZDZkZjJkNGJiIiwicGljdHVyZV9wcm9maWxlIjpudWxsLCJwcm9ncmFtX2lkIjoiMSIsImJyYW5jaF9pZCI6IjQiLCJkZWZhdWx0U2NoZWR1bGUwMSI6IjQ4IiwiZGVmYXVsdFNjaGVkdWxlMDIiOiIwIiwiZnJlcXVlbmN5IjoiMSIsImlzVGVzdCI6Ik4iLCJ0b2tlbl9kZXZpY2UiOiIifSwiaWF0IjoxNTM5NzUwMTg2LCJleHAiOjE1NDAzNTQ5ODZ9.FN1g678NVm8hyJtTRt1QenobHxanG9lmucbvkblTXM0',
        } 
    })
    	.then((response) => response.json())
    	.then((responseJson) => {
      		this.setState({
        	achievemnet: responseJson.data,
        	loading: false
      		});
    	})
    	.catch(error=>{
    		console.log(error);
    	});
    }
    renderProfile(){
		fetch('http://localhost/kk-api/student/id/151',{
		method: 'GET',
		headers:{
			Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InN0dWRlbnRfaWQiOiIxNTEiLCJzdHVkZW50X25ld19pZCI6IjAyMDA2IiwibmltIjoiRFBTLTAyMDA2IiwibmFtZSI6IkFERlNEU0ZGU1NEIiwiZ2VuZGVyIjoibSIsInNjaG9vbCI6IiIsInNjaGdyYWRlIjoiIiwic3RhdHVzIjoiMiIsInBvaW50IjoiMCIsImVtYWlsIjoibHVibmEubWFoZGFuaWFAbmV0b2ZpZGVhLmNvbSIsIm5pY2tuYW1lIjoiIiwicGhvbmVfbnVtIjoiMSIsIkRPQiI6IjIwMTgtMTAtMTAiLCJwYXJlbnRfbmFtZSI6InBlcCBndWFyZGlvbGEiLCJwYXJlbnRfZW1haWwiOiJwZXAuZ3VhcmRpb2xhQGdtaWwuY29tIiwicGFyZW50X3Bob25lX251bSI6InNkZmZkc2RmIiwidXNlcm5hbWUiOiJEUFMtMDIwMDYiLCJlbmNfcGFzcyI6IjdlYjY2MmY4NmY5MzljNmExZmJhYTFhZDZkZjJkNGJiIiwicGljdHVyZV9wcm9maWxlIjpudWxsLCJwcm9ncmFtX2lkIjoiMSIsImJyYW5jaF9pZCI6IjQiLCJkZWZhdWx0U2NoZWR1bGUwMSI6IjQ4IiwiZGVmYXVsdFNjaGVkdWxlMDIiOiIwIiwiZnJlcXVlbmN5IjoiMSIsImlzVGVzdCI6Ik4iLCJ0b2tlbl9kZXZpY2UiOiIifSwiaWF0IjoxNTM5NzUwMTg2LCJleHAiOjE1NDAzNTQ5ODZ9.FN1g678NVm8hyJtTRt1QenobHxanG9lmucbvkblTXM0',
		}
		})
		.then ((response)=> response.json())
		.then((responseData)=>{
			this.setState({
			student: responseData.data,
			loading: false,
			});
		})
		.catch((error)=>{
			console.log(error);
		});
    }


    renderMilestones(){
    	fetch('http://localhost/kk-api/student/count_milestones/id/151', { 
    	method: 'GET',
    	headers: { 
    		Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InN0dWRlbnRfaWQiOiIxNTEiLCJzdHVkZW50X25ld19pZCI6IjAyMDA2IiwibmltIjoiRFBTLTAyMDA2IiwibmFtZSI6IkFERlNEU0ZGU1NEIiwiZ2VuZGVyIjoibSIsInNjaG9vbCI6IiIsInNjaGdyYWRlIjoiIiwic3RhdHVzIjoiMiIsInBvaW50IjoiMCIsImVtYWlsIjoibHVibmEubWFoZGFuaWFAbmV0b2ZpZGVhLmNvbSIsIm5pY2tuYW1lIjoiIiwicGhvbmVfbnVtIjoiMSIsIkRPQiI6IjIwMTgtMTAtMTAiLCJwYXJlbnRfbmFtZSI6InBlcCBndWFyZGlvbGEiLCJwYXJlbnRfZW1haWwiOiJwZXAuZ3VhcmRpb2xhQGdtaWwuY29tIiwicGFyZW50X3Bob25lX251bSI6InNkZmZkc2RmIiwidXNlcm5hbWUiOiJEUFMtMDIwMDYiLCJlbmNfcGFzcyI6IjdlYjY2MmY4NmY5MzljNmExZmJhYTFhZDZkZjJkNGJiIiwicGljdHVyZV9wcm9maWxlIjpudWxsLCJwcm9ncmFtX2lkIjoiMSIsImJyYW5jaF9pZCI6IjQiLCJkZWZhdWx0U2NoZWR1bGUwMSI6IjQ4IiwiZGVmYXVsdFNjaGVkdWxlMDIiOiIwIiwiZnJlcXVlbmN5IjoiMSIsImlzVGVzdCI6Ik4iLCJ0b2tlbl9kZXZpY2UiOiIifSwiaWF0IjoxNTM5NzUwMTg2LCJleHAiOjE1NDAzNTQ5ODZ9.FN1g678NVm8hyJtTRt1QenobHxanG9lmucbvkblTXM0' 
    	} 
    })
    	.then((response) => response.json())
    	.then((responseJson) => {
      		this.setState({
        	milestones: responseJson.data,
        	loading: false
      		});
    	})
    	.catch(error=>{
    		console.log(error);
    	});
    }
    renderSection(){
    	if (this.state.activeIndex ==0){
    		return(
    			<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
    				{this.renderSectionOne()}
    			</View>
    			);
    	} else if(this.state.activeIndex==1){
    		return(
    			<View>
    				<CardComponent imageSource="1" likes="101"/>
    				<CardComponent imageSource="2" likes="101"/>
    				<CardComponent imageSource="3" likes="101"/>
    			</View>
    		);
    	}
    }
    componentDidMount(){
    	console.log(width);
    	 this.renderPoint();
         this.renderProfile();
    	this.renderMilestones();
    	this.renderAchievement();
        Alert.alert(console.log(this.state.student.name));
    }
  render(){
  	if (this.state.loading) {
      return <Expo.AppLoading/>;
    }
    return(
    <Container>
	    <Content>
		    <View style={{padding:10}}>
		    	<View style={{flexDirection: 'row'}}>
		    		<View style={{flex:1, alignItems:'center', justifyContent: 'flex-start'}}>
		    			<Image source= {require('../images/profilecontoh.jpg')} style={{width: 75, height: 75, borderRadius: 37.5}}/>
		    		</View>
		    		<View style={{flex: 3}}>
		    			<View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'flex-end'}}>
		    				<View style={{alignItems:'center'}}>
		    					<Text>{this.state.student.poin}</Text> 
		    					<Text style={{fontSize: 10, color:'grey'}}>Points</Text>
		    				</View>
		    				<View style={{alignItems:'center'}}>
		    					<Text>{this.state.milestones}</Text>
		    					<Text style={{ fontSize: 10, color: 'grey' }}>Milestones</Text>
		                    </View>
		                    <View style={{alignItems:'center'}}>
		    					<Text>{this.state.achievement}</Text>
		    					<Text style={{ fontSize: 10, color: 'grey' }}>Achievement</Text>
		                    </View>
		                  </View>
		               <View style={{flexDirection:'row', alignItems: 'flex-start', paddingTop: 10}}>
		               		<View style={{flexDirection: 'row'}}>
		               			<Button bordered dark style={{flex:3, marginLeft:10, marginRight: 10, justifyContent: 'center', height:30}} onPress={() => this.props.navigation.navigate('ProfileTab')}>
		               				<Text>Edit Profile</Text>
		               			</Button>
		         			</View>
		        		</View>
		    		</View>
		    	</View>
		    	<View style={{paddingBottom:10}}>
		    		<View style={{paddingHorizontal:10}}>
		    			<Text style={{fontWeight: 'bold', marginTop:4}}>{this.state.name}</Text>
		    			<Text>Student nickname</Text>
		    			<Text>liverpoolfc.com</Text>
		    		</View>
		    	</View>
		    </View>
		    <View>
		    <View style={{borderWidth: 0.5, borderColor:'#fafafa', margin:5}}></View>
		 	<Text style={{margin: 10, fontWeight: 'bold'}}>Milestones</Text>
		 	{this.renderSection()}
		 	<Text style={{margin: 10, fontWeight: 'bold'}}>Achievement</Text>
		 	{this.renderSection()}
		    </View>
	    </Content>
    </Container>
    );
  }
}

class CardComponent extends Component {
	render(){
		const images={
			"1": require('../images/kodekiddo.png'),
			"2": require('../images/kodekiddo.png'),
			"3": require('../images/kodekiddo.png'),
		}
		return(
		<Card>
			<CardItem>
				<Left>
					<Thumbnail source={require('../images/kodekiddo.png')}/>
					<Body>
						<Text>Mane</Text>
						<Text note>Feb 23, 2019</Text>
					</Body>
				</Left>
			</CardItem>
			<CardItem cardBody>
				<Image source={images[this.props.imageSource]} style={{height:200, width:null, flex:1}}/>
			</CardItem>
			<CardItem style={{height: 45}}>
				<Left>
					<Button transparent>
						<Icon name="ios-heart-outline" style={{color: 'black'}}/>
					</Button>
					<Button transparent>
						<Icon name="ios-chatbubbles-outline" style={{ color: 'black' }} />
                    </Button>
                    <Button transparent>
                        <Icon name="ios-send-outline" style={{ color: 'black' }} />
                    </Button>
                 </Left>
              </CardItem>
              <CardItem>
              	<Body>
              		<Text>
              			<Text style={{fontWeight:"900"}}>Mane</Text>
              			YNWA
              		</Text>
              	</Body>
              </CardItem>
        </Card>
		);
	}
}

class OpenPDF extends React.Component{
	render(){
		return(
		<View style={{flex:1, justifyContent:'flex-start', alignItems:'center', margin:'10'}}>
			<PDFReader
				source={milestones}
			/>
		</View>
		);
	}
}

const RootStack = createStackNavigator({
	Profile: {
		screen: ProfileScreen,
		navigationOptions:{
			title: 'Profile',
		}
	},
	ProfileTab:{
		screen: ProfileTab,
		navigationOptions:{
			title: 'Profile',
		}
	},
},
	{
		initialRouteName: 'Profile',
	}
);

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
