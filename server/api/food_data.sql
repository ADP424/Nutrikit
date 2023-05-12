DROP table if EXISTS Food CASCADE;
DROP table if EXISTS FoodCategories CASCADE;
DROP table if EXISTS DailyValues CASCADE;

CREATE TABLE FoodCategories (
        category VARCHAR(32) PRIMARY KEY
);

CREATE TABLE Food (
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(32),
        category VARCHAR(32),
        calories int,
        totalFat float,
        saturatedFat float,
        transFat float,
        protein float,
        carbohydrate float,
        FOREIGN KEY (category) REFERENCES FoodCategories(category)
);

CREATE TABLE DailyValues (
        category VARCHAR(32),
        maxValue int
);


        
INSERT INTO FoodCategories
        VALUES ('Proteins');

INSERT INTO FoodCategories
        VALUES ('Fruits');

INSERT INTO FoodCategories
        VALUES ('Vegetables');

INSERT INTO FoodCategories
        VALUES ('Dairy');

INSERT INTO FoodCategories
        VALUES ('Grains');



INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Steak', 'Proteins', 300, 5.73, 2.183, 0.182, 29.44, 0.0);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Ground Beef', 'Proteins', 200, 13.1, 5.3, 0.6, 15.18, 0.0);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Chicken', 'Proteins', 100, 9.3, 2.5, 0.1, 27.14, 0.0);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Fish', 'Proteins', 80, 6.34, 1.0, 0.0, 19.84, 0.0);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Soy', 'Proteins', 50, 19.94, 2.884, 0.0, 36.49, 30.16);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Orange', 'Fruits', 300, 0.12, 0.0, 0.0, 0.94, 11.75);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Banana', 'Fruits', 200, 0.33, 0.0, 0.0, 1.09, 22.84);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Pineapple', 'Fruits', 100, 0.12, 0.0, 0.0, 0.54, 13.12);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Grapes', 'Fruits', 80, 0.16, 0.0, 0.0, 0.72, 18.1);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Blueberries', 'Fruits', 50, 0.33, 0.0, 0.0, 0.74, 14.49);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Romaine', 'Vegetables', 30, 0.3, 0.0, 0.0, 1.2, 3.3);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Green Beans', 'Vegetables', 40, 0.22, 0.0, 0.0, 1.83, 6.97);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Squash', 'Vegetables', 100, 0.2, 0.0, 0.0, 1.2, 3.4);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Spinach', 'Vegetables', 50, 0.4, 0.0, 0.0, 2.9, 3.6);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Kale', 'Vegetables', 10, 0.9, 0.0, 0.0, 4.3, 8.8);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Milk', 'Dairy', 300, 3.9, 2.4, 0.0, 3.2, 4.8);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Yoghurt', 'Dairy', 200, 5.0, 0.0, 0.0, 9.0, 3.98);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Cheddar Cheese', 'Dairy', 200, 9.0, 6.0, 0.0, 7.0, 0.0);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Skim Milk', 'Dairy', 100, 0.2, 0.1, 0.0, 8.3, 12.5);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Cottage Cheese', 'Dairy', 80, 4.3, 0.0, 0.0, 11.12, 3.38);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Bread', 'Grains', 200, 1.1, 0.0, 0.0, 4.0, 13.8);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Bagel', 'Grains', 300, 1.7, 0.1, 0.0, 13.8, 68.0);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Pita', 'Grains', 250, 1.7, 0.3, 0.0, 6.3, 35.2);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Naan', 'Grains', 210, 3.3, 0.1, 0.0, 2.7, 16.9);

INSERT INTO Food(name, category, calories, totalFat, saturatedFat, transFat, protein, carbohydrate)	
        VALUES ('Tortilla', 'Grains', 120, 0.5, 0.1, 0.0, 1.1, 8.5);



INSERT INTO DailyValues
        VALUES ('Total Fat', 78);

INSERT INTO DailyValues
        VALUES ('Saturated Fat', 20);

INSERT INTO DailyValues
        VALUES ('Trans Fat', 2);

INSERT INTO DailyValues
        VALUES ('Protein', 50);

INSERT INTO DailyValues
        VALUES ('Carbohydrate', 275);