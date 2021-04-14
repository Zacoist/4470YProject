import styled from "styled-components/native";
//import { scaleQuantize } from "d3";

export const ContainerView = styled.View({
  marginTop: 4,
  marginBottom: 5,
  marginRight: 4,
  marginLeft: 2,
  flexDirection: "column",
  padding: 5,
  backgroundColor: "#56C568",
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  display: "flex",
  alignItems: "center",
  width: "48%",
});

export const ForcastText = styled.Text({
  marginTop: 2,
  marginBottom: 2,
});

export const ForcastTextDate = styled.Text({
  color: "white",
  fontSize: 18,
  textAlign: "center",
  fontWeight: "bold",
  // width: "50%",
  // paddingLeft: 10,
});

export const ForcastTextSpacer = styled.Text({
  color: "black",
  fontSize: 18,
});

export const Wrapper = styled.View({
  flex: 1,
  flexDirection: "column",
});

export const ForcastCurrentDate = styled.Text({
  flex: 1,
  color: "white",
  fontWeight: "bold",
  fontSize: 18,
  textAlign: "center",
});

export const ForcastDataWrapper = styled.View({
  flex: 1,
  flexDirection: "row",
});

export const ForcastLocation = styled.View({
  marginTop: 4,
  marginBottom: 4,
  marginRight: 3,
  marginLeft: 3,
  padding: 5,
  width: "33%",
  backgroundColor: "#56C568",
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
});

export const ForcastLocationTitle = styled.Text({
  margin: 6,
  textAlign: "center",
  fontSize: 13,
  fontWeight: "bold",
});

export const ForcastDataList = styled.View({
  flexDirection: "row",
  display: "flex",
  flex: 1,
});

export const ForcastItemLabel = styled.Text({
  flexGrow: 1,
  color: "black",
  flex: 50,
  fontSize: 13,
  textAlign: "left",
  fontWeight: "bold",
});

export const ForcastItemSpace = styled.Text({
  flexGrow: 1,
  color: "black",
  fontSize: 13,
  textAlign: "center",
  fontWeight: "bold",
});

export const ForcastItemValue = styled.Text({
  color: "black",
  fontSize: 15,
  textAlign: "right",
});

export const ForcastItem = styled.View({
  flexDirection: 1,
  flexDirection: "row",
  padding: 6.5,
  //borderWidth: 2,
  //borderColor: "black",
  // textAlign: "center",
  alignItems: "center",
});

export const ForcastItemCurrent = styled.View({
  flexDirection: 1,
  flexDirection: "row",
  padding: 6.5,
  //borderWidth: 2,
  borderColor: "black",
  //textAlign: "center",
  alignItems: "center",
});
