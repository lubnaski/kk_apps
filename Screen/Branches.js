import React, {Component} from 'react';
import {Platform, ScrollView, Alert, TextInput, Navigator, Slider, StyleSheet, Text, View, Image, TouchableOpacity, Picker, AsyncStorage } from 'react-native';
import { Card, Left, CardItem, Title, Container, Right, Content, Header, Body, Icon } from 'native-base';
import {Button} from 'react-native-elements';
import {MapView} from 'expo';

export default class Branches extends React.Component{
	constructor(props){
    	super(props);
    	this.state ={
    		cabang: [],
        branch_id:'',
        name:'',
        address:'',
    		loading: false,
    	}
    }
    getBranches(){
    	fetch('http://localhost/kk-api/branch/', {
    		method: 'GET',
    	})
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
          cabang: responseJson.data,
          loading: true,
          })
          responseJson.forEach((item)=>{
          this.state.cabang.push({
           branch_id:item.branch_id,
           name: item.name,
           address: item.address,
          })
          })
          cabang.map((item)=>{console.log(item.name)})
          cabang.map((item)=>{console.log(item.address)})
          console.log(responseJson);
          return responseJson;
      })
    	.catch(error=>{
    		console.log(error);
    	});
    }
    componentDidMount() {
	this.getBranches();
}
_keyExtractor = (item) => item.branch_id;
  render(){
    const namaCabang = this.state.cabang.map((item, branch_id)=> {
      return(
        <Text>{item.name}</Text>)
    });
    const alamatCabang = this.state.cabang.map((item, branch_id)=> {
      return(
        <Text>{item.address}</Text>)
    });
    const pickerCabang = this.state.cabang.map((item, branch_id)=> {
      return(
            <Picker.Item
            label={item.name}
            value={item.address}
            key={this._keyExtractor}/>
        )
    });
    return(
     <View style={{margin: 10, padding: 10, flexDirection: 'column', alignSelf: 'flex-start', alignItems: 'stretch'}}>
  <Text style={{margin: 0, alignItems: 'stretch', flex:1, fontWeight: 'bold'}}>KodeKiddo <Text>{this.state.name}</Text></Text>
  <View style={{margin: 0, alignItems: 'stretch', flex:2}}><Text>{this.state.name}</Text></View>
<MapView
    initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
    style={{height: 200, width: 200, padding: 10, flex: 3, justifyContent: 'space-around'}}
  />
    <Picker
          selectedValue={this.state.name}
          mode="dropdown"
          style={{ height: 50, justifyContent: 'center', flex:4, alignItems: 'stretch', }}
          onValueChange={(item)=> this.setState({name: item})}>
  		{pickerCabang}
    </Picker>
    </View>
    	);
  }
}