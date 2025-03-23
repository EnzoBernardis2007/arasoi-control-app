import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import { Context } from '../provider/Provider'

export default function Search({ navigation }) {
    const { setBracket } = useContext(Context)
    const [searchBarChampionship, setSearchBarChampionship] = useState("")
    const [searchBarBracket, setSearchBarBracket] = useState("")
    const [suggestedChampionship, setSuggestedChampionship] = useState(null)
    const [suggestedBrackets, setSuggestedBrackets] = useState(null)
    const [debounceTimeout, setDebounceTimeout] = useState(null)
    const [championshipId, setChampionshipId] = useState(null)
    const [selectedBracket, setSelectedBracket] = useState(null)

    const handleSearchBarChampionship = (value) => {
        setSearchBarChampionship(value)
    }

    const handleSearchBarBracket = (value) => {
        setSearchBarBracket(value)
    }

    useEffect(() => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout)
        }

        const timeout = setTimeout(() => {
            const searchChampionship = async () => {
                const response = await fetch('http://localhost:3000/getChampionships', {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' }
                })

                if(response.ok) {
                    const data = await response.json()
                    setSuggestedChampionship(data.championshipsList)
                    console.log(data)
                }
            }

            if (searchBarChampionship.trim() !== "") { 
                searchChampionship()
            } else {
                setSuggestedChampionship(null)
            }
        }, 500)

        setDebounceTimeout(timeout)

        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout)
            }
        }
    }, [searchBarChampionship])

    useEffect(() => {
        const getBrackets = async () => {
            if(!championshipId) return

            const response = await fetch(`http://localhost:3000/brackets/${championshipId}`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            })

            if(response.ok) {
                const data = await response.json()
                setSuggestedBrackets(data.brackets)
                console.log(data.brackets)
            }
        }

        getBrackets()
    }, [championshipId])

    const handleSelectChampionship = (id) => {
        setChampionshipId(id)
    }

    const handleSelectBracket = (value) => {
        setSelectedBracket(value)
        console.log(value)
    }
    
    const sortByMatch = (list, searchTerm, key) => {
        return list.sort((a, b) => {
            const aMatch = a[key].toLowerCase().startsWith(searchTerm.toLowerCase())
            const bMatch = b[key].toLowerCase().startsWith(searchTerm.toLowerCase())

            if (aMatch && !bMatch) return -1
            if (!aMatch && bMatch) return 1

            return 0
        })
    }

    const handleConfirm = () => {
        setBracket(selectedBracket)
        navigation.navigate("Control")
    }

    return (
        <View style={style.body}>
            <TextInput
                style={style.searchBar}
                value={searchBarChampionship}
                onChangeText={handleSearchBarChampionship}
                placeholder="Digite aqui..."
            />
            {suggestedChampionship ? (
                sortByMatch(suggestedChampionship.slice(0, 10), searchBarChampionship, "name")
                .map((championship) => (
                    <Text key={championship.id} onPress={() => handleSelectChampionship(championship.id)}>
                        {championship.name}
                    </Text>
                ))
            ) : (
                <Text>Digite algo...</Text>
            )}

            <TextInput
                style={style.searchBar}
                value={searchBarBracket}
                onChangeText={handleSearchBarBracket}
                placeholder="Digite aqui..."
            />
            {suggestedBrackets ? (
                sortByMatch(suggestedBrackets, searchBarBracket, "athlete_aka_name")
                .map((bracket) => (
                    <Text key={bracket.bracket_id} onPress={() => handleSelectBracket(bracket)}>{bracket.athlete_aka_name}</Text>
                ))
            ) : (
                <Text>Digite algo...</Text>
            )}

            <Button title='Escolher' onPress={handleConfirm}/>
        </View>
    )
}

const style = StyleSheet.create({
    body: {
        flex: 1,
        padding: 10
    },
    searchBar: {
        backgroundColor: '#e3e3e3',
        width: "100%",
        padding: 8,
        height: 36
    }
})
