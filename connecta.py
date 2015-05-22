import os
from werkzeug.utils import secure_filename, redirect

__author__ = 'Mulish'

localServer = "http://localhost:5000/"

from flask import Flask, render_template, request, jsonify, url_for, send_from_directory
from flask.ext.cors import CORS, cross_origin



app = Flask('__main__')

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

client = {"type": "cliente", "lat": 123213123, "leng": 234234234}
taxi = {"type": "taxi", "lat": 123213123, "leng": 23423423432}


@app.route("/")
@cross_origin()
def index():
    taxi_cliente = [client, taxi]
    return jsonify(results=taxi_cliente)


@app.route("/update_cordenadas", methods=['POST', 'GET'])
@cross_origin()
def update_cordenadas():
    if request.method == 'GET':
        tipo_usuario = request.args.get('tipo_cliente')
        latitude = request.args.get('latitude')
        longitude = request.args.get('longitude')

        if tipo_usuario and latitude and longitude:
            if tipo_usuario == "cliente":
                client["lat"] = latitude
                client["leng"] = longitude
            else:
                taxi["lat"] = latitude
                taxi["leng"] = longitude
            return jsonify({"message": "Coordenadas actualizados"})
        else:
            return jsonify({"message": "Parametros Insuficientes"})
    else:
        return "pagina"


if __name__ == '__main__':
    app.debug = False
    app.run(host='0.0.0.0')