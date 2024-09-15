import React, {useState} from 'react';
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
import Toast from 'react-native-toast-message';
import {resetPasswordAdmin, sendCodeAdminForget} from '../../services/Admin';
import { sendCodeForget } from '../../services/User';
const ForgotPassword = () => {
  const [userData, setUserData] = useState({
    email: '',
    newPassword: '',
  });
  const [isloading, setIsLoading] = useState(false);

  const handleOnChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSendCode = () => {
    const {email, newPassword} = userData;
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Email is required',
      });
      return;
    }
    if (!newPassword) {
      Toast.show({
        type: 'error',
        text1: 'error',
        text2: 'Email is required',
      });
      return;
    } else {
      let body = {
        email: email,
        newPassword: newPassword,
      };
      sendCodeAdminForget(body)
        .then(res => {
          setIsLoading(false);
          if (res?.status == 200) {
            Toast.show({
              type: 'success',
              text1: 'Suceess',
              text2: `Verification code has been sent to ${email} `,
            });
            navigation.navigate('OtpVerfication', {
              data:userData,
              registerUser: resetPasswordAdmin,
              navigateTo: 'LoginAdmin',
              codeSend: sendCodeAdminForget,
              codeBody: body,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: res?.data?.message,
            });
          }
        })
        .catch(error => {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Something went wrong',
          });
        });
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#bde4f4',
      }}>
      <View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={Images.houseImage}
            style={{height: width(60), width: width(80)}}
            resizeMode="contain"
          />
        </View>
        <View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#404969', fontSize: 30, fontWeight: '700'}}>
              Forgot Password Admin
            </Text>
          </View>

          <KeyboardAwareScrollView>
            <View style={{marginTop: width(15)}}>
              <View style={{marginHorizontal: width(5)}}>
                <TextField placeHolder="Email" tag="Enter your email" 
                value={userData?.email}
                onChange={(text)=>handleOnChange("email",text)}
                />
              </View>
            </View>
            <View style={{marginTop: width(5)}}>
              <View style={{marginHorizontal: width(5)}}>
                <TextField
                  placeHolder="New Password"
                  tag="Enter your new password"
                  value={userData?.newPassword}
                  onChange={(text)=>handleOnChange("newPassword",text)}
                />
              </View>
            </View>
            <View style={{alignItems: 'center', marginTop: width(5)}}>
              <Text
                style={{
                  color: Colors.darkGrey,
                  fontSize: width(4),
                  fontWeight: '500',
                }}>
                Didn’t recieve otp?{' '}
                <Text
                  style={{
                    color: Colors.headingColor,
                  }}>
                  Resend
                </Text>
              </Text>
            </View>
            <View style={{marginHorizontal: width(5), marginTop: width(5)}}>
              <Button
                color={'white'}
                text={'Send OTP'}
                fontSize={18}
                backgroundColor={Colors.blue}
                onPress={handleSendCode}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
