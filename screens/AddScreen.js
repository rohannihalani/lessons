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
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as AsyncStorage from "../utils/AsyncStorage";

function AddScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [lessonText, setLessonText] = useState("");

  const [date, setDate] = useState("");

  function monthConvert(num) {
    if (num === 0) {
      return "January";
    } else if (num === 1) {
      return "February";
    } else if (num === 2) {
      return "March";
    } else if (num === 3) {
      return "April";
    } else if (num === 4) {
      return "May";
    } else if (num === 5) {
      return "June";
    } else if (num === 6) {
      return "July";
    } else if (num === 7) {
      return "August";
    } else if (num === 8) {
      return "September";
    } else if (num === 9) {
      return "October";
    } else if (num === 10) {
      return "November";
    } else if (num === 11) {
      return "December";
    } else {
      return "Unknown";
    }
  }

  function getDate() {
    const newDate = new Date();
    const currentMonth = newDate.getMonth();
    const currentDay = newDate.getDate();
    const currentYear = newDate.getYear() + 1900;
    const fullDate =
      monthConvert(currentMonth) + " " + currentDay + ", " + currentYear;
    return fullDate;
  }

  const setList = async (text) => {
    const fullDate = getDate();
    const lesson = text;
    const item = { date: fullDate, lesson: lesson };
    const lessonList = AsyncStorage.getItem("lessons");
    const newList = [...lessonList, item];

    await AsyncStorage.setItem("lessons", newList);

    // console.log(lessonList);
  };

  useEffect(() => {
    completeDate = getDate();
    setDate(completeDate);
  }, []);

  const submitLesson = () => {
    data = lessonText;
    // setList(data);
    route.params.onGoBack(data);
    setLessonText("");
    navigation.goBack();
  };

  const homeScreen = () => {
    setLessonText("");
    navigation.navigate("Home");
  };

  const spotlight = () => {
    setLessonText("");
    navigation.navigate("Spotlight");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.editButton} onPress={homeScreen}>
          <Text style={styles.editButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={submitLesson}>
          <Text style={styles.addButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Add Lesson</Text>
      </View>
      <View style={styles.lessonContainer}>
        <View style={styles.lesson}>
          <View style={styles.addTextDate}>
            <Text style={styles.lessonDate}>{date}</Text>
          </View>

          <TextInput
            onChangeText={(text) => setLessonText(text)}
            value={lessonText}
            placeholder="Type Lesson Here"
            // placeholderTextColor="#242038"
            selectionColor="#242038"
            multiline={true}
            textAlign="false"
            style={{ width: "100%", padding: "5%" }}
          />
        </View>
      </View>
      {/* NAVBAR START */}
      <View style={styles.navbar}>
        <View style={styles.navItem}>
          <TouchableOpacity style={styles.navButton}>
            <Icon name="book" size={25} color={"#8D86C9"}></Icon>
            <Text style={{ color: "#8D86C9", paddingTop: "2%" }}>Journal</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navItem}>
          <TouchableOpacity style={styles.navButton} onPress={spotlight}>
            <Icon name="lightbulb" size={25} color={"#242038"}></Icon>
            <Text style={{ color: "#242038", paddingTop: "2%" }}>
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
    width: "100%",
    height: "100%",
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
    // padding: "5%",
    backgroundColor: "#CAC4CE",
    borderRadius: 20,
    alignItems: "center",
    height: "80%",

    borderWidth: 1,
  },

  lessonDate: {
    fontWeight: "bold",
    fontSize: "15%",
  },
  addTextDate: {
    paddingTop: "5%",
    paddingBottom: "2%",
    borderBottomWidth: 2,
    borderBottomColor: "#242038",
    width: "100%",
    alignItems: "center",
  },
  navButton: {
    alignItems: "center",
  },
});

export default AddScreen;
