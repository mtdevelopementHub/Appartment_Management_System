import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {width} from 'react-native-dimension';
import Colors from '../constants/Colors';
const NewPicker = ({
  IconCategory,
  iconName,
  placeHolder,
  tag,
  endIconName,
  EndIconCat,
  numberofLines,
  enabled,
  maxLength,
  selectedValue,
  setComplaintData,
  complaintData,
  options,
  onChange,
}) => {
  return (
    <View>
      {tag && (
        <Text
          style={{
            marginLeft: width(1),
            fontWeight: '600',
            marginBottom: width(1),
            color: Colors.headingColor,
            fontSize: 12,
          }}>
          {tag}
        </Text>
      )}
      <View
        style={{
          borderRadius: 10,
          backgroundColor: Colors.white,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: width(1),
          elevation: 5,
        }}>
        <View
          style={{
            alignSelf: numberofLines ? 'flex-start' : 'center',
            marginTop: numberofLines ? width(2) : 0,
          }}></View>
        {/* <TextInput
        textAlignVertical={numberofLines ?"top" :"center"}
        multiline={numberofLines ? true : false}
        onChange={onChange}
        numberOfLines={numberofLines ? 5: 1}
        placeholder={placeHolder}
        placeholderTextColor={Colors.greyText}
        maxLength={maxLength}
        style={{
          color:Colors.textColor,
          flex:1,
          height:numberofLines ? width(20) : width(12)
        }}
        /> */}
        <Picker
          enabled={enabled}
          dropdownIconColor={Colors.headingColor}
          style={{width: '100%', fontSize: 13}}
          itemStyle={{
            backgroundColor: 'white',
            fontSize: 13,
            color: Colors.blue,
          }}
          selectedValue={selectedValue}
          onValueChange={text =>
            setComplaintData({
              ...complaintData,
              serviceName: text,
            })
          }>
          <Picker.Item label="Please select type" value={''} color="black" />
          {options?.map((item, ind) => {
            return <Picker.Item label={item} value={item} color="black" />;
          })}
        </Picker>
        {endIconName && (
          <View>
            <EndIconCat name={endIconName} size={20} color={Colors.darkGreen} />
          </View>
        )}
      </View>
    </View>
  );
};

export default NewPicker;
