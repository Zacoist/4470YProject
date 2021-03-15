import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Achievement from "../components/AchievementsScreen/Achievement";

const AchievementsScreen = () => {
  const isAchieved = (achievementTitle) => {
    {
      /* Checks database for achievement completion status
    return true if complete, false otherwise
    will implement after setting up achievement trackers in database */
    }
    return false;
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.center}>
        <View style={styles.achievementRow}>
          <Achievement
            title={"First Compost"}
            isFill={isAchieved("First Compost")}
          />
          <Achievement title={"5 Composts"} isFill={isAchieved("5 Compost")} />
          <Achievement
            title={"10 Composts"}
            isFill={isAchieved("10 Compost")}
          />
        </View>
        <View style={styles.achievementRow}>
          <Achievement
            title={"100 Composts"}
            isFill={isAchieved("100 Compost")}
          />
          <Achievement
            title={"5 Day Streak"}
            isFill={isAchieved("5 Day Streak")}
          />
          <Achievement
            title={"25 Day Streak"}
            isFill={isAchieved("25 Day Streak")}
          />
        </View>
        <View style={styles.achievementRow}>
          <Achievement
            title={"Meet Weekly Goal"}
            isFill={isAchieved("Meet Weekly Goal")}
          />
          <Achievement
            title={"Meet Weekly Goal 3 Times"}
            isFill={isAchieved("Meet Weekly Goal 3 Times")}
          />
          <Achievement
            title={"Prevent 1kg Emissions"}
            isFill={isAchieved("Prevent 1kg Emissions")}
          />
        </View>
        <View style={styles.achievementRow}>
          <Achievement
            title={"Get 3 Stars"}
            isFill={isAchieved("Get 3 Stars")}
          />
          <Achievement
            title={"Compost 10kg"}
            isFill={isAchieved("Compost 10kg")}
          />
          <Achievement
            title={"Compost 100kg"}
            isFill={isAchieved("Compost 100kg")}
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
