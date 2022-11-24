import React, { useContext, useState } from 'react';
import { Text, View, ScrollView, Linking } from 'react-native';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../../../../App';
import AuthHeader from "../../../components/AuthHeader";

const Signup = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState({});
  const { setUser } = useContext(UserContext);
  console.log(values)

  const onChange = (key, value) => {
    setValues(v => ({...v, [key]: value}))
  }

  const onSubmit = () => {
    let userName = "Sõber"
    if(!checked){
      userName = values.fullName
    }
    setUser(userName)
    navigation.navigate('Home')
  }



  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>

        <Text style={styles.footerText}>
          Soovid sisestada oma nimi alusramiseks?
        </Text>

        <Input value={values.fullName} onChangeText={(v) => onChange('fullName', v)} placeholder="Mis Su nimi on?" />

        <View style={styles.agreeRow}>
          <Checkbox checked={checked} onCheck={setChecked} />
          <Text style={styles.agreeText}>Ma ei soovi nime kasitamist </Text>
        </View>

        <Button onPress={onSubmit} style={styles.button} title="Edasi"  />

        <Text style={styles.footerText}>
          Soovid kohe pöörduda tugiteenuste poole?
          <Text style={styles.footerLink} onPress={() => {
            Linking.openURL("https://peaasi.ee");
          }}> peaasi.ee</Text>
        </Text>

      </ScrollView>
    </SafeAreaView>
  )
}

export default React.memo(Signup);
