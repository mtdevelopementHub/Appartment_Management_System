import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import UserStack from './AppStack';
import AdminStack from './AdminStack';
import Loader from '../components/Loader';
import  Colors  from '../constants/Colors';
import { View } from 'react-native';
import {AppContext}  from '../context/index';  // Assuming the context is defined in this path

export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const { admin, user, setAdmin, setUser } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const adminData = await AsyncStorage.getItem('admin');

      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      }

      if (adminData) {
        const parsedAdminData = JSON.parse(adminData);
        setAdmin(parsedAdminData);
      }
    } catch (error) {
      console.error('Failed to load user/admin data from AsyncStorage', error);
    }
  };

  const renderStack = () => {
    if (admin) {
      return <AdminStack />;
    } else if (user) {
      return <UserStack />;
    } else {
      return <AuthStack />;
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      {isLoading ? (
        <View style={{ backgroundColor: Colors.blue, flex: 1 }} />
      ) : (
        <NavigationContainer>
          {renderStack()}
        </NavigationContainer>
      )}
    </>
  );
}
