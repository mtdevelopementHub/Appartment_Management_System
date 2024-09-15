import React, {useContext, useState} from 'react';
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
import NewPicker from '../../components/Picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ImageCropPicker from 'react-native-image-crop-picker';
import {helper} from '../../helper/Helper';
import Toast from 'react-native-toast-message';
import {AppContext} from '../../context';
import {addComplaint, addUtitlity} from '../../services/User';
import Loader from '../../components/Loader';
import { useNavigation } from '@react-navigation/native';
const AddUtility = () => {
  const navigation=useNavigation()
  const {user} = useContext(AppContext);
  const [startdate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTimeStrat, setOpeTimeStart] = useState(false);
  const [openTimeEnd, setOpeTimeEnd] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [complaintData, setComplaintData] = useState({
    serviceName: '',
    description: '',
    image: '',
    serviceCharges: '',
  });

  const options = [
    'Electricty',
    'Gas',
    'Water',
    'Maintainance',
    'Other',
  ];

  const handleOnChange = (name, value) => {
    setComplaintData({
      ...complaintData,
      [name]: value,
    });
  };
  const handleUploadImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      //   width: 300,
      //   height: 400,
      freeStyleCropEnabled: true,
      cropping: true,
    })
      .then(res => {
        // console.log(res.path.file, 'asalskdjsalkd');
        let params = {
          uri: res.path,
          type: res.mime,
          name: res.path,
        };
        uploadFunction(params);
      })
      .catch(err => {});
  };

  const uploadFunction = async params => {
    setIsLoading(true);
    try {
      let imageUrl = await helper.ImageUploadService(params);
      imageUrl.json().then(result => {
        // console.log(result, 'result.urlresult.urlresult.urlresult.url');
        setComplaintData({...complaintData, image: result.url});
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error, 'error');
      setIsLoading(false);
    }
  };

  const handleSubmitNewComplaint = () => {
    const currentTime = new Date();
    const {serviceName, serviceCharges, description, image} = complaintData;
    if (!serviceName) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please select service',
      });
      return;
    }
    if (!description) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please provide description',
      });
      return;
    }
    if (!image) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please upload image',
      });
      return;
    }
    if (selectedEndTime.getTime() === currentTime.getTime()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Selected end time cannot be the current time',
      });
      return;
    } else {
      setIsLoading(true);
      let body = {
        utilityName: serviceName,
        paidDate: selectedDate,
        description: description,
        image: image,
        apartmentId: user?.userDetails?.apartmentId,
        userId: user?.userDetails?._id,
        appartmentNo: user?.userDetails?.appartmentNo,
      };
      // console.log(body,"bodyyyyyyyyyyyyyyyyyyyyyy");
      addUtitlity(body)
        .then(res => {
          // console.log(res,"respppppppppppppppppppppppp");
          setIsLoading(false);
          if (res?.status == 200) {
            setComplaintData({
              serviceName: '',
              description: '',
              image: '',
              serviceCharges: '',
            });
            setSelectedDate(new Date());
            setSelectedStartTime(new Date());
            setSelectedEndTime(new Date());
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: `Your complain submitted successfully your complaint id is ${res?.data?.data}`,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: res?.data?.message ? res?.data?.message :"Something went wrong",
            });
          }
        })
        .catch(error => {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Something went wrong',
          });
        });
    }
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
              Submit Utility
            </Text>
          </View>
          <DatePicker
            mode="date"
            open={openDate}
            modal
            title="Select Paid Date"
            date={selectedDate}
            onConfirm={date => {
              setOpenDate(false);
              setSelectedDate(date);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
         
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <NewPicker
              tag="Utility Name"
              options={options}
              selectedValue={complaintData?.serviceName}
              setComplaintData={setComplaintData}
              complaintData={complaintData}
            />
          </View>

          <View style={{marginTop: width(4)}}>
            <Text
              style={{
                marginLeft: width(1),
                fontWeight: '600',
                marginBottom: width(1),
                color: Colors.headingColor,
                fontSize: 12,
              }}>
              Paid Date:
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                backgroundColor: Colors.white,
                paddingHorizontal: width(1),
                elevation: 5,
              }}
              onPress={() => setOpenDate(!openDate)}>
              <Text
                style={{
                  color: Colors.blue,
                  paddingHorizontal: width(2),
                  paddingVertical: width(5),
                  fontSize: 16,
                }}>
                {moment(startdate).format('DD-MM-YYYY')}
              </Text>
            </TouchableOpacity>
          </View>
         

          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              placeHolder="Description"
              tag="Description:"
              elevation={5}
              numberofLines={10}
              value={complaintData?.description}
              onChange={text => handleOnChange('description', text)}
            />
          </View>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: Colors.white,
              paddingHorizontal: width(2),
              elevation: 5,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: width(4),
              paddingVertical: width(4),
            }}>
            <View>
              <Image
                source={
                  complaintData?.image
                    ? {uri: complaintData?.image}
                    : Images.uploadImage
                }
                style={{height: width(9), width: width(9)}}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity
              style={{marginLeft: width(10)}}
              onPress={handleUploadImage}>
              <Text
                style={{
                  marginLeft: width(1),
                  fontWeight: '600',
                  marginBottom: width(1),
                  color: Colors.headingColor,
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {complaintData?.image ? 'Click to Reupload' : 'Click to Upload'}
              </Text>
              <Text
                style={{
                  marginLeft: width(1),
                  fontWeight: '600',
                  marginBottom: width(1),
                  color: Colors.headingColor,
                  fontSize: 12,
                }}>
                image,jpg, and png..
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1,justifyContent:"flex-end"}}>
          <Button
            color={'white'}
            text={'Submit Utility'}
            fontSize={18}
            backgroundColor={Colors.blue}
            onPress={handleSubmitNewComplaint}
          />
        </View>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default AddUtility;
