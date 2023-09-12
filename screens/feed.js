import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, Image, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from "react-native-responsive-fontsize";
import *as Font from "expo-font";
import *as SplashScreen from "expo-splash-screen";
import StoryCard from './storyCard';
import firebase from 'firebase';

var stories = require("./temp_stories.json")


SplashScreen.preventAutoHideAsync();

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Feed extends Component {

    constructor(props) {
        super(props)
        this.state = { fontsLoaded: false,
                       light_theme: true 
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true,
                        
        });
    }

    componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
    }

    async fetchUser() {
        let theme
        await firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", function (snapshot) {
            theme = snapshot.val().current_theme;
          });
        this.setState({
          light_theme: theme === "light" ? true : false
        });
      }
      //this.state.light_theme?:

    renderItem = ({ item: story }) => {
        return <StoryCard story={story} navigation={this.props.navigation}/>;
      };
    
    keyExtractor = (item, index) => index.toString();
    

    render() {
        if (this.state.fontsLoaded) {
            SplashScreen.hideAsync();
            return (
                <View style={this.state.light_theme ?styles.containerLight :styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image
                                source={require("../assets/logo.png")}
                                style={styles.iconImage}
                            ></Image>
                        </View>
                        <View style={styles.appTitleTextContainer}>
                            <Text style={this.state.light_theme ?styles.appTitleTextLight :styles.appTitleText}>App Narração de Histórias</Text>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={stories}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>

            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    containerLight: {
      flex: 1,
      backgroundColor: "white"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    appTitleTextLight: {
      color: "black",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    cardContainer: {
      flex: 0.85
    }
  });