from flask import Flask, jsonify, request
import json

app = Flask(__name__)

@app.route('/api')
def get_data():
    with open('data.json', 'r') as file:
        data = json.load(file)

    return jsonify(data)

@app.route('/submittodoitem', methods=['POST'])
def submit_todo_item():

    item_name = request.form.get('itemName')
    item_description = request.form.get('itemDescription')

    # MongoDB insert logic would go here
    return "Todo Item Saved Successfully"

if __name__ == '__main__':
    app.run(debug=True)