import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../containers/app/Home';
import AllComplaints from '../containers/app/AllCompliants';
import AdminHome from '../containers/app/AdminHome';
import AllPendingUsers from '../containers/app/AllPendingUsers';
import AllUsers from '../containers/app/AllUsers';
import PendingComplaintsAdmin from '../containers/app/PendingComplaintsAdmin';
import SolvedComplaintsAdmin from '../containers/app/SolvedComplaintsAdmin';
import ProgressComplaintsAdmin from '../containers/app/ProgressComplaintsAdmin';
import AllUtilitiesByAdmin from '../containers/app/AllUtilitiesByAdmin';
import UtilityDetailsAdmin from '../containers/app/UtilityDetailsAdmin';
import ComplaintDetailAdmin from '../containers/app/ComplaintDetailAdmin';
import AllComplaintsAdmin from '../containers/app/AllComplaintsAdmin';
import NotificationAdmin from '../containers/app/NotificationAdmin';
import AddNotification from '../containers/app/AddNotification';
import UserDetails from '../containers/app/UserDetails';
import AdminSettings from '../containers/app/AdminSettings';
import AdminProfile from '../containers/app/AdminProfile';
import ChangePasswordAdmin from '../containers/app/ChangePasswordAdmin';
import AllPaymentDetails from '../containers/app/AllPaymentDetails';
import AddPaymentDetail from '../containers/app/AddPaymentDetail';
import UpdatePaymentDetail from '../containers/app/UpdatePaymentDetail';

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminHome"
        component={AdminHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllPendingUsers"
        component={AllPendingUsers}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllUsers"
        component={AllUsers}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PendingComplaintsAdmin"
        component={PendingComplaintsAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SolvedComplaintsAdmin"
        component={SolvedComplaintsAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProgressComplaintsAdmin"
        component={ProgressComplaintsAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllUtilitiesByAdmin"
        component={AllUtilitiesByAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UtilityDetailsAdmin"
        component={UtilityDetailsAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ComplaintDetailAdmin"
        component={ComplaintDetailAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllComplaintsAdmin"
        component={AllComplaintsAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationAdmin"
        component={NotificationAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddNotification"
        component={AddNotification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdminSettings"
        component={AdminSettings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AdminProfile"
        component={AdminProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePasswordAdmin"
        component={ChangePasswordAdmin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllPaymentDetails"
        component={AllPaymentDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddPaymentDetail"
        component={AddPaymentDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdatePaymentDetail"
        component={UpdatePaymentDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AdminStack;
