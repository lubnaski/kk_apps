import React from 'react';
import { createRootNavigator } from './router.js';
import { isSignedIn } from './auth.js';

export default class Index extends React.Component{
	constructor(props){
		super(props);
		this.state={
			signedIn: false,
			checkedSignIn: false,
		};
	}
	componentDidMount(){
		isSignedIn()
		.then(res=> this.setState({signedIn: res, checkedSignIn: true}))
		.catch(err=> alert("An error occured"));
	}
	render(){
		const{
			checkedSignIn, signedIn
		} = this.state;
		if(!checkedSignIn){
			return null;
		}
		const Layout = createRootNavigator(signedIn);
		return <Layout/>;
	}
}