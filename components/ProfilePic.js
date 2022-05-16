import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const ProfileImage = (props) => {
  // TODO: Setup image handler
  const handleUpload = () => {
    console.log("handleUpload");
  };

  return (
    <View style={[styles.wrapper]}>
      <TouchableOpacity onPress={handleUpload}>
        <Image style={[styles.image]} source={require("../assets/profile-placeholder.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 120,
  },
  image: {
    borderRadius: 150,
    height: 90,
    width: 90,
  },
});

export default ProfileImage;
