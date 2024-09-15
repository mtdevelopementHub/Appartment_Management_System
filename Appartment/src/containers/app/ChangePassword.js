import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import TextField from '../../components/TextField';
import {width, height} from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/Button';
import {changePasswordUser, getComplaintsByUser} from '../../services/User';
import {AppContext} from '../../context';
import Loader from '../../components/Loader';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
const ChangePassword = () => {
  const {user} = useContext(AppContext);
  const navigation = useNavigation();
  const [userData,setUserData]=useState({
    password:"",
    newPassword:""
  })
  const [isloading,setIsLoading]=useState(false)


  const handleOnChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSignIn = () => {
    const { password,newPassword} = userData;
    if (!password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Current Password is required',
      });
      return;
    }
    if (!newPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'New Password is required',
      });
      return;
    }if (newPassword.length < 6) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'New Password lenght should be grater then 6 characters',
        });
        return;
      }else{
      let body={
        email:user?.userDetails?.email,
        password:password,
        newPassword:newPassword
      }
      setIsLoading(true)
      changePasswordUser(body)
      .then((res)=>{
        setIsLoading(false)
        if (res?.status==200) {
          setUserData({
            password:"",
            newPassword:""
          })
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
  const options = [
    {
      name: 'Personal details',
      image: Images.profileImage,
      navigateTo: 'Home',
    },
    {
      name: 'Settings',
      image: Images.settingImage,
      navigateTo: 'Home',
    },
    {
      name: 'Payment details',
      image: Images.cardImage,
      navigateTo: 'Home',
    },
    {
      name: 'FAQ',
      image: Images.messageImage,
      navigateTo: 'CustomerSupport',
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#bde4f4',
      }}>
      <Loader isloading={isloading} />
      <View>
        <View
          style={{
            backgroundColor: Colors.white,
            borderRadius: 20,
            marginHorizontal: width(5),
            paddingHorizontal: width(5),
            paddingVertical: width(5),
            marginVertical: width(5),
            height: '95%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: width(2),
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Images.sideImage}
                style={{height: width(5), width: width(5)}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.headingColor,
                fontWeight: 'bold',
                fontSize: 18,
                marginHorizontal: width(5),
              }}>
                Chnage Password
            </Text>
          </View>
        
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              editable={false}
              placeHolder="Description"
              tag="Email"
              elevation={5}
              name="description"
              value={user?.userDetails?.email}
            />
          </View>
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              placeHolder="Current Password"
              tag="Current Password"
              elevation={5}
              name="Current Password"
              value={userData.password}
              onChange={(text)=>handleOnChange("password",text)}
            />
          </View>
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              placeHolder="New Password"
              tag="New Password"
              elevation={5}
              name="New Password"
              value={userData.newPassword}
              onChange={(text)=>handleOnChange("newPassword",text)}
            />
          </View>
          <View style={{justifyContent:"flex-end",flex:1}}>
          <Button
            text={"Change Password"}
            color={Colors.white}
            backgroundColor={Colors.blue}
            onPress={handleSignIn}
          />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
