import {
    RECEIVE_DECKS,
    ADD_DECK,
    ADD_DECK_CARD
} from '../actions/decks'

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_DECK_CARD:
            state[action.key] = {
                ...state[action.key],
                cards: state[action.key].cards.concat(action.card)
            }
            return {
                ...state
            }
        default:
            return state
    }
}
