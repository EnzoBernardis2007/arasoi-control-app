import { StyleSheet, View, Text } from 'react-native'

export function Button({children, onPress}) {
    return (
        <View style={style.container} onTouchEnd={onPress}>
            <Text style={style.content}>{children}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#0b78e6',
        width: 75,
        height: 75,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        fontWeight: 'bold',
        color: '#fff'
    }
})