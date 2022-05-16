import React, { useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ChatRoom from "./../components/ChatRoom";
import { useDispatch, useSelector } from "react-redux";

import { toggleHappy, newChatRoom, deleteChatRoom, fetchChatRooms } from "./../store/actions/ChatActions";
import defaultStyles from "./../GeneralStyles";

const ChatScreen = (props) => {
  const isHappy = useSelector((state) => state.chat.isHappy);
  const chatRooms = useSelector((state) => state.chat.chatRooms);

  const [text, onChangeText] = useState("");
  const dispatch = useDispatch();

  const handleChristianHappy = () => {
    dispatch(toggleHappy(!isHappy));
    console.log(useState);
  };

  React.useEffect(() => {
    console.log("fetching chatrooms");
    dispatch(fetchChatRooms());
  }, []);

  return (
    <View style={styles.container}>
      <Text>Is Christian happy? {String(isHappy)}</Text>
      <Button title="Flip Christian Happy" onPress={handleChristianHappy} />

      <TextInput style={defaultStyles.textInput} onChangeText={onChangeText} value={text} />

      <Button title="Test create chatroom" onPress={() => dispatch(newChatRoom(text))} />
      <Button title="Test delete chatroom" onPress={() => dispatch(deleteChatRoom(text))} />
      <FlatList data={chatRooms} renderItem={(itemData) => <ChatRoom chatroom={itemData.item}></ChatRoom>} keyExtractor={(item) => item.chatRoomId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
