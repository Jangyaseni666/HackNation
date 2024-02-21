import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    useWindowDimensions,
  } from "react-native";
  import { useState, useEffect } from "react";
  import { AntDesign } from "@expo/vector-icons";
  import { FontAwesome } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { Entypo } from "@expo/vector-icons";
  import React from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import ShopCard from "../components/ShopCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
  
  const MallPage = () => {
    const [mallName, setMallName] = useState("");
    const [mallAddr, setMallAddr] = useState("");
    const [shopIds, setShopIds] = useState([]);
    const navigation = useNavigation();
    const [storeData, setStoreData] = useState([]);

    // const get_id = async () => {
    //   // const response = await fetch(`${Link}/`, {
    //   //   method: "GET",
    //   // });
    //   // console.log(response);
    //   // if (response.ok) {
    //   //   const data = await response.json();
    //   //   console.log(data);
    //   //   setShopIds(data);
    //   // } else {
    //   //   const err = await response.json();
    //   //   console.log(err);
    //   // }
    //   const data = [1, 2, 3, 4, 5];
    //   setShopIds(data);
    // };
    
    console.log('here')
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "StoreData"));
        console.log('inside fetchData')
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setStoreData((prevData) => [...prevData, ...data.filter(item => !prevData.some(existingItem => existingItem.id === item.id))]);
      console.log(data);
    };
    
    useEffect(() => {
        fetchData();
      }, []);
    return (
      <View style={{ paddingTop: 30 }}>
        {/* bg img */}
        <View style={styles.container}>
          <ImageBackground
            style={{ height: 150, width: "100%" }}
            source={require("../assets/defaultMall.jpg")}
          >
            <View style={styles.backArrow}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
              />
            </View>
          </ImageBackground>
        </View>
        {/* Discount */}
        <LinearGradient
          colors={["lightgray", "transparent"]}
          style={{
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
            height: 100,
          }}
        >
          <View>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              {mallName == "" ? "Mall name" : mallName}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Entypo
                name="location-pin"
                size={15}
                color="gray"
                style={{ marginTop: 2 }}
              />
              <Text style={{ fontSize: 14, color: "gray" }}>
                {mallAddr == "" ? "Mall address" : mallAddr}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center", marginRight: 50 }}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: "orange",
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, color: "white" }}
                >
                  {storeData.length}
                </Text>
                <Text style={{ color: "white" }}>shops</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <Text style={{ paddingHorizontal: 20, fontSize: 20, fontWeight: "bold" }}>
          Store List
        </Text>
        <ScrollView style={{ paddingHorizontal: 20, height: "65%" }}>
          {storeData.map((data) => (
            <ShopCard shopName={data['shopName']} review={'4'} pfp={data['pfp']} shopId={data['id']}/>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  export default MallPage;
  
  const styles = StyleSheet.create({
    backArrow: {
      margin: 10,
      backgroundColor: "white",
      width: 25,
      height: 25,
      borderRadius: 50,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });