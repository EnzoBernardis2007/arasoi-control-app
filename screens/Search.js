import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default function Search() {
    const [searchBar, setSearchBar] = useState("")
    const [suggestedChampionship, setSuggestedChampionship] = useState(null)
    const [debounceTimeout, setDebounceTimeout] = useState(null)

    const handleSearchBar = (value) => {
        setSearchBar(value)
    }

    useEffect(() => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeout = setTimeout(() => {
            const searchChampionship = async () => {
                const response = await fetch('http://localhost:3000/getChampionships', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    }
                })

                if(response.ok) {
                    const data = await response.json()
                    setSuggestedChampionship(data.championshipsList)
                    console.log(data)
                }
            }

            if (searchBar.trim() !== "") { 
                searchChampionship()
            } else {
                setSuggestedChampionship(null)
            }
        }, 500)

        setDebounceTimeout(timeout);

        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
        }
    }, [searchBar])

    const sortChampionshipsByMatch = (championships) => {
        return championships.sort((a, b) => {
            const aMatch = a.name.toLowerCase().startsWith(searchBar.toLowerCase());
            const bMatch = b.name.toLowerCase().startsWith(searchBar.toLowerCase());

            if (aMatch && !bMatch) return -1;
            if (!aMatch && bMatch) return 1;

            return 0;
        });
    }

    return (
        <View style={style.body}>
            <TextInput style={style.searchBar}
            value={searchBar}
            onChangeText={handleSearchBar}
            placeholder="Digite aqui..."
            />
            { suggestedChampionship ? 
                sortChampionshipsByMatch(suggestedChampionship.slice(0, 10))
                .map((championship) => (
                    <Text key={championship.id}>{championship.name}</Text>
                )) : <Text>Digite algo...</Text>
            }
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