import React, { useEffect, useState } from 'react'
import { FlatList, PlatformColor, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { EnviromentButton } from '../components/EnviromentButton'
import { Header } from '../components/Header'
import { Load } from '../components/Load'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { PlantProps } from '../libs/storage'

import api from '../services/api'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnvironmentProps {
  key: string
  title: string
}


export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([])
  const [plantsList, setPlantsList] = useState<PlantProps[]>([])
  const [filteredPlant, setFilteredPlant] = useState<PlantProps[]>([])
  const [environmentSelected, setEnvironmentSelected] = useState('all')
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [loadingMorePage, setLoadingMorePage] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get('plants_environments?_sort=title&_order=asc')

      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ])
    }

    fetchEnvironment()

  }, [])

  useEffect(() => {
    
    fetchPlants()

  }, [])

  async function fetchPlants() {
    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

    !data && setLoadingMorePage(true)

    if (page > 1 ) {
      setPlantsList(oldValue => [...oldValue, ...data])
      setFilteredPlant(oldValue => [...oldValue, ...data])
    } else {
      setPlantsList(data)
      setFilteredPlant(data)
    }

    setLoading(false)
    setLoadingMorePage(false)
  }

  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment)

    if (environment == 'all') 
      return setFilteredPlant(plantsList)

    const filtered = plantsList.filter(plant => plant.environments.includes(environment))
    setFilteredPlant(filtered)
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return
    }

    setLoadingMorePage(true)
    setPage(oldValue => oldValue + 1)
    fetchPlants()
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate('PlantSave', { plant })
  }

  if (loading) return <Load />

  return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Header />

          <Text style={styles.title}>
            Em qual ambiente
          </Text>
          <Text style={styles.subtitle}>
            você quer colocar sua planta?
          </Text>
        </View>

        <View>
          <FlatList 
            data={environments}
            keyExtractor={(item) => String(item.key)}
            renderItem={({ item }) => (
              <EnviromentButton
                title={item.title}
                active={item.key === environmentSelected}
                onPress={() => handleEnvironmentSelected(item.key)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.environmentList}
          />
        </View>

        <View style={styles.plantsListStyle}>
          <FlatList 
            data={filteredPlant }
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardPrimary data={item} onPress={() => handlePlantSelect(item)} />
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) => 
              handleFetchMore(distanceFromEnd)
            }
            ListFooterComponent={
              loadingMorePage ? <ActivityIndicator color={colors.green} /> : <></>
              
            }
          />
          
        </View>

      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    paddingRight: 32,
    marginVertical: 32
  },
  plantsListStyle: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 10,
    justifyContent: 'center'
  }
})