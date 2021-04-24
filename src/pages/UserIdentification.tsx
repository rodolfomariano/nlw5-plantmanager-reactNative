import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { BigButton } from '../components/BigButton'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function UserIdentification() {
  const [isFocused, setIsFocuser] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()

  const navigation = useNavigation()

  async function handleUserIdentification() {
    if (!name) {
      return Alert.alert('Por favor digite seu nome ✋')
    }

    try {
      await AsyncStorage.setItem('@plantmanager:user', name)
      navigation.navigate('Confirmation', {
        title: 'Ok, Tudo pronto!',
        subtitle: 'Agora vamos cuidar das sua plantas com muito cuidado',
        buttonTitle: 'Começar',
        icon: 'hug',
        nextScreen: 'PlantSelect',
      })
    } catch {
      Alert.alert('Erro ao salvar o nome')
    }
  }

  function handleInputBlur() {
    setIsFocuser(false)
    setIsFilled(!!name)
  }

  function handleInputFocus() {
    setIsFocuser(true)
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value)
    setName(value)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <Text style={styles.emoji}>
                { isFilled ? '😀' : '🤔' }
              </Text>
              <Text style={styles.title}>
                Como podemos {'\n'}
                chamar você?
              </Text>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
                placeholder="Digite seu nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />

              <View style={styles.contentButon} >
                <BigButton text="Continuar" onPress={handleUserIdentification} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 54
  },
  emoji: {
    fontSize: 44
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 20
    
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },
  contentButon: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 25
  }
})