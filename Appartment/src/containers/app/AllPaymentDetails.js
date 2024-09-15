import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
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
import {width} from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAllNotifications, getAllPaymentDetails } from '../../services/Admin';
import { AppContext } from '../../context';
import moment from 'moment';
const AllPaymentDetails = () => {
  const {admin}=useContext(AppContext)
  const [notifications,setNotifications]=useState([])
  const [isloading,setIsLoading]=useState(false)
  const navigation=useNavigation()

  useFocusEffect(
    useCallback(() => {
      handleGetAllNotifications();
    }, [])
  );
  const handleGetAllNotifications = () => {
    setIsLoading(true);
    getAllPaymentDetails(admin?.userDetails?.apartmentId)
      .then(res => {
        setIsLoading(false);
        if (res?.status == 200) {
          const data=res?.data?.data
          const newArr=data.reverse()
          setNotifications(newArr);
        }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#bde4f4',
      }}>
      <View>
        <View
          style={{
            backgroundColor: Colors.white,
            borderRadius: 20,
            marginHorizontal: width(5),
            paddingHorizontal: width(5),
            paddingVertical: width(5),
            marginVertical: width(5),
            height:"95%",
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={()=>navigation.goBack()}
            >
            <Image
              source={Images.sideImage}
              style={{height: width(5), width: width(5)}}
              resizeMode="contain"
            />
            <Text
              style={{
                color: Colors.headingColor,
                fontWeight: 'bold',
                fontSize: 18,
                marginHorizontal: width(2),
              }}>
              Payment Details
            </Text>
          </TouchableOpacity>

          <FlatList
            data={notifications}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    marginTop:width(50),
                    alignItems:"center"
                  }}>
                  <Text style={{color:Colors.headingColor,fontWeight:"700"}}>No Account Found!</Text>
                </View>
              );
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                onPress={()=>navigation.navigate("UpdatePaymentDetail",{
                  data:item
                })}
                  style={{
                    backgroundColor: Colors.white,
                    elevation: 5,
                    marginHorizontal: width(2),
                    marginVertical: width(3),
                    paddingHorizontal: width(3),
                    paddingVertical: width(3),
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      color: Colors.headingColor,
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Account Titile :{' '}
                    <Text style={{color: Colors.blue}}>{item?.accountTitle}</Text>
                  </Text>
                  <Text
                    style={{
                      color: Colors.headingColor,
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Account No :{' '}
                    <Text style={{color: Colors.blue}}>{item?.accountNo}</Text>
                  </Text>
                  <Text
                    style={{
                      color: Colors.headingColor,
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Bank :{' '}
                    <Text style={{color: Colors.blue}}>{item?.bankName}</Text>
                  </Text>
                  <Text
                    style={{
                      color: Colors.headingColor,
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Description :{' '}
                    <Text style={{color: Colors.blue}}>{item?.description}</Text>
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <View style={{}}>
          <Button
            color={'white'}
            text={'Add Account Details'}
            fontSize={18}
            backgroundColor={Colors.blue}
            onPress={()=>navigation.navigate("AddPaymentDetail")}
          />
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllPaymentDetails;
