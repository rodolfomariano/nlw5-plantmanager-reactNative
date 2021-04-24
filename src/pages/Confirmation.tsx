import { useNavigation, useRoute } from '@react-navigation/core'
// import { useRoute } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, Text, View, StyleSheet } from 'react-native'
import { BigButton } from '../components/BigButton'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
  title:  string
  subtitle: string
  buttonTitle: string
  icon: 'smile' | 'hug'
  nextScreen: string
}

const emojis = {
  hug: '👏',
  smile: '😀'
}

export function Confirmation() {
  const navigation = useNavigation()
  const routes = useRoute()

  const { title, subtitle, buttonTitle, icon, nextScreen } = routes.params as Params

  function handleSelectPlant() {
    navigation.navigate(nextScreen)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>

        <View style={styles.buttonContainer}>
          <BigButton text={buttonTitle} onPress={handleSelectPlant} />
        </View>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 20,
    color: colors.heading
  },
  emoji: {
    fontSize: 64,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 40
  }
})