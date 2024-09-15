import React, {useState} from 'react';
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
import Accordion from 'react-native-collapsible/Accordion';
import { useNavigation } from '@react-navigation/native';

const CustomerSupport = () => {
  const navigation=useNavigation()
const [activeSections, setActiveSections] = useState([0]); // Set initial active sections
const sections = ['When i can apply for survice?', 'Which time service is available?', 'What can you offer?','your work is not good enough.','How can i pay?'];
const answers=['you can pay for the service via UPI or cash only, We don’t accept payment via any other method.','you can pay for the service via UPI or cash only, We don’t accept payment via any other method.','you can pay for the service via UPI or cash only, We don’t accept payment via any other method.','you can pay for the service via UPI or cash only, We don’t accept payment via any other method.','you can pay for the service via UPI or cash only, We don’t accept payment via any other method']
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

  const renderHeader = (content, index, isActive) => (
    
    <View style={{backgroundColor:Colors.white,flexDirection:"row",marginVertical:width(2),alignItems:"center"}}>
        <Image
            source={isActive ? Images.downGreyImage :Images.sideGreyImage}
            style={{height: width(5), width: width(5),marginRight:width(1)}}
            resizeMode="contain"
          />
      <Text style={{color:Colors.darkGrey,fontSize:16}}>{content}</Text>
    </View>
  );

  const renderContent = (content, index, isActive) => (
    <View>
      {/* Content for each section */}
      <Text style={{color:Colors.blue,marginLeft:width(4),fontSize:14}}>{answers[index]}</Text>
    </View>
  );
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
            height: '95%',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={()=>navigation.goBack()}>
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
              Customer Support
            </Text>
          </TouchableOpacity>
          <Text
              style={{
                color: Colors.headingColor,
                fontWeight: '500',
                fontSize: 18,
                marginHorizontal: width(2),
                marginTop:width(5),
                marginBottom:width(2),
              }}>
              FAQ:
            </Text>
          <Accordion
            activeSections={activeSections}
            sections={sections}
            renderHeader={renderHeader}
            underlayColor='white'
            renderContent={renderContent}
            onChange={setActiveSections}
          />
          <Text
              style={{
                color: Colors.headingColor,
                fontWeight: '500',
                fontSize: 18,
                marginHorizontal: width(2),
                marginTop:width(5),
                marginBottom:width(2),
              }}>
              Report an issue:
            </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={Images.phoneImage}
              style={{height: width(5), width: width(5)}}
              resizeMode="contain"
            />
            <Text
              style={{
                color: Colors.headingColor,
                fontWeight: '500',
                fontSize: 18,
                marginHorizontal: width(2),
              }}>
             +92-1234569875
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop:width(2)
            }}>
            <Image
              source={Images.emailImage}
              style={{height: width(5), width: width(5)}}
              resizeMode="contain"
            />
            <Text
              style={{
                color: Colors.headingColor,
                fontWeight: '500',
                fontSize: 18,
                marginHorizontal: width(2),
              }}>
              support@ams.pk
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomerSupport;
