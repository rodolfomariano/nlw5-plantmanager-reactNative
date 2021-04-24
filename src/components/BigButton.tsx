import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonProps extends TouchableOpacityProps {
  text: string
}

export function BigButton({ text, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontFamily: fonts.heading
  },
})