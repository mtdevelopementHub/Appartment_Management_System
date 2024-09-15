import Spinner from 'react-native-loading-spinner-overlay';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import Colors from '../constants/Colors';

const Loader = ({isloading}) => {
  return (
    <Spinner
      visible={isloading}
      color={Colors.headingColor}
      size="normal"
      customIndicator={<ActivityIndicator size="large" color={Colors.headingColor} />}
    />
  );
};

export default Loader;
