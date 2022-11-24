import React, { useContext, useState } from 'react';
import {Linking, ScrollView, Text} from 'react-native';
import AuthHeader from '../../../components/AuthHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Separator from '../../../components/Separator';
import GoogleLogin from '../../../components/GoogleLogin';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

import { login } from '../../../utils/backendCalls';
import { UserContext } from '../../../../App';
import Header from "../../../components/Header";

const Signin = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [values, setValues] = useState({name: user});

  const onSignUp = () => {
    console.log('HELLO')
    navigation.navigate('Signup')
  }

  const onBack = () => {
    navigation.goBack()
  }

  const onChange = (key, value) => {
    setValues(v => ({ ...v, [key]: value }))
  }

  const onSubmit = async () => {
    //const token = await login(values);
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmVmZDJlYTk1N2Y4NTc4MWY1MzUyZWUiLCJpYXQiOjE2NTk5NjEwMDJ9.PpjCGM91s1G4y4tjclUXGRtUKdiEj19RYBLRybHO-3Q'
    //setUser({ token })
    navigation.navigate('Settings')
  }

  return (
  <SafeAreaView>
      <ScrollView style={styles.container}>
        {/*<AuthHeader title="Alusta uuesti" onBackPress={onBack}/>*/}
        {/*<Header showBack onBackPress={onBack} />*/}

        <Text style={styles.footerText}>
          {user}, kas soovid rääkida oma päevast?
        </Text>

        <Input value={values.goodIdeas} onChangeText={(v) => onChange('goodIdeas', v)} placeholder="Mis toob sulle rõõmu?" />
        <Input value={values.badIdeas} onChangeText={(v) => onChange('badIdeas', v)} placeholder="Mis pani sind muretsema?" />

        <Button onPress={onSubmit} style={styles.button} title="Sain kõik räägitud"  />

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

export default Signin;
