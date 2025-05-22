from flask import Flask, jsonify

app = Flask(__name__)

# Przykładowy stan gry
state = {
    "turn": 1,
    "tribes": [
        {"id": 1, "name": "Czerwoni", "health": 100, "x": 2, "y": 3},
        {"id": 2, "name": "Zieloni", "health": 90, "x": 5, "y": 7}
    ]
}

@app.route("/")
def hello():
    return "Gra w życie - Render + Python!"

@app.route("/state")
def get_state():
    return jsonify(state)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)