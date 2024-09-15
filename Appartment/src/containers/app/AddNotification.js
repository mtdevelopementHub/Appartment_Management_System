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
import { addNotication } from '../../services/Admin';
const AddNotification = () => {
  const navigation=useNavigation()
  const {user,admin} = useContext(AppContext);
  const [startdate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTimeStrat, setOpeTimeStart] = useState(false);
  const [openTimeEnd, setOpeTimeEnd] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [complaintData, setComplaintData] = useState({
    title: '',
    description: '',
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
  


  const handleSubmitNewComplaint = () => {
    const currentTime = new Date();
    const { title,description} = complaintData;
    if (!title) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please provide title',
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
   else {
      setIsLoading(true);
      let body = {
        title: title,
        date: selectedDate,
        description: description,
        apartmentId: admin?.userDetails?.apartmentId,
      };
      // console.log(body,"bodyyyyyyyyyyyyyyyyyyyyyy");
      addNotication(body)
        .then(res => {
          // console.log(res,"respppppppppppppppppppppppp");
          setIsLoading(false);
          if (res?.status == 200) {
            setComplaintData({
              title: '',
              description: '',
            });
            setSelectedDate(new Date());
            setSelectedStartTime(new Date());
            setSelectedEndTime(new Date());
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2:  res?.data?.message,
            });
            navigation.goBack();
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
              Send New Notofication
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
            <TextField
              placeHolder="Title"
              tag="Title:"
              elevation={5}
              value={complaintData?.title}
              onChange={text => handleOnChange('title', text)}
            />
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
          
          <View style={{flex:1,justifyContent:"flex-end"}}>
          <Button
            color={'white'}
            text={'Send Notification'}
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

export default AddNotification;
