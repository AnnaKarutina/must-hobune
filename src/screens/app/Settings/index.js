import React, { useState, useContext } from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import ListItem from '../../../components/ListItem';
import EditableBox from '../../../components/EditableBox';
import Button from '../../../components/Button';
import {UserContext} from "../../../../App";

const Settings = ({ navigation }) => {
  const [editing, setEditing] = useState(false);
  const { user } = useContext(UserContext);
  const [values, setValues] = useState({name: user})
  console.log(values)

  const onEditPress = () => {
    setEditing(true);
  }

  const onSave = () => {
    setEditing(false);
  }

  const onChange = (key, value) => {
    setValues(v => ({...v, [key]: value}))
  }

  const onItemPress = () => {
    Linking.openURL('https://google.com');
  }

  const goBack = () => {
    navigation.goBack()
  }

  const onSubmit = async () => {
    //const token = await login(values);
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmVmZDJlYTk1N2Y4NTc4MWY1MzUyZWUiLCJpYXQiOjE2NTk5NjEwMDJ9.PpjCGM91s1G4y4tjclUXGRtUKdiEj19RYBLRybHO-3Q'
    //setUser({ token })
    navigation.navigate('Signup')
  }

  const onReset = async () => {
    //const token = await login(values);
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmVmZDJlYTk1N2Y4NTc4MWY1MzUyZWUiLCJpYXQiOjE2NTk5NjEwMDJ9.PpjCGM91s1G4y4tjclUXGRtUKdiEj19RYBLRybHO-3Q'
    //setUser({ token })
    navigation.navigate('Signin')
  }

  return (
    <SafeAreaView>
      {/*<Header showBack onBackPress={goBack} title="Settings" />*/}
      <ScrollView style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{user}, tore et rääkisid oma kogemusest</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Kas oled nüüd rahulikum?</Text>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            <Button onPress={onSubmit} style={styles.button} title="Jah"  />
          </View>
          <View style={styles.buttonStyle}>
            <Button onPress={onReset} style={styles.button} title="Ei"  />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}
export default React.memo(Settings);
