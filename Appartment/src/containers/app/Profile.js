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
import {getComplaintsByUser} from '../../services/User';
import {AppContext} from '../../context';
import Loader from '../../components/Loader';
import {useNavigation} from '@react-navigation/native';
const Profile = () => {
  const {user} = useContext(AppContext);
  const navigation = useNavigation();
  const [isloading, setIsLoading] = useState(false);

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
              value={user?.userDetails?.name}
            />
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
              editable={false}
              placeHolder="Description"
              tag="Phone No"
              elevation={5}
              name="description"
              value={user?.userDetails?.phoneNo}
            />
          </View>
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              editable={false}
              placeHolder="Appartment No"
              tag="Appartment No"
              elevation={5}
              name="description"
              value={user?.userDetails?.appartmentNo}
            />
          </View>
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              editable={false}
              placeHolder="Appartment No"
              tag="Appartment Id"
              elevation={5}
              name="description"
              value={user?.userDetails?.apartmentId}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
