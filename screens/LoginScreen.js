import { useContext, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
//import { AuthContext } from '../store/auth-context';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/redux/auth';
import { store } from './store/redux/store';


import { authenticateUser } from '../util/auth';
import { useNavigation } from '@react-navigation/native';
import {ACPAnalytics} from '@adobe/react-native-acpanalytics';
import {ACPCore} from '@adobe/react-native-acpcore';


function LoginScreen() {

  const [isLoading,setIsLoading] = useState(false);
  //const AuthData = useContext(AuthContext);
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function userLogin({email,password}) {
    setIsLoading(true);
    try {
      const data = await authenticateUser(email,password);
      const token = data.token;
      const hashedEmail = data.encryptedUserId;
      dispatch(login({token:token,hashedEmail:hashedEmail}));
      console.log("Data"+JSON.stringify(data)+" Token "+token+" HashedEmail "+hashedEmail);
      var contextData = {"screen": "LoginScreen",
                    "language":"English",
                    "category":"LoginPage",
                    "userid":hashedEmail,
                    "loginStatus":true};

      console.log("Inside Login Screen"+ JSON.stringify(contextData)+" "+JSON.stringify(data));

      // send the tracking call - use either a trackAction or trackState call.
      // trackAction example:
      ACPCore.trackAction("Login", contextData);
      // trackState example:
      ACPCore.trackState("Login", contextData);
      navigation.navigate("Drawer");
      //AuthData.authenticate(token);
    } catch(error){
      console.log(error);
      Alert.alert('Authentication Failed','Please check your credentials and then try logging in');
    }
    setIsLoading(false);
  }

  if(isLoading){
    return <LoadingOverlay message="User Login in progress" />
  }


  return <AuthContent isLogin onAuthenticate={userLogin}/>;

}

export default LoginScreen;
