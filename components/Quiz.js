import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentCard: 0,
            showAnswer: false,
            correctAnswers: 0
        }
        this.handleShowAnswer = this.handleShowAnswer.bind(this)
        this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this)
        this.handleIncorrectAnswer = this.handleIncorrectAnswer.bind(this)
        this.handleRestartQuiz = this.handleRestartQuiz.bind(this)
        this.handleBackToDeck = this.handleBackToDeck.bind(this)
    }

    static navigationOptions = {
        title: 'Quiz'
    }

    handleShowAnswer() {
        this.setState({ showAnswer: true })
    }

    handleCorrectAnswer() {
        this.setState({
            currentCard: this.state.currentCard + 1,
            showAnswer: false,
            correctAnswers: this.state.correctAnswers + 1
        })
    }

    handleIncorrectAnswer() {
        this.setState({
            currentCard: this.state.currentCard + 1,
            showAnswer: false
        })
    }

    handleRestartQuiz() {
        clearLocalNotifications().then(setLocalNotification)

        this.setState({
            currentCard: 0,
            showAnswer: false,
            correctAnswers: 0
        })
    }

    handleBackToDeck() {
        clearLocalNotifications().then(setLocalNotification)

        this.props.navigation.goBack()
    }

    render() {
        const { decks } = this.props
        const { key } = this.props.navigation.state.params
        const { currentCard, showAnswer, correctAnswers } = this.state

        if (decks[key].cards.length === 0) {
            return (
                <View style={styles.inputContainer}>
                    <View style={styles.textContainer}>
                        <Text>There are no cards for this deck, you have to add at least one card to start a quiz.</Text>
                    </View>
                </View>
            )
        } else if (decks[key].cards.length === currentCard) {
            return (
                <View style={styles.inputContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardHeaderText}>Quiz Results</Text>
                        <Text style={styles.cardText}>{correctAnswers} out of {decks[key].cards.length} correct</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.quizButton}
                        onPress={this.handleRestartQuiz}
                    >
                        <Text style={styles.quizButtonText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.quizButton}
                        onPress={this.handleBackToDeck}
                    >
                        <Text style={styles.quizButtonText}>Back To Deck</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {

            return (
                <View style={styles.inputContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardsRemainingText}>Cards remaining: {decks[key].cards.length - (currentCard)}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardHeaderText}>Question {currentCard + 1}</Text>
                        <Text style={styles.cardText}>{decks[key].cards[currentCard].question}</Text>
                    </View>
                    {!showAnswer &&
                        <TouchableOpacity
                            style={styles.quizButton}
                            onPress={this.handleShowAnswer}
                        >
                            <Text style={styles.quizButtonText}>Show Answer</Text>
                        </TouchableOpacity>
                    }
                    {showAnswer &&
                        <View style={styles.textContainer}>
                            <Text style={styles.cardHeaderText}>Answer</Text>
                            <Text style={styles.cardText}>{decks[key].cards[currentCard].answer}</Text>
                            <View style={styles.answerContainer}>
                                <TouchableOpacity
                                    style={styles.correctButton}
                                    onPress={this.handleCorrectAnswer}
                                >
                                    <Text style={styles.quizButtonText}>Correct</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.incorrectButton}
                                    onPress={this.handleIncorrectAnswer}
                                >
                                    <Text style={styles.quizButtonText}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingTop: 20,
        marginBottom: 20
    },
    textContainer: {
        paddingLeft: 40,
        paddingRight: 40
    },
    cardsRemainingText: {
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'right'
    },
    cardHeaderText: {
        fontWeight: 'bold',
        fontSize: 30
    },
    cardText: {
        fontSize: 20
    },
    quizButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 20,
        marginTop: 40,
        marginLeft: 40,
        marginRight: 40
    },
    answerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 20
    },
    correctButton: {
        borderWidth: 1,
        borderColor: '#27AE60',
        backgroundColor: '#27AE60',
        padding: 10,
        width: 120
    },
    incorrectButton: {
        borderWidth: 1,
        borderColor: '#C0392B',
        backgroundColor: '#C0392B',
        padding: 10,
        width: 120,
        marginLeft: 50
    },
    quizButtonText: {
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

export default connect(mapStateToProps)(Quiz)
