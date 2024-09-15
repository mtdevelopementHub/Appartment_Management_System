import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../containers/app/Home';
import NewComplaint from '../containers/app/NewComplaint';
import AllComplaints from '../containers/app/AllCompliants';
import CustomerSupport from '../containers/app/CustomerSupport';
import Notification from '../containers/app/Notification';
import ComplaintDetail from '../containers/app/ComplaintDetail';
import Settings from '../containers/app/Settings';
import Profile from '../containers/app/Profile';
import ChangePassword from '../containers/app/ChangePassword';
import AddUtility from '../containers/app/AddUtility';
import AllUtilities from '../containers/app/AllUtilities';
import UtilityDetail from '../containers/app/UtilityDetails';
import AllPaymentDetailsUser from '../containers/app/AllPaymentDetailsUser';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddUtility"
        component={AddUtility}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewComplaint"
        component={NewComplaint}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllComplaints"
        component={AllComplaints}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerSupport"
        component={CustomerSupport}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ComplaintDetail"
        component={ComplaintDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllUtilities"
        component={AllUtilities}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UtilityDetail"
        component={UtilityDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllPaymentDetailsUser"
        component={AllPaymentDetailsUser}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
