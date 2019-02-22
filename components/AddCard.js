import React, { Component } from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { createDeckCard } from '../utils/api'
import { addDeckCard } from '../actions/decks'

class AddCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: '',
            answer: ''
        }
        this.handleQuestionChange = this.handleQuestionChange.bind(this)
        this.handleAnswerChange = this.handleAnswerChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    static navigationOptions = {
        title: 'Add Card'
    }

    handleQuestionChange(question) {
        this.setState({ question })
    }

    handleAnswerChange(answer) {
        this.setState({ answer })
    }

    handleSubmit() {
        const { key } = this.props.navigation.state.params
        const entry = this.state

        this.props.dispatch(addDeckCard(key, entry))

        this.setState(() => ({
            question: '',
            answer: ''
        }))

        createDeckCard({ key, entry })
    }

    render() {
        const { question, answer } = this.state

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Card Question"
                    maxLength={30}
                    onBlur={Keyboard.dismiss}
                    value={question}
                    onChangeText={this.handleQuestionChange}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Card Answer"
                    maxLength={30}
                    onBlur={Keyboard.dismiss}
                    value={answer}
                    onChangeText={this.handleAnswerChange}
                />
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.createButtonText}>Create Card</Text>
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

export default connect()(AddCard)
