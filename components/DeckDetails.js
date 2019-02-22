import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

class DeckDetails extends Component {
    constructor(props) {
        super(props)

        this.handleStartQuiz = this.handleStartQuiz.bind(this)
        this.handleAddCard = this.handleAddCard.bind(this)
    }

    static navigationOptions = {
        title: 'Deck Details'
    }

    handleStartQuiz() {
        const { key } = this.props.navigation.state.params
        const { navigate } = this.props.navigation

        navigate('Quiz', { key: key })
    }

    handleAddCard() {
        const { key } = this.props.navigation.state.params
        const { navigate } = this.props.navigation

        navigate('AddCard', { key: key })
    }

    render() {
        const { decks } = this.props
        const { key } = this.props.navigation.state.params

        return (
            <View style={styles.inputContainer}>
                <View style={styles.textContainer}>
                    <Text>Name: {decks[key].title}</Text>
                    <Text>Cards: {decks[key].cards.length}</Text>
                </View>
                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={this.handleStartQuiz}
                >
                    <Text style={styles.detailsButtonText}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={this.handleAddCard}
                >
                    <Text style={styles.detailsButtonText}>Add Card</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingTop: 20
    },
    textContainer: {
        paddingLeft: 40
    },
    detailsButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 20,
        marginTop: 40,
        marginLeft: 40,
        marginRight: 40
    },
    detailsButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    }
})

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckDetails)
