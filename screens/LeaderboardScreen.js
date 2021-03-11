import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native";
import LeaderboardEntry from "../components/LeaderboardScreen/LeaderboardEntry";

const LeaderboardScreen = () => {
  var rank = 0;
  const [topUserList, setTopUserList] = useState([
    { placement: "first", rank: ++rank, key: rank.toString() },
    { placement: "second", rank: ++rank, key: rank.toString() },
    { placement: "third", rank: ++rank, key: rank.toString() },
    { placement: "", rank: ++rank, key: rank.toString() },
    { placement: "", rank: ++rank, key: rank.toString() },
    { placement: "", rank: ++rank, key: rank.toString() },
    { placement: "", rank: ++rank, key: rank.toString() },
    { placement: "", rank: ++rank, key: rank.toString() },
    { placement: "", rank: ++rank, key: rank.toString() },
    { placement: "", rank: ++rank, key: rank.toString() },
  ]);

  const getUser = (rank) => {
    {
      /* get name/"score" of a user with given rank from database
    used to get highest ranking users (probably top 50)
    will implement this function after finishing setting up database*/
    }
    return 0;
  };

  const getRank = () => {
    {
      /* get rank of the current user from database
    will implement this function after finishing setting up database */
    }
    return 176;
  };
  const getScore = () => {
    {
      /* get score of the current user from database
    user's rank will displayed beneath highest ranking
    will implement this function after finishing setting up database */
    }
    return 5000;
  };

  return (
    <FlatList
      data={topUserList}
      renderItem={(itemData) => (
        <View style={styles.center}>
          <LeaderboardEntry
            name="Name"
            score="Score"
            rank={itemData.item.rank}
            isUser={false}
          />
        </View>
      )}
      ListFooterComponent={
        <View style={styles.userScore}>
          <LeaderboardEntry
            name="You"
            score={getScore()}
            rank={getRank()}
            isUser={true}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  userScore: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default LeaderboardScreen;
