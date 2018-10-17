import React from 'react';
import { Text, View } from 'react-native';
import {Permissions, Notifications} from 'expo';






export default class AppContainer extends React.Component {
  state = {
    loading:true,
    notification: {},
    payment:[],
    token: null,
    notification: null,
    title:'',
    body:'',
    remaining:'',
  };
  
  getPayment(){
    fetch('http://localhost/kk-api/student/payment/id/$student_id', {
      method:'GET',
      headers:{
        Authorization: '$token',
      },
    })
    .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
          payment: responseJson.data,
          loading: false,
          });
      })
      .catch(error=>{
        console.log(error);
      });
  }

  async registerForPushNotifications() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();

    this.subscription = Notifications.addListener(this.handleNotification);

    this.setState({
      token,
    });
  }

  sendPushNotification(token = this.state.token, title = this.state.title, body = this.state.body) {
    return fetch('someURL', {
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        data: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }

  handleNotification = notification => {
    this.setState({
      notification,
    });
  };

  componentDidMount() {
    getPayment();
  }

  render() {
    if (this.state.payment.remaining <= 2 )
    return this.sendPushNotification();
  }
}