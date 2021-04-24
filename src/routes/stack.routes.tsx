import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Welcome } from '../pages/Welcome'
import { UserIdentification } from '../pages/UserIdentification'
import { Confirmation } from '../pages/Confirmation'
// import { PlantSelect } from '../pages/PlantSelect'
import { MyPlants } from '../pages/MyPlants'

import colors from '../styles/colors'
import { PlantSave } from '../pages/PlantSave'
import AuthRoutes from './tab.routes'

const stackRouters = createStackNavigator()

const AppRouter: React.FC = () => (
  <stackRouters.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >
    <stackRouters.Screen 
      name="Welcome"
      component={Welcome}
    />

    <stackRouters.Screen 
      name="UserIdentification"
      component={UserIdentification}
    />

    <stackRouters.Screen 
      name="Confirmation"
      component={Confirmation}
    />

    <stackRouters.Screen 
      name="PlantSelect"
      component={AuthRoutes}
    />

    <stackRouters.Screen 
      name="PlantSave"
      component={PlantSave}
    />

    <stackRouters.Screen 
      name="MyPlants"
      component={AuthRoutes}
    />
  </stackRouters.Navigator>
)

export default AppRouter