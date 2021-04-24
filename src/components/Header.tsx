import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import userImg from '../assets/waterdrop.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header() {
  const [userName, setUserName] = useState<string>()

  useEffect(() => {
    async function loadStorageUserName() {
      const userName = await AsyncStorage.getItem('@plantmanager:user')
      setUserName(userName || '')
    }

    loadStorageUserName()

  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <Image source={userImg} style={styles.userImage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 26,
    color: colors.heading,
    fontFamily: fonts.text
  },
  userName: {
    fontSize: 28,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },
  userImage: {
    width: 56,
    height: 56,
    borderRadius: 40,
  }
})