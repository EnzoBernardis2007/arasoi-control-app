import StackNavigator from './navigation/StackNavigator.js'
import { Provider } from './provider/Provider.js'

export default function App() {
  return (
    <Provider>
      <StackNavigator />
    </Provider>
  )
}
