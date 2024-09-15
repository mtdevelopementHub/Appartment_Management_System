import React, { useContext, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import TextField from '../../components/TextField';
import {width} from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/Button';
import Picker from '../../components/Picker';
import Loader from '../../components/Loader';
import { loginAppartmentAdmin } from '../../services/Admin';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../context';
import Toast from 'react-native-toast-message';
const LoginAdmin = () => {
  const {adminLogin} =useContext(AppContext)
  const navigation=useNavigation()
  const [user,setUser]=useState({
    email:"",
    password:""
  })
  const [isloading,setIsLoading]=useState(false)


  const handleOnChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignIn = () => {
    const { password,email} = user;
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    if (!email || !emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Valid email is required',
      });
      return;
    }
    if (!password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Password is required',
      });
      return;
    }else{
      setIsLoading(true)
      loginAppartmentAdmin(user)
      .then((res)=>{
        setIsLoading(false)
        if (res?.status==200) {
          adminLogin(res?.data?.data)
          Toast.show({
            type: 'success',
            text1: 'Suceess',
            text2:res?.data?.message,
          });
        }else{
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:res?.data?.message,
          });
        }
      }).catch((error)=>{
        setIsLoading(false)
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:"Something went wrong",
        });
      })
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#bde4f4",
      }}>
        <Loader isloading={isloading}/>
      <View>
        <View style={{alignItems:"center"}}>
          <Image source={Images.houseImage}
          style={{height: width(60), width: width(80)}}
          resizeMode="contain"/>
        </View>
        <View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{color: "#404969", fontSize: 30, fontWeight: '700'}}>
            Welcome</Text>
        </View>
        <View style={{alignItems: 'center', }}>
          <Text style={{color: Colors.headingColor, fontSize: 20}}>
          Login to your appartment admin account
          </Text>
        </View>

        <KeyboardAwareScrollView>
          <View style={{marginTop: width(10)}}>
            <View style={{marginHorizontal: width(5)}}>
              <TextField
                placeHolder="Email"
                tag="Email Address"
                value={user?.email}
                onChange={text => handleOnChange('email', text)}
              />
            </View>
            <View style={{marginHorizontal:  width(5), marginTop: width(4)}}>
              <TextField
                placeHolder="Password"
                tag="Password"
                value={user?.password}
                onChange={text => handleOnChange('password', text)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'flex-end',
              marginHorizontal: width(5),
              marginTop: width(5),
            }}
            onPress={()=>navigation.navigate("ForgotPassword")}
            >
            <Text
              style={{
                color:"red",
                fontWeight: '600',
                fontSize: 12,
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <View style={{marginHorizontal: width(5), marginTop: width(5)}}>
            <Button
              color={'white'}
              text={'Sign In'}
              fontSize={18}
              backgroundColor={Colors.blue}
              onPress={handleSignIn}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: width(5)}}>
            <Text
              style={{
                color: Colors.darkGrey,
                fontSize: width(4),
                fontWeight: '500',
              }}>
              Don’t have an Account?{' '}
              <Text
                style={{
                  color: Colors.headingColor,
                }}
                onPress={()=>navigation.navigate("SignupAdmin")}
                >
                Register
              </Text>
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: width(2),
              marginTop: width(5),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            
          </View>
        </KeyboardAwareScrollView>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginAdmin;
