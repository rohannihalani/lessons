import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  setInterval,
  clearInterval,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function SpotlightScreen() {
  const navigation = useNavigation();

  const journal = () => {
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Lessons: 5</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Spotlight</Text>
      </View>
      <View style={styles.lessonContainer}>
        <View style={styles.lesson}>
          <Text style={styles.lessonDate}>June 1st, 2024</Text>
          <Text style={styles.lessonText}>
            My daily lesson today was that when I went home I did this really
            cool thing and it was super cool then i ate a yogurt and wow it was
            just awesmoe
          </Text>
        </View>
      </View>
      {/* NAVBAR START */}
      <View style={styles.navbar}>
        <View style={styles.navItem}>
          <TouchableOpacity style={styles.navButton} onPress={journal}>
            <Icon name="book" size={25} color={"#242038"}></Icon>
            <Text style={{ color: "#242038", paddingTop: "2%" }}>Journal</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navItem}>
          <TouchableOpacity style={styles.navButton}>
            <Icon name="lightbulb" size={25} color={"#8D86C9"}></Icon>
            <Text style={{ color: "#8D86C9", paddingTop: "2%" }}>
              Spotlight
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* NAVBAR END */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7ECE1",
  },
  topBar: {
    top: "5%",
    justifyContent: "space-between",
    paddingTop: "10%",
    paddingHorizontal: "5%",
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  titleContainer: {
    paddingHorizontal: "5%",
    paddingTop: "5%",
    paddingBottom: "3%",
    borderBottomWidth: 1,
    borderBottomColor: "#242038",
    flex: 1,
    width: "100%",
  },
  title: {
    color: "#242038",
    fontSize: "45%",
  },
  editButtonText: {
    color: "#8D86C9",
    fontSize: "20%",
  },
  editButton: {
    justifyContent: "center",
  },
  addButton: {
    justifyContent: "center",
  },

  addButtonText: {
    fontSize: "20%",
    color: "#8D86C9",
  },
  lessonContainer: {
    flex: 10,
    justifyContent: "center",
  },
  navbar: {
    flex: 1,
    borderTopWidth: 1,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: "20%",
    paddingTop: "5%",
    paddingBottom: "3%",
    justifyContent: "space-between",
  },
  lesson: {
    margin: "5%",
    padding: "5%",
    backgroundColor: "#CAC4CE",
    borderRadius: 20,
    alignItems: "center",
  },
  lessonText: {
    paddingTop: "5%",
  },
  lessonDate: {
    fontWeight: "bold",
  },
  navButton: {
    alignItems: "center",
  },
});

export default SpotlightScreen;
