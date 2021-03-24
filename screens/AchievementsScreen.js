import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Achievement from "../components/AchievementsScreen/Achievement";
import firebase from "../firebase";

const AchievementsScreen = () => {
  const isAchieved = () => {
    return false;
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.center}>
        <View style={styles.achievementRow}>
          <Achievement
            title={"First Compost"}
            isFill={isAchieved("first_comp")}
            code={"first_comp"}
          />
          <Achievement
            title={"5 Composts"}
            isFill={isAchieved("5_comp")}
            code={"5_comp"}
          />
          <Achievement
            title={"10 Composts"}
            isFill={isAchieved("10_comp")}
            code={"10_comp"}
          />
        </View>
        <View style={styles.achievementRow}>
          <Achievement
            title={"100 Composts"}
            isFill={isAchieved("100_comp")}
            code={"100_comp"}
          />
          <Achievement
            title={"5 Day Streak"}
            isFill={isAchieved("5_streak")}
            code={"5_streak"}
          />
          <Achievement
            title={"25 Day Streak"}
            isFill={isAchieved("25_streak")}
            code={"25_streak"}
          />
        </View>
        <View style={styles.achievementRow}>
          <Achievement
            title={"Meet Weekly Goal"}
            isFill={isAchieved("weekly_goal")}
            code={"weekly_goal"}
          />
          <Achievement
            title={"Meet Weekly Goal 3 Times"}
            isFill={isAchieved("3_weekly_goal")}
            code={"3_weekly_goal"}
          />
          <Achievement
            title={"Prevent 1kg Emissions"}
            isFill={isAchieved("1kg_emission")}
            code={"1kg_emission"}
          />
        </View>
        <View style={styles.achievementRow}>
          <Achievement
            title={"Get 3 Stars"}
            isFill={isAchieved("3_star")}
            code={"3_star"}
          />
          <Achievement
            title={"Compost 10kg"}
            isFill={isAchieved("10kg_comp")}
            code={"10kg_comp"}
          />
          <Achievement
            title={"Compost 100kg"}
            isFill={isAchieved("100kg_comp")}
            code={"100kg_comp"}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    marginHorizontal: "5%",
  },
  achievementRow: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
    paddingVertical: "5%",
  },
});

export default AchievementsScreen;
