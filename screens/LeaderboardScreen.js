import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native";
import LeaderboardEntry from "../components/LeaderboardScreen/LeaderboardEntry";
import firebase from "../firebase";

const LeaderboardScreen = () => {
  var rank = 0;
  const [topUserList, setTopUserList] = useState([]);

  useEffect(() => {
    const getTopUsers = async () => {
      var topUsers = [];

      for (var i = 1; i <= 3; i++) {
        var pos = "";
        switch (i) {
          case 1:
            pos = "first";
            break;
          case 2:
            pos = "second";
            break;
          case 3:
            pos = "third";
            break;
        }

        var currUser = {};
        var leaderboardRef = firebase.database().ref("leaderboard/" + pos);
        var snapshot = await leaderboardRef.once("value");

        currUser["rank"] = i;
        currUser["loc"] = snapshot.val().location;
        currUser["name"] = snapshot.val().name;
        currUser["score"] = snapshot.val().score;

        topUsers.push(currUser);
      }

      setTopUserList(topUsers);
    };
    getTopUsers();
  }, []);

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
            name={itemData.item.name}
            score={itemData.item.score}
            rank={itemData.item.rank}
            location={itemData.item.loc}
            isUser={false}
          />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
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
