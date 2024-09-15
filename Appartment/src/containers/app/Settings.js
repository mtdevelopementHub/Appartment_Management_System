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
const Settings = () => {
  const {user,userLogout} = useContext(AppContext);
  const navigation = useNavigation();
  const [isloading, setIsLoading] = useState(false);

  const options = [
    {
      name: 'Personal details',
      image: Images.profileImage,
      navigateTo:"Profile"
    },
    {
      name: 'Settings',
      image: Images.settingImage,
      navigateTo:"ChangePassword"
    
    },
    {
      name: 'Utilities',
      image: Images.carpenterImage,
      navigateTo:"AllUtilities"
    
    },
    {
      name: 'Payment details',
      image: Images.cardImage,
      navigateTo:"AllPaymentDetailsUser"
    },
    {
      name: 'FAQ',
      image: Images.messageImage,
      navigateTo:"CustomerSupport"
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
              Home
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
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: Colors.black,
                  marginTop: width(2),
                  textAlign: 'center',
                }}>
                {user?.userDetails?.name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.greyText,
                  marginTop: width(2),
                  textAlign: 'center',
                }}>
                {user?.userDetails?.email}
              </Text>
            </View>
            <FlatList
              data={options}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginVertical: width(5),
                    }}
                    onPress={()=>navigation.navigate(item.navigateTo)}
                    >
                    <View
                      style={{
                        backgroundColor: Colors.white,
                        paddingHorizontal: width(2),
                        paddingVertical: width(2),
                        elevation: 3,
                        borderRadius: 10,
                        borderWidth: 0.5,
                        borderColor: Colors.greyText,
                      }}>
                      <Image
                        source={item.image}
                        style={{width: width(5), height: width(5)}}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{width: '80%'}}>
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 16,
                          fontWeight: '700',
                          marginLeft: width(5),
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <View>
                      <Image
                        source={Images.arrowLeftImage}
                        style={{
                          width: width(5),
                          height: width(5),
                          alignSelf: 'flex-end',
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={{justifyContent:"flex-end",flex:1}}>
          <Button
            text={"Logout"}
            color={Colors.white}
            backgroundColor={Colors.blue}
            onPress={()=>userLogout()}
          />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
