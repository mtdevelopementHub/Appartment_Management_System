import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import TextField from '../../components/TextField';
import {width,height} from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
const WelcomePage = () => {
  const naviagtion=useNavigation();

  const handleNavigation=()=>{
    naviagtion.navigate("Signup")
  }

  const handleNavigationAdmin=()=>{
    naviagtion.navigate("SignupAdmin")
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#bde4f4',
      }}>
      <View>
        <Image
          source={Images.buildingImage}
          style={{height:height(62), width: width(100)}}
        />
      </View>
      <View>
        <View>
          <View
            style={{
              marginHorizontal: width(5),
              paddingHorizontal: width(5),
              backgroundColor: Colors.white,
              borderRadius: 20,
              paddingVertical:width(5),
              marginVertical:width(5)
            }}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: Colors.black,
                }}>
                Get solution of your all issues in one place!!
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  color: Colors.black,
                  marginTop:width(2)
                }}>
                Simplify apartment living with our app we take care of your
                complaints smoothly!
              </Text>
            </View>
            <View style={{marginHorizontal: width(5), marginTop: width(3)}}>
            <Button
              color={'white'}
              text={'Get started as user'}
              fontSize={18}
              backgroundColor={Colors.blue}
             onPress={()=>handleNavigation()}
            />
          </View>
            <View style={{marginHorizontal: width(5), marginTop: width(3)}}>
            <Button
              color={'white'}
              text={'Get started as admin'}
              fontSize={18}
              backgroundColor={Colors.blue}
              onPress={()=>handleNavigationAdmin()}
            />
          </View>
          </View>
          
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;
