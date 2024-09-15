import React, { useState } from "react";
import { Button, Text, View,TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Colors from "../constants/Colors";
import {width} from "react-native-dimension"

const Submenu=({isModalVisible,setModalVisible})=> {

  const data=[
    {
        id:1,
        path:"Chats",
        name:"New group"
    },
    {
        id:2,
        path:"Chats",
        name:"New Contact"
    },
    {
        id:3,
        path:"Chats",
        name:"Settings"
    }
  ]
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal isVisible={isModalVisible} style={{alignSelf:"flex-end",position:"absolute",top:width(8),right:0.2}}
    backdropColor="#ffffff00" backdropOpacity={0} onBackdropPress={toggleModal} animationOut="fadeOut" animationIn="fadeIn">
        <View style={{backgroundColor:Colors.boneColor,borderRadius:5}}>
         {data.map((item,ind)=>{
            return(
            <TouchableOpacity style={{paddingHorizontal:width(3),paddingVertical:width(3)}}>
                <Text style={{color:Colors.textColor,fontSize:16}}>{item.name}</Text>
            </TouchableOpacity>
            )
         })}
        </View>
        </Modal>
        
  );
}

export default Submenu;