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
import NewPicker from '../../components/Picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ImageCropPicker from 'react-native-image-crop-picker';
import {helper} from '../../helper/Helper';
import Toast from 'react-native-toast-message';
import {AppContext} from '../../context';
import {addComplaint} from '../../services/User';
import Loader from '../../components/Loader';
import { useNavigation } from '@react-navigation/native';
const UtilityDetailsAdmin = ({route}) => {
    const navigation=useNavigation()
  const data = route?.params?.data;
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
    utilityName: '',
    description: '',
    image: '',
    serviceCharges: '',
  });

  useEffect(() => {
    setComplaintData({
      utilityName: data?.utilityName,
      description: data?.description,
      image: data?.image,
      serviceCharges: data?.serviceCharges,
    });
    setSelectedDate(data?.paidDate);
    setSelectedEndTime(data?.timeTo);
    setSelectedStartTime(data?.timeFrom);
  }, [data]);
  const options = [
    'Electricty',
    'Gas',
    'Water',
    'Maintainance',
    'Other',
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
              Utilities Deatils #{data?.billId}
            </Text>
          </View>
            
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <NewPicker
              enabled={false}
              tag="Service Name"
              options={options}
              selectedValue={complaintData?.utilityName}
              setComplaintData={setComplaintData}
              complaintData={complaintData}
            />
          </View>

          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              editable={false}
              placeHolder="Description"
              tag="User Name:"
              elevation={5}
              name="description"
              value={data?.user?.name}
            />
          </View>
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              editable={false}
              placeHolder="Description"
              tag="User Appartment No:"
              elevation={5}
              name="description"
              value={data?.user?.appartmentNo}
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
              }}>
              <Text
                style={{
                  color: Colors.blue,
                  paddingHorizontal: width(2),
                  paddingVertical: width(5),
                  fontSize: 16,
                }}>
                {moment(startdate).format('DD-MMM-YYYY')}
              </Text>
            </TouchableOpacity>
          </View>
    
          <View style={{marginHorizontal: width(1), marginTop: width(4)}}>
            <TextField
              editable={false}
              placeHolder="Description"
              tag="Describe your issue:"
              elevation={5}
              numberofLines={10}
              name="description"
              value={complaintData?.description}
            />
          </View>
          <View style={{marginHorizontal:width(1),marginVertical:width(2)}}>
              <Image
                source={{uri:complaintData?.image}}
                style={{height: width(30), width: width(80)}}
                resizeMode="contain"
              />
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UtilityDetailsAdmin;
