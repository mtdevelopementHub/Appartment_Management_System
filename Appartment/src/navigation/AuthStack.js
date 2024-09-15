import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ForgotPassword from '../containers/auth/ForgotPassword';
import OtpVerfication from '../containers/auth/OtpVerfication';
import Login from '../containers/auth/Login';
import SignUp from '../containers/auth/Signup';
import WelcomePage from '../containers/auth/WelcomePage';
import SignupAdmin from '../containers/auth/SignupAdmin';
import LoginAdmin from '../containers/auth/LoginAdmin';
import ForgotPasswordUser from '../containers/auth/ForgotPasswordUser';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomePage"
        component={WelcomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignupAdmin"
        component={SignupAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginAdmin"
        component={LoginAdmin}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPasswordUser"
        component={ForgotPasswordUser}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OtpVerfication"
        component={OtpVerfication}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
