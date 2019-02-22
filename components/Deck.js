import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
    render() {
        const { key, deck } = this.props

        return (
            <View style={styles.inputContainer}>
                <View style={styles.deckInfo}>
                    <Image style={styles.deckImage} source={require('../assets/images/deck.jpeg')} />
                    <View style={styles.deckText}>
                        <Text style={styles.textItem}>Name: {deck.title}</Text>
                        <Text style={styles.textItem}>Cards: {deck.cards.length}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        padding: 20,
        borderWidth: 1
    },
    deckImage: {
        borderWidth: 1,
        width: 80,
        height: 80
    },
    deckInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    deckText: {
        flexDirection: 'column',
        paddingLeft: 20
    },
    textItem: {
        padding: 5,
        fontWeight: 'bold'
    }
})

export default connect()(Deck)
