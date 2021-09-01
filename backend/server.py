from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open("./repos.json") as f:
    data = json.load(f)

@app.route('/repos', methods=['GET'])  
def get_modules():
  repos = data
  output = [] 
  for module in repos:
    output.append(module)
  return jsonify({'repos':output}) 

@app.route('/repos/<string:name>', methods=['GET'])
def get_module_data(name):
  repos = data
  output = {} 
  filter_data = {}
  for key in repos[name]:
    if(type(repos[name][key]) is dict):
      sub_dict = {}
      for key2 in repos[name][key]:
        sub_dict[key2.replace('_',' ')] = repos[name][key][key2]
      filter_data[key.replace('_',' ')] = sub_dict
    else:
      filter_data[key.replace('_',' ')]= repos[name][key]
  output[name] = filter_data
  return output

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)

