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
import {width} from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/Button';
import {getComplaintsByUser} from '../../services/User';
import {AppContext} from '../../context';
import Loader from '../../components/Loader';
import {useNavigation} from '@react-navigation/native';
import {getAllPendingUsers, updateUserStatus} from '../../services/Admin';
import Toast from 'react-native-toast-message';
const AllPendingUsers = () => {
  const {} = useContext(AppContext);
  const navigation = useNavigation();
  const [isloading, setIsLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    handleGetAllPendingUser();
  }, []);
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

  const handleGetAllPendingUser = () => {
    setIsLoading(true);
    getAllPendingUsers()
      .then(res => {
        setIsLoading(false);
        if (res?.status == 200) {
          const data = res?.data?.data;
          // console.log(data, 'userrrrrrrrrrrrrrrrrrrrrrrrrrr');
          const newArr = data.reverse();
          setComplaints(newArr);
        }
      })
      .catch(error => {
        setIsLoading(false);
      });
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
        handleGetAllPendingUser();
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
              User Requests
            </Text>
          </View>

          <FlatList
            data={complaints}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    marginTop: width(50),
                    alignItems: 'center',
                  }}>
                  <Text style={{color: Colors.headingColor, fontWeight: '700'}}>
                    No Request Found!
                  </Text>
                </View>
              );
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ComplaintDetail', {
                      data: item,
                    })
                  }
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
                    Name :{' '}
                    <Text style={{color: Colors.blue}}>{item?.name}</Text>
                  </Text>
                  <Text
                    style={{
                      color: Colors.headingColor,
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Email :{' '}
                    <Text style={{color: Colors.blue}}>{item?.email}</Text>
                  </Text>
                  <Text
                    style={{
                      color: Colors.headingColor,
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Phone:{' '}
                    <Text style={{color: Colors.blue}}>{item?.phoneNo}</Text>
                  </Text>

                  <Text
                    style={{
                      color: Colors.headingColor,
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Appartment no:{' '}
                    <Text style={{color: Colors.blue}}>
                      {item?.appartmentNo}
                    </Text>
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'space-between',
                      alignItems: 'center',
                      marginVertical:width(2)
                    }}>
                    <View style={{width:"48%"}}>
                    <Button
                      color={'white'}
                      text={'Cancel'}
                      fontSize={14}
                      backgroundColor={Colors.orange}
                      onPress={()=>handleUserStatus(item?._id,false,true)}
                    />
                    </View>
                    <View style={{width:"48%",marginLeft:width(2)}}>
                    <Button
                      color={'white'}
                      text={'Accept'}
                      fontSize={14}
                      backgroundColor={Colors.blue}
                      onPress={()=>handleUserStatus(item?._id,true,false)}
                    />
                    </View>
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

export default AllPendingUsers;
