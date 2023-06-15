import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";

import * as SplashScreen from'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
import firebase from "firebase";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      light_theme: true,
      name:""
    };
  }
toggleSwitch(){
  const previous_state=this.state.isEnabled;
  const theme=!this.state.isEnabled?"dark":"light"
  var update={};
updates["/users"+firebase.auth().currentUser.uid+"/current_theme"]=theme;
firebase
.database()
.reff()
.update(updates);
this.setState({isEnabled:!previous_state,light_theme:previous_state});

  
}
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }
async FetchUser (){
  let theme, name, image;
  await firebase 
  .database()
  .ref("/users/"+firebase.auth().currentUser.uid)
  .on("value", function(snapshot){
    theme=snapshot.val().current_theme;
    name=`$`{snapshot.val().first_name}${snapshot.val().last_name};


  })
  this.setState({
    light_theme: theme==="light"?true:false,
    isEnabled:theme==="light"?false:true,
    name:
  })
}
  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <safeAreaView style={styles.droidSafeArea}/> 
          <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image 
            source={require("../assets/logo.png")}
            style={styles.iconImage}/>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>storyTellingApp</Text>
              </View>
              </View>
              <View style={styles.screenContainer}>
              <View style={styles.profileImageContainer}>
              <Image 
            source={require("../assets/profile_img.png")}
            style={styles.iconImage}/>
             <Text style={styles.nameText}>{this.state.name}</Text>
             
            <View style={styles.themeContainer}>
                  <Text style={styles.themeText}>darkTheme</Text>
                  <Switch 
                  style={{
                    transform:[{scaleX:1.3},{scaleY:1.3}
                    ]
                  }}
                  trackColor={{false:"#767577",true:"white"}}
                  thumbColour={this.state.isEnabled?"#ee8249":"f4f3f4"}
                  ios_backroundColor="#3e3e3e"
                  onValueChange={()=>this.toggleSwitch()}
                  value={this.state.isEnabled}/>
 </View></View>
        </View></View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
