import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { fetchDecks } from '../utils/api'
import { receiveDecks } from '../actions/decks'
import Deck from './Deck'

class ListDecks extends Component {
    state = {
        ready: false
    }

    componentDidMount() {
        const { dispatch } = this.props

        fetchDecks()
            .then(items => dispatch(receiveDecks(items)))
            .then(() => this.setState(() => ({ ready: true })))
    }

    render() {
        const { decks, navigation } = this.props
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <ScrollView contentContainerStyle={styles.inputContainer}>
                {Object.keys(decks).map(function (key) {
                    return (
                        <TouchableOpacity
                            key={key}
                            onPress={() =>
                                navigation.navigate('DeckDetails', { key: key })
                            }
                        >
                            <Deck key={key} deck={decks[key]} />
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingTop: 20
    }
})

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(ListDecks)
