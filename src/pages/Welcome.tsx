import React from 'react'
import { SafeAreaView, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import wateringImg from '../assets/watering.png'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { Feather } from '@expo/vector-icons'

export function Welcome() {
  const navigation = useNavigation()

  function handleStart() {
    navigation.navigate('UserIdentification')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'}
        suas plantas {'\n'}
        de forma fácil
      </Text>

      <Image 
        source={wateringImg} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. {'\n'}
        Nós cuidamos de lembrar você {'\n'} sempre que precisar.
      </Text>

      <Button text={'Próximo'} onPress={handleStart}>
        <Feather name="chevrons-right" style={styles.icon} />
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 30,
    fontFamily: fonts.heading,
    lineHeight: 34,
    textAlign: 'center',
    color: colors.heading,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.text,
    
    paddingHorizontal: 20,
    color: colors.heading
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  },
  icon: {
    fontSize: 18,
    marginLeft: 10,
    color: colors.white,
  }
})