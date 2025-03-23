import { View, Text } from 'react-native'
import { Button } from '../components/Button'
import { Context } from '../provider/Provider'
import { useContext, useEffect } from 'react'

export default function Control() {
    const { bracket } = useContext(Context)

    useEffect(() => {
        console.log(bracket)
    }, [])

    return(
        <View>
            <Button>Texto</Button>
        </View>
    )
}