import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../constants/styles';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/redux/auth';
import { useNavigation } from '@react-navigation/native';

function LogoutScreen() {

  const dispatch = useDispatch();
  dispatch(logout());

    return (
    <View>
        <Text>You Are logged out</Text>
    </View>);
}

export default LogoutScreen;