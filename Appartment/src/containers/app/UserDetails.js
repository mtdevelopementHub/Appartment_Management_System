import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import TextField from '../../components/TextField';
import {width, height} from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/Button';
import {getComplaintsByUser} from '../../services/User';
import {AppContext} from '../../context';
import Loader from '../../components/Loader';
import {useNavigation} from '@react-navigation/native';
import { updateUserStatus } from '../../services/Admin';
import Toast from 'react-native-toast-message';
const UserDetails = ({route}) => {
  const {user}=route?.params
  const navigation = useNavigation();
  const [isloading, setIsLoading] = useState(false);

  const handleBlockUser = () => {
    Alert.alert(
      "Block User",
      "Are you sure you want to block this user?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Block Cancelled"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => handleUserStatus(user?._id,false,false)
        }
      ],
      { cancelable: false }
    );
  };

  const handleUserStatus =(id,isAuthorised,isRequestCanceled)=>{
    const body={
      isAuthorised:isAuthorised,
      isRequestCanceled:isRequestCanceled
    }
    setIsLoading(true)
    updateUserStatus(id,body).then(res => {
      setIsLoading(false);
      if (res?.status == 200) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.data?.message,
        });
        navigation.goBack()
      }else{
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
        text2: "Something went wrong",
      });
    });
  }
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
              Profile
            </Text>
          </View>
          <View>
            <Image
              source={Images.avatarImage}
              style={{
                height: width(25),
                width: width(25),
                borderRadius: 50,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          </View>
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              editable={false}
              placeHolder="Description"
              tag="Name"
              elevation={5}
              name="description"
              value={user?.name}
            />
          </View>
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              editable={false}
              placeHolder="Description"
              tag="Email"
              elevation={5}
              name="description"
              value={user?.email}
            />
          </View>
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              editable={false}
              placeHolder="Description"
              tag="Phone No"
              elevation={5}
              name="description"
              value={user?.phoneNo}
            />
          </View>
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              editable={false}
              placeHolder="Appartment No"
              tag="Appartment No"
              elevation={5}
              name="description"
              value={user?.appartmentNo}
            />
          </View>
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              editable={false}
              placeHolder="Appartment No"
              tag="Appartment Id"
              elevation={5}
              name="description"
              value={user?.apartmentId}
            />
          </View>
          <View style={{flex:1,justifyContent:"flex-end"}}>
          <Button
            color={'white'}
            text={'Block User'}
            fontSize={18}
            backgroundColor={Colors.blue}
            onPress={handleBlockUser}
          />
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserDetails;
