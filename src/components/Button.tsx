import React, { ReactNode } from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import colors from '../styles/colors'

interface ButtonProps extends TouchableOpacityProps {
  text: string
  children?: ReactNode
}

export function Button({ text, children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={styles.buttonText}>
        {text}
      </Text>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal:30,
    paddingVertical: 10
  },
  buttonText: {
    fontSize: 14,
    color: 'white'
  },
})