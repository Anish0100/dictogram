from flask import Flask, jsonify, render_template, request
import json
import random
import time

app = Flask(__name__)

# Load the word list from the JSON file
with open('words.json', 'r') as f:
    word_list = json.load(f)['words']

# Shuffle the word list so that the questions are in a random order
random.shuffle(word_list)

# Keep track of the current question index
current_question_index = 0

# Keep track of the user's score
score = 0

# Define a function to get the current question
def get_current_question():
    return word_list[current_question_index]

# Define a function to check the user's answer
def check_answer(answer):
    global score
    if answer == get_current_question()['answer']:
        score += 1

# Define a function to reset the game
def reset_game():
    global current_question_index, score
    current_question_index = 0
    score = 0
    random.shuffle(word_list)

# Define a function to get the next question
def get_next_question():
    global current_question_index
    current_question_index += 1

# Define a function to handle the quiz page
@app.route('/', methods=['GET', 'POST'])
def quiz():
    global score
    # Handle the case where the user quits the game
    if request.method == 'POST' and request.form.get('quit'):
        reset_game()
        return render_template('quiz.html', quit=True)
    # Handle the case where the user submits an answer
    elif request.method == 'POST' and request.form.get('answer'):
        check_answer(request.form['answer'])
        # If there are no more questions, show the final score
        if current_question_index == len(word_list):
            final_score = score / len(word_list) * 100
            reset_game()
            return render_template('quiz.html', final_score=final_score)
        # Otherwise, show the next question
        else:
            get_next_question()
    # Handle the initial case where the user loads the page
    else:
        # Show the game rules
        return render_template('quiz.html', rules=True)

    # Show the current question
    question = get_current_question()
    # Shuffle the answer options so that they are in a random order
    random.shuffle(question['options'])
    return render_template('quiz.html', question=question, score=score)

if __name__ == '__main__':
    app.run(debug=True)
