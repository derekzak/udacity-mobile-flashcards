import React, { Component } from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { generateUID } from '../utils/helpers'
import { createDeck } from '../utils/api'
import { addDeck } from '../actions/decks'

class AddDeck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            cards: []
        }
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleTitleChange(title) {
        this.setState({ title })
    }

    handleSubmit() {
        const key = generateUID()
        const entry = this.state
        const { navigate } = this.props.navigation

        this.props.dispatch(addDeck({ [key]: entry }))

        this.setState(() => ({ title: '' }))

        createDeck({ key, entry })

        navigate('DeckDetails', { key: key })
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Deck Title"
                    maxLength={30}
                    onBlur={Keyboard.dismiss}
                    value={this.state.title}
                    onChangeText={this.handleTitleChange}
                />
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.createButtonText}>Create Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingTop: 20
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    createButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 20,
        margin: 40
    },
    createButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    }
})

export default connect()(AddDeck)
