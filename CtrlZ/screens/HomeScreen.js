import { StyleSheet, Text, View, StatusBar, TextInput, FlatList, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import HomeHeadNav from '../components/HomeHeadNav'
import BottomNav from '../components/BottomNav'
import Categories from '../components/Categories'
import Cardslider from '../components/Cardslider'
import OfferSlider from '../components/OfferSlider'
import { colors } from '../globals/style'
// import firebase from 'firebase'
import {db} from '../firebase.js'
import { collection, getDocs } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {

  const [storeData, setStoreData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredStoreData, setFilteredStoreData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "StoreData"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setStoreData((prevData) => [...prevData, ...data.filter(item => !prevData.some(existingItem => existingItem.id === item.id))]);
      console.log(data);
    };
    fetchData();
  }, [search]);

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = storeData.filter((item) =>
      item.storeName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStoreData(filteredData);
  };

    return (
      <SafeAreaView styles={styles.container}>
          <StatusBar />
          <HomeHeadNav navigation={navigation} />
          
          <ScrollView style={{marginBottom: 100}} showsVerticalScrollIndicator={false}>
                  <View View style={styles.searchbox}>
                      <AntDesign name="search1" size={24} color="black" style={
                          styles.searchicon
                      } />
                      <TextInput style={styles.input} placeholder="Search" 
                      onChangeText={(text) => {
                          handleSearch(text)
                      }} />
                  </View>
                  <Categories />
                  {/* <OfferSlider /> */}
                  {search != '' && <View style={styles.seacrhresultsouter}>
                    <FlatList style={styles.searchresultsinner} data={storeData} renderItem={
                        ({ item }) => {
                            if (item.storeName.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <View style={styles.searchresult}>
                                        <AntDesign name="arrowright" size={24} color="black" />
                                        <Text style={styles.searchresulttext}>{item.storeName}</Text>
                                    </View>
                                )
                            }
                        }
                    } />
                </View>}
                <Cardslider data={filteredStoreData.length > 0 ? filteredStoreData : storeData} navigation={navigation} />
          </ScrollView>
          <View style={styles.bottomnav}>
            <BottomNav navigation={navigation} />
          </View>
      </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
      // marginTop: 50,
      flex: 1,
      backgroundColor: colors.col1,
      // alignItems: 'center',
      width: '100%',
      height: '150%',
  },
  searchbox: {
      flexDirection: 'row',
      width: '90%',
      backgroundColor: colors.col1,
      borderRadius: 30,
      alignItems: 'center',
      padding: 10,
      margin: 20,
      elevation: 10,
  },
  input: {
      marginLeft: 10,
      width: '90%',
      fontSize: 18,
      color: colors.text1,
  },
  searchicon: {
      color: colors.text1,
  },
  seacrhresultsouter: {
      width: '100%',
      marginHorizontal: 30,
      height: '100%',
      backgroundColor: colors.col1,
  },
  searchresultsinner: {
      width: '100%',
  },
  searchresult: {
      width: '100%',
      flexDirection: 'row',
      // alignItems: 'center',
      padding: 5,
  },
  searchresulttext: {
      marginLeft: 10,
      fontSize: 18,
      color: colors.text1,
  },
  bottomnav: {
      position: 'absolute',
      bottom: 50,
      width: '100%',
      backgroundColor: colors.col1,
      zIndex: 20,
      elevation: 20,
  },
  view1: {
    borderRadius: "0px 0px 10px 10px",
    backgroundColor: "#FFF",
    position: "relative",
    display: "flex",
    marginTop: 116,
    width: "100%",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: 20,
    padding: "15px 9px 7px",
  },
  view2: {
    display: "flex",
    flexGrow: "1",
    flexBasis: "0%",
    flexDirection: "column",
    alignItems: "stretch",
  },
  view3: {
    alignSelf: "start",
    display: "flex",
    marginLeft: 20,
    flexDirection: "column",
    alignItems: "stretch",
    textAlign: "center",
  },
  view4: {
    color: "#000",
    font: "15px/140% Segoe UI, sans-serif ",
  },
  view5: {
    color: "#3C3636",
    font: "10px/210% Segoe UI, sans-serif ",
  },
  view6: {
    display: "flex",
    marginTop: 11,
    alignItems: "start",
    justifyContent: "space-between",
    gap: 8,
    fontSize: 10,
    color: "#3C3636",
  },
  image2: { position: "relative", width: 21, aspectRatio: "1" },
  view7: {
    display: "flex",
    flexGrow: "1",
    flexBasis: "0%",
    flexDirection: "column",
    alignItems: "stretch",
  },
  view8: {
    textAlign: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  view9: {
    fontFamily: "Segoe UI, sans-serif",
  },
  view10: {
    alignSelf: "start",
    display: "flex",
    flexBasis: "0%",
    flexDirection: "column",
    alignItems: "stretch",
    textAlign: "center",
  },
  view11: {
    display: "flex",
    paddingLeft: 36,
    flexDirection: "column",
    alignItems: "stretch",
    fontSize: 10,
  },
  view12: {
    borderRadius: 4,
    backgroundColor: "#2B7D0F",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: 4,
    color: "#FFF",
    padding: "4px 11px",
  },
  view13: {
    fontFamily: "Segoe UI, sans-serif",
  },
  image3: { fill: "#FFF", position: "relative", width: 8, aspectRatio: "1" },
  view14: {
    color: "#3C3636",
    fontFamily: "Segoe UI, sans-serif",
  },
  view15: {
    display: "flex",
    marginTop: 11,
    alignItems: "start",
    justifyContent: "space-between",
    gap: 6,
    fontSize: 7,
  },
  image4: { position: "relative", width: 18, aspectRatio: "1" },
  view16: {
    borderRadius: 2,
    backgroundColor: "#196B44",
    display: "flex",
    flexGrow: "1",
    flexBasis: "0%",
    flexDirection: "column",
    alignItems: "stretch",
    padding: "2px 0",
  },
  view17: {
    fontFamily: "Segoe UI, sans-serif",
    borderRadius: 1,
    backgroundColor: "#EDD925",
    aspectRatio: "7.63",
    justifyContent: "center",
    alignItems: "stretch",
    color: "#3C3636",
    padding: "2px 12px",
  },
  view18: {
    color: "#FFF",
    fontFamily: "Segoe UI, sans-serif",
    alignSelf: "center",
  },
})
