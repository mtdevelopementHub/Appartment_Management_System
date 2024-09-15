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
import {AppContext} from '../../context';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../components/Loader';
import {getComplaintsByUser} from '../../services/User';
const Home = () => {
  const navigation = useNavigation();
  const {user} = useContext(AppContext);
  const [isloading, setIsLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [isShowOption, setIsShowOption] = useState(false);
  useEffect(() => {
    handleGetAllComplaintsUser();
  }, []);
  const options = [
    {
      id: 1,
      label: 'House Keeping',
      image: Images.keepingImage,
      navigateTo: 'NewComplaint',
      service: 'House Keeping',
    },
    {
      id: 2,
      label: 'Utilities',
      image: Images.carpenterImage,
      navigateTo: 'AddUtility',
      service: 'others',
    },
    {
      id: 3,
      label: 'Electrician',
      image: Images.toolImage,
      navigateTo: 'NewComplaint',
      service: 'Electrician',
    },
    {
      id: 4,
      label: 'Plumber',
      image: Images.signImage,
      navigateTo: 'NewComplaint',
      service: 'Plumber',
    },
    {
      id: 5,
      label: 'Network',
      image: Images.wifiImage,
      navigateTo: 'NewComplaint',
      service: 'Networks',
    },
    {
      id: 4,
      label: 'Others',
      image: Images.downImage,
      navigateTo: 'NewComplaint',
      service: 'Other',
    },
  ];

  const handleGetAllComplaintsUser = () => {
    setIsLoading(true);
    getComplaintsByUser(user?.userDetails?._id)
      .then(res => {
        setIsLoading(false);
        if (res?.status == 200) {
          const data = res?.data?.data;
          const newArr = data.reverse();
          setComplaints(newArr);
        }
      })
      .catch(error => {
        setIsLoading(false);
      });
  };

  const handlePressOption = (service, path) => {
    navigation.navigate(path, {
      option: service,
    });
    setIsShowOption(false);
  };
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:"space-between"
          }}>
          <TouchableOpacity
            style={{marginLeft: width(3), marginRight: width(2)}}
            onPress={() => setIsShowOption(!isShowOption)}>
            <Text style={{color: Colors.blue, fontSize: width(8)}}>⋮</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginHorizontal: width(2),
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.backgroundColor,
                borderRadius: 50,
                padding: width(2),
                width: width(10),
                marginTop: width(1),
              }}
              onPress={() => navigation.navigate('Notification')}>
              <Image
                source={Images.bellImage}
                style={{height: width(6), width: width(6)}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: width(2)}}
              onPress={() => navigation.navigate('Settings')}>
              <Image
                source={Images.avatarImage}
                style={{height: width(10), width: width(10), borderRadius: 50}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        {isShowOption && (
          <View
            style={{
              alignSelf: 'flex-end',
              backgroundColor: 'white',
              paddingHorizontal: width(3),
              paddingVertical: width(3),
              borderRadius: width(2),
              position: 'absolute',
              zIndex: 100,
              marginTop: width(12),
            }}>
            {options?.map((item, ind) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    handlePressOption(item?.service, item?.navigateTo)
                  }>
                  <Text
                    style={{
                      color: 'black',
                      textAlign: 'center',
                      marginVertical: width(1),
                    }}>
                    {item?.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
              Your Complaints
            </Text>
            <Text
              style={{
                color: Colors.headingColor,
                fontWeight: 'bold',
                fontSize: 12,
                marginHorizontal: width(5),
              }}
              onPress={() => navigation.navigate('AllComplaints')}>
              See all
            </Text>
          </View>

          {complaints?.length > 0 ? (
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
              onPress={() =>
                navigation.navigate('ComplaintDetail', {
                  data: complaints[0],
                })
              }>
              <Text
                style={{
                  color: Colors.blue,
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                {complaints[0]?.serviceName}
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
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text style={{color: Colors.headingColor}}>
                No Complaints Found
              </Text>
            </View>
          )}
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
                  onPress={() =>
                    navigation.navigate(item.navigateTo, {
                      option: item?.service,
                    })
                  }
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: width(5),
            marginBottom: width(5),
          }}>
          <TouchableOpacity
            style={{
              width: '20%',
              backgroundColor: Colors.skyBlue,
              borderRadius: 50,
              paddingHorizontal: width(3),
              paddingVertical: width(3),
            }}
            onPress={()=>navigation.navigate("CustomerSupport")}
            >
            <Image
              source={Images.headsetImage}
              style={{
                height: width(8),
                width: width(8),
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{width: '75%'}}>
            <Button
              text="New Complaint"
              color={Colors.white}
              backgroundColor={Colors.orange}
              fontSize={25}
              onPress={() =>
                navigation.navigate('NewComplaint', {
                  option: '',
                })
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
