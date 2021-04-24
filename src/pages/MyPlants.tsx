import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Text, FlatList, Alert } from 'react-native'

import waterdrop from '../assets/waterdrop.png'

import { Header } from '../components/Header'
import { Load } from '../components/Load'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { loadPlant, PlantProps, removerPlant } from '../libs/storage'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>()
  const [loading, setLoading] = useState(true)
  const [nextWaterd, setNextWaterd] = useState<string>()

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant()

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      )

      setNextWaterd(
        `Não esqueça de regar a ${plantsStoraged[0].name} as ${nextTime} horas.`
      )

      setMyPlants(plantsStoraged)
      setLoading(false)
    }

    loadStorageData()

  }, [])

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😢',
        onPress: async () => {
          try {
            await removerPlant(plant.id)

            setMyPlants(oldData => oldData?.filter(item => item.id !== plant.id) )

          } catch (error) {
            Alert.alert('Não foi possivel remover!')
          }
        }
      }

    ])
  }

  if (loading) return <Load />

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />

        <Text style={styles.spotlightText}>
          {nextWaterd}
        </Text>
      </View>

      <View style={styles.myPlantsList}>
        <Text style={styles.plantsTitle}>
          Próximas regadas {myPlants?.length}
        </Text>

        <FlatList 
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary 
              data={item}
              handleRemove={() => (handleRemove(item))}
            />
          )}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ flex: 1}}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    marginLeft: 20,
    
  },
  myPlantsList: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginVertical: 20
  }
})