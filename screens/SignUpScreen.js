import { useContext,useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay'
//import { AuthContext } from '../store/auth-context';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/redux/auth';

import { createUser } from '../util/auth';
import {ACPAnalytics} from '@adobe/react-native-acpanalytics';
import {ACPCore} from '@adobe/react-native-acpcore';
import { store } from './store/redux/store';


function SignupScreen() {

  const [isLoading,setIsLoading] = useState(false);
  const dispatch = useDispatch();

  //const AuthData = useContext(AuthContext);

  async function addUsers({email,password,name}) {
    setIsLoading(true);
    const data = await createUser(email,password,name);
    //AuthData.authenticate(idToken);
    dispatch(login({token:data.token,hashedEmail:data.encryptedEmail}));
    var contextData = {"screen": "SignUpScreen",
                    "language":"English",
                    "category":"SignUpPage",
                    "userid":data.encryptedEmail,
                    "loginStatus":true};

      // send the tracking call - use either a trackAction or trackState call.
      // trackAction example:
      ACPCore.trackAction("SignUp", contextData);
      // trackState example:
      ACPCore.trackState("SignUp", contextData);
      navigation.navigate("Drawer");
    setIsLoading(false);
  }

  if(isLoading){
    return <LoadingOverlay message="User Creation in progress" />
  }

  return <AuthContent onAuthenticate={addUsers} />;
}

export default SignupScreen;
