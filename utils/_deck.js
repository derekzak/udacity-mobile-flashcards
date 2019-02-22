import { AsyncStorage } from 'react-native'
import { generateUID } from './helpers'

export const DECK_STORAGE_KEY = 'MobileFlashcards:deck'

export function setDummyData(results) {
    console.log("AsyncStorage: ", results)
    if (results === null) {
        let dummyData = {}
        const cards = [{ question: 'What are you thinking?', answer: 'The answer' }, { question: 'How many fingers do you have?', answer: 'Ten' }, { question: 'Are you going to complete this course?', answer: 'Yes' }]

        for (let i = 1; i < 4; i++) {
            const key = generateUID()
            const entry = {
                title: `Default${i}`,
                cards: [cards[i - 1]]
            }
            dummyData[key] = entry
        }

        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))

        return dummyData
    } else {
        return JSON.parse(results)
    }
}
