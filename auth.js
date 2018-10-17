import { AsyncStorage } from 'react-native';
export const onSignIn = ()=> AsyncStorage.setItem('token', token);
export const onSignOut = ()=> AsyncStorage.removeItem(token);
export const setStorage = (data) => AsyncStorage.setItem('data', JSON.stringify(data));

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InN0dWRlbnRfaWQiOiIxNTEiLCJzdHVkZW50X25ld19pZCI6IjAyMDA2IiwibmltIjoiRFBTLTAyMDA2IiwibmFtZSI6IkFERlNEU0ZGU1NEIiwiZ2VuZGVyIjoibSIsInNjaG9vbCI6IiIsInNjaGdyYWRlIjoiIiwic3RhdHVzIjoiMiIsInBvaW50IjoiMCIsImVtYWlsIjoibHVibmEubWFoZGFuaWFAbmV0b2ZpZGVhLmNvbSIsIm5pY2tuYW1lIjoiIiwicGhvbmVfbnVtIjoiMSIsIkRPQiI6IjIwMTgtMTAtMTAiLCJwYXJlbnRfbmFtZSI6InBlcCBndWFyZGlvbGEiLCJwYXJlbnRfZW1haWwiOiJwZXAuZ3VhcmRpb2xhQGdtaWwuY29tIiwicGFyZW50X3Bob25lX251bSI6InNkZmZkc2RmIiwidXNlcm5hbWUiOiJEUFMtMDIwMDYiLCJlbmNfcGFzcyI6IjdlYjY2MmY4NmY5MzljNmExZmJhYTFhZDZkZjJkNGJiIiwicGljdHVyZV9wcm9maWxlIjpudWxsLCJwcm9ncmFtX2lkIjoiMSIsImJyYW5jaF9pZCI6IjQiLCJkZWZhdWx0U2NoZWR1bGUwMSI6IjQ4IiwiZGVmYXVsdFNjaGVkdWxlMDIiOiIwIiwiZnJlcXVlbmN5IjoiMSIsImlzVGVzdCI6Ik4iLCJ0b2tlbl9kZXZpY2UiOiIifSwiaWF0IjoxNTM5NzUwMTg2LCJleHAiOjE1NDAzNTQ5ODZ9.FN1g678NVm8hyJtTRt1QenobHxanG9lmucbvkblTXM0';

export const isSignedIn = () => {
	return new Promise((resolve, reject) =>{
		AsyncStorage.getItem(token)
		.then(res=>{
			if (res !== null){
				resolve(true);
			} else{
				resolve(false);
			}
		})
		.catch(err=> reject(err));
	});
};
