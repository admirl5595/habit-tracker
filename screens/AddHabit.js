import React from "react";

import { View, Text } from "react-native";

import Layout from './Layout'

const AddHabit = ({navigation}) => {
  return (
      <Layout navigation={navigation}>
      <Text>Add habit</Text>
      </Layout>
  );
};

export default AddHabit;
