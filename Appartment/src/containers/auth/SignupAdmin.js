import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import TextField from '../../components/TextField';
import {width} from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/Button';
import Toast from 'react-native-toast-message';
import { registerAppartmentAdmin, sendCode, sendCodeAdmin } from '../../services/Admin';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader';

const SignupAdmin = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phoneNo: '',
    role:"Admin"
  });
  const [isloading,setIsLoading]=useState(false)

  const navigation=useNavigation();
  const handleSignUp = () => {
    const {name, password, phoneNo,email} = user;
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone number validation regex (10 digits)
    const phoneNoRegex = /^\d{11}$/;

    if (!name) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Name is required',
      });
      return;
    }
    if (!email || !emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Valid email is required',
      });
      return;
    }
    if (!phoneNo || !phoneNoRegex.test(phoneNo)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Valid phone number is required',
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
      let body={email:email}
      // console.log(body,"klkdkdkdlkldklk");
      setIsLoading(true)
      sendCodeAdmin(body)
      .then((res)=>{
        setIsLoading(false)
        // console.log(res,"respooooooooooooo");
        if (res?.status==200) {
          Toast.show({
            type: 'success',
            text1: 'Suceess',
            text2: `Verification code has been sent to ${email} `,
          });
          navigation.navigate("OtpVerfication",{
            data:user,
            registerUser:registerAppartmentAdmin,
            navigateTo:"LoginAdmin",
            codeSend:sendCodeAdmin,
            codeBody:body
          })
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
        // console.log(error,"Rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
      })
    }
  };

 
  const handleOnChange = (name, value) => {
    // console.log(name,value,"valueeeeeeeeeeeeeeeee");
    setUser({
      ...user,
      [name]: value,
    });
  };

  // console.log(user,"userrrrrrrrrrrrrrrr");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#bde4f4',
      }}>
        <Loader isloading={isloading}/>
      <ScrollView>
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
              SignUp
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: Colors.headingColor, fontSize: 20}}>
              Create a new account
            </Text>
          </View>
          <KeyboardAwareScrollView>
            <View style={{marginTop: width(5)}}>
              <View style={{marginHorizontal: width(5)}}>
                <TextField
                  placeHolder="Username"
                  tag="Username"
                  value={user?.name}
                  onChange={text => handleOnChange('name', text)}
                />
              </View>
              <View style={{marginHorizontal: width(5), marginTop: width(4)}}>
                <TextField
                  placeHolder="Email Address"
                  tag="Email"
                  value={user?.email}
                  onChange={text => handleOnChange('email', text)}
                />
              </View>
              <View style={{marginHorizontal: width(5), marginTop: width(4)}}>
                <TextField
                  placeHolder="Mobile Number"
                  tag="Mobile Number"
                  keyboardType={'numeric'}
                  value={user?.phoneNo}
                  onChange={text => handleOnChange('phoneNo', text)}
                />
              </View>
              <View style={{marginHorizontal: width(5), marginTop: width(4)}}>
                <TextField
                  placeHolder="Password"
                  tag="Password"
                  value={user?.password}
                  onChange={text => handleOnChange('password', text)}
                />
              </View>
            </View>
            <View style={{marginHorizontal: width(5), marginTop: width(5)}}>
              <Button
                color={'white'}
                text={'Signup as Admin'}
                fontSize={18}
                backgroundColor={Colors.blue}
                onPress={handleSignUp}
              />
            </View>
            <View style={{alignItems: 'center', marginTop: width(5)}}>
              <Text
                style={{
                  color: Colors.darkGrey,
                  fontSize: width(4),
                  fontWeight: '500',
                }}>
                Already have account?{' '}
                <Text
                  style={{
                    color: Colors.headingColor,
                  }}
                  onPress={()=>navigation.navigate("LoginAdmin")}
                  >
                  Login
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
              }}></View>
          </KeyboardAwareScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupAdmin;
