import React, { createContext, useState, useEffect, memo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

const AppProvider = (props) => {
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedAdmin = await AsyncStorage.getItem("admin");
        const storedUser = await AsyncStorage.getItem("users");
        if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to load data from AsyncStorage", error);
      }
    };

    loadStoredData();
  }, []);

  const loginUserContext = async (data) => {
    try {
      await AsyncStorage.setItem("users", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.error("Failed to save user data to AsyncStorage", error);
    }
  };

  const adminLogin = async (data) => {
    try {
      await AsyncStorage.setItem("admin", JSON.stringify(data));
      setAdmin(data);
    } catch (error) {
      console.error("Failed to save admin data to AsyncStorage", error);
    }
  };

  const logoutAdmin = async () => {
    try {
      await AsyncStorage.removeItem("admin");
      setAdmin(null);
    } catch (error) {
      console.error("Failed to remove admin data from AsyncStorage", error);
    }
  };

  const userLogout = async () => {
    try {
      await AsyncStorage.removeItem("users");
      setUser(null);
    } catch (error) {
      console.error("Failed to remove user data from AsyncStorage", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        loginUserContext,
        adminLogin,
        logoutAdmin,
        userLogout,
        admin,
        user,
        setAdmin,
        setUser
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default memo(AppProvider);
