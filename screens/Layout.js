import { StyleSheet, View } from "react-native";
import Navbar from "../components/Navbar";
import { StatusBar } from "expo-status-bar";

export default Layout = ({ navigation, children }) => {
  // wrap this component around screens like this:
  // <Layout> screen </Layout>

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.mainContent}>{children}</View>
      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
});
