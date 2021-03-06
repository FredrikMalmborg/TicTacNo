import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useContext, useEffect } from "react";
import { StyleSheet, StyleProp, ViewStyle, SafeAreaView } from "react-native";
import { Grid, Row } from "react-native-easy-grid";

import Logotype from "../../components/logotype";
import TicTacText from "../../components/text/Text";
import colors from "../../constants/colors";
import AuthContext from "../../contexts/auth/auth-context";
import RoomContext from "../../contexts/room/room-context";
import { StackParamlist } from "../page-navigation/PageNavigator";

import { Pages } from "../pages";
interface IStyles {
  container: StyleProp<ViewStyle>;
  section: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;

  animate: StyleProp<ViewStyle>;
}
interface Props {
  navigation: StackNavigationProp<StackParamlist, "StartPage">;
}

const StartPage = ({ navigation }: Props) => {
  const { userStatus, authContext } = useContext(AuthContext);
  const { roomContext } = useContext(RoomContext);

  useEffect(() => {
    if (userStatus.userToken !== null) {
      fetchGameAndReconnect();
    }
  }, [userStatus]);

  const fetchGameAndReconnect = useCallback(async () => {
    const ongoingGame = await roomContext.checkForOngoingGame();
    if (ongoingGame) {
      // Reconnect to room and navigate to room state (pre or ongoing)
      roomContext.reconnectToOngoing(ongoingGame.room);
      if (ongoingGame.host) {
        navigation.navigate(Pages.GamePage, { condition: "RECON-HOST" });
      } else {
        navigation.navigate(Pages.GamePage, { condition: "RECON-JOIN" });
      }
      // console.log("GAME: ", ongoingGame);
    }
  }, [userStatus.userToken]);

  const navigateToPlay = () => navigation.navigate(Pages.Play);
  const navigateToDev = () => navigation.navigate(Pages.DEV);
  const navigateToProfile = () => navigation.navigate(Pages.Profile);

  return (
    <SafeAreaView style={style.container}>
      <Grid style={{ width: "100%", height: "100%" }}>
        <Row size={3} style={[style.section]}>
          <Logotype width="90%" height="100%" />
        </Row>
        <Row size={3} style={style.section}>
          <TicTacText
            title
            label="play"
            size="md"
            style={{ margin: 20 }}
            button={{ onClick: navigateToPlay }}
          />
          <TicTacText
            title
            style={{ margin: 20 }}
            label="profile"
            size="md"
            button={{ onClick: navigateToProfile }}
          />
        </Row>
        <Row size={2} style={[style.section, style.bottom]}></Row>
      </Grid>
    </SafeAreaView>
  );
};

const style: IStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#F220",
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  animate: {},
});

export default StartPage;
