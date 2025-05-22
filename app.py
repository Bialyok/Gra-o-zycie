from flask import Flask, jsonify
import random

app = Flask(__name__)

# Przykładowy stan gry (możesz rozbudować według własnych pomysłów)
state = {
    "turn": 1,
    "tribes": [
        {"id": 1, "name": "Czerwoni", "health": 100, "x": 2, "y": 3},
        {"id": 2, "name": "Zieloni", "health": 90, "x": 5, "y": 7}
    ],
    "events": []
}

@app.route("/")
def hello():
    return "Gra w życie - Render + Python!"

@app.route("/state")
def get_state():
    # Prosta symulacja: co wywołanie, zmienia się stan gry
    state["turn"] += 1
    for tribe in state["tribes"]:
        tribe["x"] += random.choice([-1, 0, 1])
        tribe["y"] += random.choice([-1, 0, 1])
        tribe["health"] += random.choice([-5, 0, 5])
    # Dodaj losowe wydarzenie
    state["events"].append({
        "turn": state["turn"],
        "desc": random.choice(["deszcz", "pożar", "znaleziono jedzenie", "atak innego plemienia"])
    })
    if len(state["events"]) > 10:
        state["events"] = state["events"][-10:]
    return jsonify(state)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
