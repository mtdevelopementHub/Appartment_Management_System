import React, { useContext, useEffect, useState } from 'react';
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
import { getComplaintsByUser, getUtilitiesByUser } from '../../services/User';
import { AppContext } from '../../context';
import Loader from '../../components/Loader';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { getUtilitiesByAdmin } from '../../services/Admin';
const AllUtilitiesByAdmin = () => {
  const {admin}=useContext(AppContext)
  const navigation=useNavigation()
  const [isloading,setIsLoading]=useState(false)
  const [complaints,setComplaints]=useState([])

  useEffect(()=>{
    handleGetAllComplaintsUser();
  },[])
  const options = [
    {
      id: 1,
      label: 'Electrician',
      token: '000342368',
      status: 'Ongoing',
    },
    {
      id: 2,
      label: 'House Keeping',
      token: '0000121',
      status: 'Finished',
    },
    {
      id: 3,
      label: 'Pest Control',
      token: '0000234',
      status: 'Finished',
    },
  ];


  const handleGetAllComplaintsUser=()=>{
    setIsLoading(true)
    getUtilitiesByAdmin(admin?.userDetails?.apartmentId).then((res)=>{
      setIsLoading(false)
      if (res?.status==200) {
        const data=res?.data?.data
        const newArr=data.reverse()
        setComplaints(newArr);
      }
    }).catch((error)=>{
      setIsLoading(false)
    })
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#bde4f4',
      }}>
        <Loader isloading={isloading}/>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
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
              Utilities
            </Text>
          </View>

          <FlatList
            data={complaints}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    marginTop:width(50),
                    alignItems:"center"
                  }}>
                  <Text style={{color:Colors.headingColor,fontWeight:"700"}}>No Complaints Found!</Text>
                </View>
              );
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                onPress={()=>navigation.navigate("UtilityDetailsAdmin",{
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
                      color: Colors.blue,
                      fontWeight: '700',
                      fontSize: 16,
                    }}>
                    {item?.utilityName}
                  </Text>
                  <Text
                      style={{
                        color: Colors.headingColor,
                        fontWeight: '700',
                        fontSize: 14,
                      }}>
                      Name :{' '}
                      <Text style={{color: Colors.blue}}>{item?.user?.name}</Text>
                    </Text>
                  <Text
                      style={{
                        color: Colors.headingColor,
                        fontWeight: '700',
                        fontSize: 14,
                      }}>
                      Phone :{' '}
                      <Text style={{color: Colors.blue}}>{item?.user?.phoneNo}</Text>
                    </Text>
                    <Text
                      style={{
                        color: Colors.headingColor,
                        fontWeight: '700',
                        fontSize: 14,
                      }}>
                      Appartment No :{' '}
                      <Text style={{color: Colors.blue}}>{item?.user?.appartmentNo}</Text>
                    </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: Colors.headingColor,
                        fontWeight: '700',
                        fontSize: 14,
                      }}>
                      Bill No.{' '}
                      <Text style={{color: Colors.blue}}>{item?.billId}</Text>
                    </Text>
                    <Text
                      style={{
                        color: Colors.headingColor,
                        fontWeight: '700',
                        fontSize: 14,
                      }}>
                      Date :{' '}
                      <Text style={{color: Colors.green}}>{moment(item.paidDate).format('DD/MMM/YYYY')}</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllUtilitiesByAdmin;
