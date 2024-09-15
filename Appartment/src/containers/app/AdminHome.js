import React, {useCallback, useContext, useEffect, useState} from 'react';
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
import {AppContext} from '../../context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Loader from '../../components/Loader';
import {getComplaintsByUser} from '../../services/User';
import { getComplaintsByAdmin } from '../../services/Admin';
const AdminHome = () => {
  const navigation = useNavigation();
  const {user,admin} = useContext(AppContext);
  const [isloading, setIsLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);

  useFocusEffect(
    useCallback(() => {
      handleGetAllComplaintsUser();
    }, [])
  );
 
  const options = [
    {
      id: 1,
      label: 'User Request',
      image: Images.requestImage,
      navigateTo:"AllPendingUsers",
    },
    {
      id: 2,
      label: 'Users',
      image: Images.groupImage,
      navigateTo:"AllUsers",
    },
    {
      id: 3,
      label: 'Pending Complaints',
      image: Images.timeSheetImage,
      navigateTo:"PendingComplaintsAdmin",
    },
    {
      id: 4,
      label: 'Solved Complaints',
      image: Images.operationImage,
      navigateTo:"SolvedComplaintsAdmin",
    },
    {
      id: 5,
      label: 'Progress Complaints',
      image: Images.progressImage,
      navigateTo:"ProgressComplaintsAdmin",
    },
    {
      id: 4,
      label: 'Utilities',
      image: Images.resourcesImage,
      navigateTo:"AllUtilitiesByAdmin",
    },
  ];

  const handleGetAllComplaintsUser = () => {
    setIsLoading(true);
    getComplaintsByAdmin(admin?.userDetails?.apartmentId)
      .then(res => {
        setIsLoading(false);
        if (res?.status == 200) {
          const data=res?.data?.data
          const newArr=data.reverse()
          setComplaints(newArr);
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
      <Loader isloading={isloading} />
      <View>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginHorizontal:width(2)}}>
          <TouchableOpacity style={{backgroundColor:Colors.backgroundColor,borderRadius:50,padding:width(2),width:width(10),marginTop:width(1)}} onPress={()=>navigation.navigate("NotificationAdmin")}>
          <Image
            source={Images.bellImage}
            style={{height: width(6), width: width(6)}}
            resizeMode="contain"
          />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:width(2)}} onPress={()=>navigation.navigate("AdminSettings")}>
          <Image
            source={Images.avatarImage}
            style={{height: width(10), width: width(10),borderRadius:50}}
            resizeMode="contain"
          />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={Images.repairImage}
            style={{height: width(50), width: width(95)}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            backgroundColor: Colors.white,
            borderRadius: 20,
            marginHorizontal: width(5),
            paddingHorizontal: width(5),
            paddingVertical: width(5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Colors.headingColor,
                fontWeight: 'bold',
                fontSize: 18,
                marginHorizontal: width(5),
              }}>
              Complaints
            </Text>
            <Text
              style={{
                color: Colors.headingColor,
                fontWeight: 'bold',
                fontSize: 12,
                marginHorizontal: width(5),
              }}
              onPress={() => navigation.navigate('AllComplaintsAdmin')}>
              See all
            </Text>
          </View>

          {complaints?.length > 0 ?
          <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              elevation: 5,
              marginHorizontal: width(3),
              marginVertical: width(3),
              paddingHorizontal: width(3),
              paddingVertical: width(3),
              borderRadius: 15,
            }}
            onPress={()=>navigation.navigate("ComplaintDetailAdmin",{
              data:complaints[0]
            })}
            >
            <Text
              style={{
                color: Colors.blue,
                fontWeight: '700',
                fontSize: 16,
              }}>
              {complaints[0]?.serviceName}
            </Text>
            <Text
                style={{
                  color: Colors.headingColor,
                  fontWeight: '700',
                  fontSize: 14,
                }}>
                Name :{' '}
                <Text style={{color: Colors.blue}}>
                  {' '}
                  {complaints[0]?.user?.name}
                </Text>
              </Text>
            <Text
                style={{
                  color: Colors.headingColor,
                  fontWeight: '700',
                  fontSize: 14,
                }}>
                Phone :{' '}
                <Text style={{color: Colors.blue}}>
                  {' '}
                  {complaints[0]?.user?.phoneNo}
                </Text>
              </Text>
            <Text
                style={{
                  color: Colors.headingColor,
                  fontWeight: '700',
                  fontSize: 14,
                }}>
                Appartment No :{' '}
                <Text style={{color: Colors.blue}}>
                  {' '}
                  {complaints[0]?.appartmentNo}
                </Text>
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
                Token No.{' '}
                <Text style={{color: Colors.blue}}>
                  {' '}
                  {complaints[0]?.complaintId}
                </Text>
              </Text>
              <Text
                style={{
                  color: Colors.headingColor,
                  fontWeight: '700',
                  fontSize: 14,
                }}>
                Status :{' '}
                <Text style={{color: Colors.green}}>
                  {complaints[0]?.status}
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
          :
          <View style={{alignItems:"center"}}>
            <Text style={{color:Colors.headingColor}}>No Complaints Found</Text>
          </View>
          } 
        </View>

        <View
          style={{
            backgroundColor: Colors.white,
            borderRadius: 20,
            marginHorizontal: width(5),
            paddingHorizontal: width(5),
            paddingVertical: width(5),
            marginVertical: width(5),
          }}>
          <View>
            <Text
              style={{
                color: Colors.headingColor,
                fontWeight: 'bold',
                fontSize: 18,
                marginHorizontal: width(5),
              }}>
              Services
            </Text>
          </View>
          <FlatList
            data={options}
            numColumns={3}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                onPress={()=>navigation.navigate(item.navigateTo)}
                  style={{
                    backgroundColor: '#96EAB7',
                    paddingHorizontal: width(2),
                    paddingVertical: width(2),
                    borderRadius: 15,
                    marginHorizontal: width(3),
                    marginVertical: width(2),
                    width: width(20),
                    height: width(25),
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={item?.image}
                    style={{
                      height: width(10),
                      width: width(10),
                      alignSelf: 'center',
                    }}
                    resizeMode="contain"
                  />
                  <View>
                    <Text
                      style={{
                        color: Colors.headingColor,
                        fontWeight: 'bold',
                        fontSize: 11,
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}>
                      {item?.label}
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

export default AdminHome;
