import { StyleSheet, View } from "react-native";
import Navbar from "../components/Navbar";

export default Layout = ({navigation, children}) => {

  // wrap this component around screens like this:
  // <Layout> screen </Layout>

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
      {children}
      </View>
      <Navbar navigation={navigation}/>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  mainContent: {
    flex: 1
  }
});

