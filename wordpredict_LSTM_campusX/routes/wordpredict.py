from flask import Blueprint, render_template
from flask import Blueprint, render_template, request, jsonify
import pickle
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

wordpredict_bp = Blueprint('wordpredit' , __name__)

# load model
model = load_model("model/next_word_model.h5")
with open("model/tokenizer.pkl" , 'rb') as f:
    tokenizer = pickle.load(f)

def next_predict(text):
    generated_words = []
    for _ in range(4):
        token_text = tokenizer.texts_to_sequences([text])[0]
        # padding
        padded_token_text = pad_sequences([token_text], maxlen=56 , padding='pre')
        pos = np.argmax(model.predict(padded_token_text,verbose=0))
        next_word = tokenizer.index_word.get(pos , '')
        if not next_word:
            break
        generated_words.append(next_word)
        text += ' ' + next_word
    
    return " ".join(generated_words)


@wordpredict_bp.route('/wordpredict')
def wordpredict():
    return render_template("wordpredict.html")

@wordpredict_bp.route('/predict_next_word', methods=['POST'])
def predict_next_word():
    input_text = request.json.get("text", "")
    predicted_sentence = next_predict(input_text)
    return jsonify({"prediction": predicted_sentence})


