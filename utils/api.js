import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, setDummyData } from './_deck'

export function fetchDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
        return setDummyData(results)
    })
}

export function fetchDeck(key) {
    AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
        const data = JSON.parse(results)
        return data[key]
    })
}

export function createDeck({ key, entry }) {
    return AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({
            [key]: entry
        })
    )
}

export function removeDeck(key) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
        const data = JSON.parse(results)
        data[key] = undefined
        delete data[key]
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

export function createDeckCard({ key, card }) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
        const data = JSON.parse(results)
        var newData = data
        newData[key].cards.push(card)
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(newData))
    })
}
