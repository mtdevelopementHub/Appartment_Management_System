import React,{useEffect,useState} from "react";
import { View,Text } from "react-native";
import Login from "./src/containers/auth/Login";
import Signup from "./src/containers/auth/Signup";
import OptVerification from "./src/containers/auth/OtpVerfication";
import ForgotPassword from "./src/containers/auth/ForgotPassword";
import { NavigationContainer } from "@react-navigation/native";
import {helper} from "./src/helper/Helper"
import { PermissionsAndroid } from 'react-native';
import WelcomePage from "./src/containers/auth/WelcomePage";
import Home from "./src/containers/app/Home";
import AllComplaints from "./src/containers/app/AllCompliants";
import CustomerSupport from "./src/containers/app/CustomerSupport";
import Notification from "./src/containers/app/Notification";
import NewComplaint from "./src/containers/app/NewComplaint";
import AppStack from "./src/navigation/AppStack";
import AuthStack from "./src/navigation/AuthStack";
import Toast from "react-native-toast-message";
import AppProvider from "./src/context/index"
import Navigation from "./src/navigation";



 
const App=()=>{     
  
      return (
        <>
        <AppProvider>
          <Navigation/>
        </AppProvider>
        <Toast/>
        </>
      );
}

export default App