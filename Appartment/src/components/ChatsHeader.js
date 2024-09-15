import React,{useState} from "react";
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {width} from 'react-native-dimension';
import Colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Submenu from "./Submenu";
import ImagePicker from 'react-native-image-crop-picker';


const ChatsHeader=()=>{

  const handleCaptureImage = () => {
    // ImagePicker.openPicker({
    //   mediaType: 'photo',
    //   includeBase64: false,
    //   cropping: true,
      
      
    // })
    //   .then(res => {
    //    console.log(res,"resppppppppppppppppppppppppp");
    //   })
    //   .catch(err => {});

      ImagePicker.openCamera({
        mediaType:'any',
        includeBase64: false,
        cropping: true,
        multiple:true        
      })
        .then(res => {
         console.log(res,"resppppppppppppppppppppppppp");
        })
        .catch(err => {})
  };
  const [isModalVisible,setModalVisible]=useState(false)
    return(
        <View
        style={{
          width: width(100),
          backgroundColor: Colors.darkGreen,
          height: width(20),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{width: width(40)}}>
          <Text
            style={{
              color: Colors.white,
              fontSize: 20,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Chat App
          </Text>
        </View>
        <View
          style={{
            width: width(40),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: width(5),
          }}>
          <TouchableOpacity style={{marginHorizontal: width(5)}} onPress={()=>handleCaptureImage()}>
            <Feather size={22} color={Colors.white} name="camera" />
          </TouchableOpacity>
          <View style={{marginHorizontal: width(5)}}>
            <AntDesign size={20} color={Colors.white} name="search1" />
          </View>
          <TouchableOpacity style={{marginHorizontal: width(5)}} onPress={()=>setModalVisible(!isModalVisible)}>
            <Entypo size={20} color={Colors.white} name="dots-three-vertical" />
          </TouchableOpacity>
        </View>
        <View>
        <Submenu isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>

      </View>
      </View>
    )
}

export default ChatsHeader