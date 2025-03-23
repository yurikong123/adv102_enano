import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const QuizApp = () => {
  const [numQuestions, setNumQuestions] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const fetchQuestions = async () => {
    const amount = Math.max(10, Math.min(parseInt(numQuestions), 30)); // Ensure between 10-30
    const url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setQuestions(data.results);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setQuizCompleted(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    setSelectedAnswer(answer);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <View style={styles.container}>
      {!questions.length ? (
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Enter Number of Questions (10-30)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter number..."
            placeholderTextColor="#aaa"
            value={numQuestions}
            onChangeText={setNumQuestions}
          />
          <View style={styles.buttonContainer}>
            <Button title="Start Quiz" onPress={fetchQuestions} />
          </View>
        </View>
      ) : quizCompleted ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Quiz Completed!</Text>
          <Text style={styles.resultScore}>
            Your Score: {score} / {questions.length}
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Restart Quiz" onPress={() => setQuestions([])} />
          </View>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <Text style={styles.questionText}>
            {questions[currentQuestionIndex].question}
          </Text>
          <FlatList
            data={[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer].sort()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  selectedAnswer === item ? styles.selectedOption : null,
                ]}
                onPress={() => handleAnswer(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.buttonContainer}>
            <Button title="Next" onPress={nextQuestion} disabled={!selectedAnswer} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, backgroundColor: '#121212' },
  title: { fontSize: 22, color: 'white', marginBottom: 15, textAlign: 'center' },
  inputContainer: { alignItems: 'center', padding: 20, backgroundColor: '#1e1e1e', borderRadius: 10, width: '90%' },
  input: { borderBottomWidth: 1, width: '80%', textAlign: 'center', color: 'white', fontSize: 18, marginBottom: 15 },
  buttonContainer: { marginTop: 15, width: '80%' },
  quizContainer: { alignItems: 'center', padding: 25, backgroundColor: '#1e1e1e', borderRadius: 10, width: '90%' },
  questionText: { fontSize: 20, color: 'white', marginBottom: 20, textAlign: 'center' },
  option: { backgroundColor: '#333', padding: 15, marginVertical: 8, borderRadius: 8, width: '100%', alignItems: 'center' },
  selectedOption: { backgroundColor: '#4caf50' },
  optionText: { color: 'white', fontSize: 16 },
  resultContainer: { alignItems: 'center', padding: 25, backgroundColor: '#1e1e1e', borderRadius: 10, width: '90%' },
  resultText: { fontSize: 24, color: 'white', fontWeight: 'bold', marginBottom: 10 },
  resultScore: { fontSize: 20, color: 'lightgreen', marginVertical: 10 },
});

export default QuizApp;
