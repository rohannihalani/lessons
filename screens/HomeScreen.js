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
  FlatList,
  Animated,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as AsyncStorage from "../utils/AsyncStorage";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

function HomeScreen() {
  const navigation = useNavigation();
  const [lessonList, setLessonList] = useState([]);
  const [numLessons, setNumLessons] = useState(0);
  let row = [];
  let prevOpenedRow;

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

  const setList = async (text = "This is my first lesson!") => {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();
    const currentYear = date.getYear() + 1900;
    const fullDate =
      monthConvert(currentMonth) + " " + currentDay + ", " + currentYear;
    const lesson = text;
    const item = { date: fullDate, lesson: lesson };
    const newList = [...lessonList, item];
    setLessonList((lessonList) => [...lessonList, item]);
    console.log(lessonList);
    await AsyncStorage.setItem("lessons", newList);
    const n = await AsyncStorage.getItem("lessons");
    console.log(n);
    await AsyncStorage.setItem("number", newList.length);
    setNumLessons(newList.length);
    // console.log(lessonList);
  };

  useEffect(() => {
    async function fetchData() {
      const lessons = await AsyncStorage.getItem("lessons");
      const date = new Date();

      if (lessons != null) {
        setLessonList(lessons);
        setNumLessons(lessonList.length);
        await AsyncStorage.setItem("number", lessons.length);
        await AsyncStorage.setItem("date", date.getDate());
        setNumLessons(lessons.length);
      } else {
        // setLessonList([]);
        await AsyncStorage.setItem("number", 0);
      }
    }
    fetchData();
  }, []);

  const addLesson = () => {
    navigation.navigate("Add", {
      onGoBack: (data) => {
        // await AsyncStorage.setItem("lessons", lessonList);
        // const updatedLessons = AsyncStorage.getItem("lessons");
        setList(data);

        // setLessonList(updatedLessons);
      },
    });
  };

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const deleteLesson = async (index) => {
    let a = lessonList;
    a.splice(index, 1);
    console.log(index);
    setLessonList([...a]);
    await AsyncStorage.setItem("lessons", a);
    setNumLessons(lessonList.length);
    await AsyncStorage.setItem("number", lessonList.length);
  };

  const renderRightView = (progress, dragX, index) => {
    return (
      <TouchableOpacity
        onPress={() => deleteLesson(index)}
        style={styles.deleteButton}
      >
        <Text style={{ color: "white", padding: "2%", fontWeight: "600" }}>
          Delete
        </Text>
      </TouchableOpacity>
    );
  };

  const spotlight = () => {
    navigation.navigate("Spotlight");
  };

  return (
    <GestureHandlerRootView>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.editButton}>
            <Text style={styles.editButtonText}>Lessons: {numLessons}</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={addLesson}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Lessons</Text>
        </View>
        <View style={styles.lessonContainer}>
          <FlatList
            data={lessonList}
            renderItem={({ item, index }) => (
              <Swipeable
                renderRightActions={(progress, dragX) =>
                  renderRightView(progress, dragX, index)
                }
                onSwipeableOpen={() => closeRow(index)}
                ref={(ref) => (row[index] = ref)}
                // rightThreshold={-10}
              >
                <View style={styles.lesson}>
                  <Text style={styles.lessonDate}>{item.date}</Text>
                  <Text style={styles.lessonText}>{item.lesson}</Text>
                </View>
              </Swipeable>
            )}
          />
        </View>
        {/* NAVBAR START */}
        <View style={styles.navbar}>
          <View style={styles.navItem}>
            <TouchableOpacity style={styles.navButton}>
              <Icon name="book" size={25} color={"#8D86C9"}></Icon>
              <Text style={{ color: "#8D86C9", paddingTop: "2%" }}>
                Journal
              </Text>
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
    </GestureHandlerRootView>
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
    fontSize: "30%",
    color: "#8D86C9",
  },
  lessonContainer: {
    flex: 10,
    width: "100%",
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // paddingHorizontal: "5%",
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
    borderWidth: 1,
    borderColor: "#242038",
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
  deleteButton: {
    marginVertical: "5%",
    marginRight: "5%",

    alignContent: "center",

    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: 20,
  },
});

export default HomeScreen;
