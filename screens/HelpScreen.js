import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

const HelpScreen = () => {
  return (
    <ScrollView style={styles.center}>
      <Text style={styles.header}>Hot Composting</Text>
      <Text>
        This method is good for large quantities in short time with high effort.
      </Text>
      <View style={styles.list}>
        <Text>
          1. Mix 2 parts brown material with one part green material (minimum 3
          feet wide by 3 feet tall).
        </Text>
        <View style={styles.list}>
          <Text>
            a. Although some people like layers, mixing it works just as well.
          </Text>
        </View>
        <Text>2. Keep moist, it should feel like a sponge.</Text>
        <View style={styles.list}>
          <Text>
            a. Keep in mind that the pile can be too dry or too wet, try to hit
            the sweet spot.
          </Text>
        </View>
        <Text>3. Turn/ stir the pile once a week for 4 weeks.</Text>
        <View style={styles.list}>
          <Text>
            a. The pile should be warmer than 140 degrees F and spongy.
          </Text>
        </View>
      </View>

      <Text style={styles.header}>Cool Composting</Text>
      <Text>
        This method is good for small quantities with time and space and minimal
        effort.
      </Text>
      <View style={styles.list}>
        <Text>
          • It is worth noting that although the quantity over time is small,
          the duration is large (1-2 years), so it will grow over time
        </Text>
        <Text>
          • Putting a layer of brown material on the top will control odours
        </Text>
        <Text>
          • Nitrogen rich green material like grass clippings should be added to
          maintain the 2 parts brown, 1 part green ratio
        </Text>
        <Text>
          • The cool pile has some risk because of its low heat, it can’t kill
          diseases so try not to introduce them to the pile
        </Text>
        <Text>• Turning the pile is optional, letting it sit is fine</Text>
        <View style={styles.list}>
          <Text>◦ However, if there’s an odour stirring often helps.</Text>
          <Text>
            ◦ To avoid odours try to ensure the pile isn’t too damp and doesn’t
            have too much green material
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>
          Worms can also be added to shallow compost, but this is a guide for
          community compost so it probably wont be shallow.
        </Text>
        <Text style={{ marginTop: 10 }}>
          The optimal method for your community compost is likely hot compost.
          Maybe assign a different member of your community to stir it every
          week to manage the load.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: "5%",
  },
  header: {
    marginTop: 10,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  list: {
    marginLeft: "5%",
  },
});

export default HelpScreen;
