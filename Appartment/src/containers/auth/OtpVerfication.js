import React,{useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import TextField from '../../components/TextField';
import {width} from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Button from '../../components/Button';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  title: {textAlign: 'center', fontSize: width(8.2)},
  codeFieldRoot: {marginTop: width(2)},
  cell: {
    width: 57,
    height: 62,
    lineHeight: 60,
    fontSize: width(6.6),
    borderRadius: 8,
    backgroundColor:Colors.white,
    elevation: 5,
    color: Colors.headingColor,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: Colors.darkGreen,
    borderWidth: 0.5,
    backgroundColor: Colors.backgroundColor,
  },
});

const CELL_COUNT = 4;
const OtpVerfication = ({route}) => {
  // console.log(route.params,"paramsssssssssssss");
  const {data,registerUser,navigateTo,codeSend,codeBody}=route?.params
  const navigation=useNavigation();
  const [passCode, setPassCode] = useState('');
  const [isloading,setIsLoading]=useState(false)
  const passCodeRef = useBlurOnFulfill({
    value: passCode,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: passCode,
    setValue: setPassCode,
  });


  const handleRegisterUser=()=>{
    if (passCode=="") {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Otp is required',
      })
    }else{
      let body={
        ...data,
        otp:passCode
      }
      setIsLoading(true)
      registerUser(body).then((res)=>{
        setIsLoading(false)
        if (res?.status==200) {
          setPassCode("")
          navigation.replace(navigateTo)
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: res?.data?.message,
          })
        }else{
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:res?.data?.message,
          })
        }
      }).catch((error)=>{
        setIsLoading(false)
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong',
        })
      })
    }
  }

  const handleResendCode = () => {
      setIsLoading(true)
      codeSend(codeBody)
      .then((res)=>{
        console.log(res?.data?.status,"ressssssssssssssss");
        console.log(codeBody,"codeBody");
        setIsLoading(false)
        // console.log(res,"respooooooooooooo");
        if (res?.status ==200 || res?.data?.status=="success") {
          console.log("ooooooooooooooooooooooooooo");
          Toast.show({
            type: 'success',
            text1: 'Suceess',
            text2: `Verification code has been sent to ${email} `,
          });
        }else{
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:res?.data?.message,
          });
        }
      }).catch((error)=>{
        setIsLoading(false)
        Toast.show({
          type: 'error',
          text1: 'helll',
          text2:"Something went wrong",
        });

      })
    }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#bde4f4",
      }}>
        <Loader isloading={isloading}/>
      <View>
        <View style={{alignItems:"center"}}>
          <Image source={Images.houseImage}
          style={{height: width(60), width: width(80)}}
          resizeMode="contain"/>
        </View>
        <View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{color: "#404969", fontSize: 30, fontWeight: '700'}}>
            Verification</Text>
        </View>
        <View style={{alignItems: 'center', }}>
          <Text style={{color: Colors.headingColor, fontSize: 20}}>
          Fill code to  verify your account
          </Text>
        </View>
        <View style={{marginHorizontal:width(10),marginTop:width(5)}}>
          <Text style={{color: Colors.headingColor, fontSize: 18}}>
          Mobile OTP
          </Text>
        </View>
        <KeyboardAwareScrollView>
        <View
          style={{
            marginBottom: width(8),
            width: width(80),
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            
          <CodeField
            ref={passCodeRef}
            {...props}
            value={passCode}
            onChangeText={setPassCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
          <View style={{marginHorizontal: width(5), marginTop: width(2)}}>
            <Button
              color={'white'}
              text={'Verify'}
              fontSize={18}
              backgroundColor={Colors.blue}
              onPress={handleRegisterUser}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: width(5)}}>
            <Text
              style={{
                color: Colors.darkGrey,
                fontSize: width(4),
                fontWeight: '500',
              }}>
              Didn’t get the OTP?{' '}
              <Text
                style={{
                  color: Colors.headingColor,
                }}
                onPress={handleResendCode}
                >
                Resend
              </Text>
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: width(2),
              marginTop: width(5),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            
          </View>
        </KeyboardAwareScrollView>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpVerfication;
