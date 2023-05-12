from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .swen_344_db_utils import *

class Foods(Resource):
    def get(self):
       result = exec_get_all("SELECT * FROM Food")
       return result

    def post(self):
        name = request.json.get('Name')
        category = request.json.get('Category')
        calories = request.json.get('Calories')
        totalFat = request.json.get('Total Fat')
        saturatedFat = request.json.get('Saturated Fat')
        transFat = request.json.get('Trans Fat')
        protein = request.json.get('Protein')
        carbohydrate = request.json.get('Carbohydrate')
        exec_commit('INSERT INTO Food (name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate) \
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                    (name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate))

class Food(Resource):
    def put(self, id):
        name = request.json.get('Name')
        calories = request.json.get('Calories')
        totalFat = request.json.get('Total Fat')
        saturatedFat = request.json.get('Saturated Fat')
        transFat = request.json.get('Trans Fat')
        protein = request.json.get('Protein')
        carbohydrate = request.json.get('Carbohydrate')
        exec_commit('UPDATE Food \
                        SET name=%s, calories=%s, totalFat=%s, saturatedFat=%s, transFat=%s, protein=%s, carbohydrate=%s \
                        WHERE id=%s',
                    (name, calories, totalFat, saturatedFat, transFat, protein, carbohydrate, id))

    def delete(self, id):
        exec_commit('DELETE FROM Food \
                    WHERE id=%s',
                    (id,))

class FoodCategories(Resource):
    def get(self):
       result = exec_get_all("SELECT * FROM FoodCategories")
       return result

class DailyValues(Resource):
    def get(self):
       result = exec_get_all("SELECT * FROM DailyValues")
       return result