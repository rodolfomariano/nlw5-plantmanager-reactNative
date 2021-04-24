import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentButtonProps extends RectButtonProps {
  title: string
  active?: boolean
}

export function EnviromentButton({ title, active = false, ...rest }: EnviromentButtonProps) {
  return (
    <RectButton
      style={[
        styles.container,
        active && styles.containerActive
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.title,
          active && styles.titleActive
        ]}
      >
        {title}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 76,
    height: 40,
    backgroundColor: colors.shape,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 10
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  titleActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  }
})