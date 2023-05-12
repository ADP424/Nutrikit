import React from 'react';
import './Nutrikit.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Progress, Card, CardHeader, CardSubtitle, CardBody } from 'reactstrap';
import Categories from './Categories.js';
import MenuItems from './MenuItems.js';
import SelectedItems from './SelectedItems.js';
import NutritionDisplayer from './NutritionDisplayer.js';
import FoodCreator from './FoodCreator.js';

class Nutrikit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: null,
      foodCategories: null,
      nutritionalFacts: null,
      
      dailyValue: new Map([]),
      calorieGoal: 2000,
      totalFatGoal: 0.0,
      saturatedFatGoal: 0.0,
      transFatGoal: 0.0,
      proteinGoal: 0.0,
      carbohydrateGoal: 0.0,
      currID: 0,

      selectedCategory: '',
      selectedCategoryFoods: [],
      selectedItemsList: [],

      selectedMenuItem: [],
      selectedFoodItem: [],
      selectedFoodItemIndex: -1,
    };
  }

  updateFoods = (apiResponse) => {
    this.setState({foods: apiResponse})
    let maxID = 0
    for(let [, value] of Object.entries(apiResponse)) {
      if(value[0] > maxID) {
        maxID = value[0]
      }
    }
    this.setState({currID: maxID})
  }

  updateFoodCategories = (apiResponse) => {
    this.setState({foodCategories: apiResponse})
  }

  updateNutritionalFacts = (foodCategories) => {
    if(this.state.foods === null || foodCategories === null) {
      return;
    }

    let nutritionalFacts = new Map([]);
    for(let [, value] of Object.entries(foodCategories)) {
      nutritionalFacts.set(value[0], [])
    }
    for(let [, value] of Object.entries(this.state.foods)) {
      if(value.includes(null)) {
        continue;
      }
      nutritionalFacts.get(value[2]).push(value)
    }
    this.setState({nutritionalFacts: nutritionalFacts})
  }

  updateDailyValue = (apiResponse) => {
    if(apiResponse === null) {
      this.setState({dailyValue: new Map([])})
    }
    else {
      let dailyValue = new Map([]);
      for(let [, value] of Object.entries(apiResponse)) {
        dailyValue.set(value[0], value[1])
      }
      this.setState({dailyValue: dailyValue})

      this.setState({totalFatGoal: dailyValue.get('Total Fat')})
      this.setState({saturatedFatGoal: dailyValue.get('Saturated Fat')})
      this.setState({transFatGoal: dailyValue.get('Trans Fat')})
      this.setState({proteinGoal: dailyValue.get('Protein')})
      this.setState({carbohydrateGoal: dailyValue.get('Carbohydrate')})
    }
  }

  fetchData = () => {
    fetch('http://localhost:5000/foods')
    .then(
        (response) => {
            if (response.status === 200) {
              return (response.json()) ;
            }
            else {
                console.log("HTTP error:" + response.status + ":" +  response.statusText);
                return ([ ["status ", response.status]]);
            }
        }
        )
    .then ((jsonOutput) => {
                this.updateFoods(jsonOutput);
            }
          )
    .catch((error) =>  {
                console.log(error);
                this.updateFoods(null);
            } )

    fetch('http://localhost:5000/foodcategories')
    .then(
        (response) => {
            if (response.status === 200) {
              return (response.json()) ;
            }
            else {
                console.log("HTTP error:" + response.status + ":" +  response.statusText);
                return ([ ["status ", response.status]]);
            }
        }
        )
    .then ((jsonOutput) => {
                this.updateFoodCategories(jsonOutput);
                this.updateNutritionalFacts(jsonOutput);
            }
          )
    .catch((error) => {
                console.log(error);
                this.updateFoodCategories(null);
                this.updateNutritionalFacts(null);
            } )

    fetch('http://localhost:5000/dailyvalues')
    .then(
        (response) => {
            if (response.status === 200) {
              return (response.json()) ;
            }
            else {
                console.log("HTTP error:" + response.status + ":" +  response.statusText);
                return ([ ["status ", response.status]]);
            }
        }
        )
    .then ((jsonOutput) => {
                this.updateDailyValue(jsonOutput);
            }
          )
    .catch((error) =>  {
                console.log(error);
                this.updateDailyValue(null);
            } )
  }

  componentDidMount() {
    this.fetchData();
  }

  populateMenuItemsOnChange = event => {
    this.fetchData()

    if(event.target.value === '') {
      this.setState({selectedCategory: ''})
      this.setState({selectedCategoryFoods: []});
      this.setState({selectedMenuItem: []});
      return;
    }

    this.setState({selectedCategory: event.target.value})
    this.setState({selectedCategoryFoods: this.state.nutritionalFacts.get(event.target.value)});
  }

  selectMenuItem = event => {
    if(event.target.value === '') {
      return;
    }

    let food = event.target.value.split(',')
    food[0] = parseInt(food[0])
    food[3] = parseInt(food[3])
    for(let i = 4; i < food.length; i++) {
      food[i] = parseFloat(food[i])
    }
    this.setState({selectedMenuItem: food});
  }

  selectSelectedItem = event => {
    if(event.target.value === '') {
      return;
    }

    let food = event.target.value.split(',')
    food[0] = parseInt(food[0])
    food[3] = parseInt(food[3])
    for(let i = 4; i < food.length; i++) {
      food[i] = parseFloat(food[i])
    }
    this.setState({selectedFoodItem: food});
    this.setState({selectedFoodItemIndex: event.target.index});
  }

  addMenuItemToSelectedItems = () => {
    if(this.state.selectedMenuItem.length === 0) {
      return;
    }

    let newSelectedItemsList = this.state.selectedItemsList.slice();
    newSelectedItemsList.push(this.state.selectedMenuItem);
    this.setState({selectedItemsList: newSelectedItemsList});
  }

  removeSelectedItem = () => {
    if(this.state.selectedFoodItem.length === 0 || this.state.selectedFoodItemIndex === -1) {
      return;
    }

    let newSelectedItemsList = this.state.selectedItemsList.slice();
    newSelectedItemsList.splice(this.state.selectedFoodItemIndex, 1);
    this.setState({selectedItemsList: newSelectedItemsList});

    this.setState({selectedFoodItem: []});
    this.setState({selectedFoodItemIndex: -1});
  }

  editMenuFoodValues = (name, calories, totalFat, saturatedFat, transFat, protein, carbohydrate) => {
    if(this.state.selectedCategory === '' || this.state.selectedMenuItem.length === 0) {
      return;
    }

    // check if the name was left blank
    if(name === '') {
      name = this.state.selectedMenuItem[1];
    }

    let formBody = {'Name': name, 'Category': this.state.selectedCategory, 'Calories': calories, 'Total Fat': totalFat, 
                    'Saturated Fat': saturatedFat, 'Trans Fat': transFat, 'Protein': protein, 'Carbohydrate': carbohydrate}

    const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formBody)
    };
    fetch('http://localhost:5000/food/' + this.state.selectedMenuItem[0], requestOptions)
        .then(response => response.json());

    let newCategoryFoods = this.state.selectedCategoryFoods;
    for(let i = 0; i < newCategoryFoods.length; i++) {
      if(newCategoryFoods[i][0] === this.state.selectedMenuItem[0]) {
        newCategoryFoods[i] = [newCategoryFoods[i][0], name, this.state.selectedCategory, 
                               parseInt(calories), parseFloat(totalFat), parseFloat(saturatedFat), 
                               parseFloat(transFat), parseFloat(protein), parseFloat(carbohydrate)];
        this.setState({selectedMenuItem: newCategoryFoods[i]});
        break;
      }
    }
    this.setState({selectedCategoryFoods: newCategoryFoods});
  }

  addMenuItem = (name, calories, totalFat, saturatedFat, transFat, protein, carbohydrate) => {
    if(this.state.selectedCategory === '') {
      return;
    }

    let formBody = {'Name': name, 'Category': this.state.selectedCategory, 'Calories': calories, 'Total Fat': totalFat, 
                    'Saturated Fat': saturatedFat, 'Trans Fat': transFat, 'Protein': protein, 'Carbohydrate': carbohydrate}

    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formBody)
    };
    fetch('http://localhost:5000/foods', requestOptions)
        .then(response => response.json());

    let newCategoryFoods = this.state.selectedCategoryFoods;
    this.setState({currID: this.state.currID + 1})
    newCategoryFoods.push([this.state.currID + 1, name, this.state.selectedCategory, 
                           calories, totalFat, saturatedFat, transFat, protein, carbohydrate])
    this.setState({selectedCategoryFoods: newCategoryFoods});
  }

  deleteMenuFood = (food) => {
    if(food.length === 0) {
      return;
    }

    fetch('http://localhost:5000/food/' + food[0], {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      }
    });

    for(let i = 0; i < this.state.selectedCategoryFoods.length; i++) {
      if(this.state.selectedCategoryFoods[i][0] === this.state.selectedMenuItem[0]) {
        if(this.state.selectedMenuItem[0] === this.state.currID) {
          this.setState({currID: this.state.currID - 1})
        }
        let newCategoryFoods = this.state.selectedCategoryFoods;
        newCategoryFoods.splice(i, 1);
        this.setState({selectedCategoryFoods: newCategoryFoods});
        break;
      }
    }
  }

  getTotalFoodValue = (foodValue) => {
    let sum = 0;

    if(foodValue === "Calories") {
      for(let i = 0; i < this.state.selectedItemsList.length; i++) {
        sum += this.state.selectedItemsList[i][3];
      }
    }
    else if(foodValue === "Total Fat") {
      for(let i = 0; i < this.state.selectedItemsList.length; i++) {
        sum += this.state.selectedItemsList[i][4];
      }
    }
    else if(foodValue === "Saturated Fat") {
      for(let i = 0; i < this.state.selectedItemsList.length; i++) {
        sum += this.state.selectedItemsList[i][5];
      }
    }
    else if(foodValue === "Trans Fat") {
      for(let i = 0; i < this.state.selectedItemsList.length; i++) {
        sum += this.state.selectedItemsList[i][6];
      }
    }
    else if(foodValue === "Protein") {
      for(let i = 0; i < this.state.selectedItemsList.length; i++) {
        sum += this.state.selectedItemsList[i][7];
      }
    }
    else if(foodValue === "Carbohydrate") {
      for(let i = 0; i < this.state.selectedItemsList.length; i++) {
        sum += this.state.selectedItemsList[i][8];
      }
    }
    return sum;
  }

  render() {
    if (this.state.foods === null || this.state.foodCategories === null || this.state.nutritionalFacts === null || this.state.dailyValue.size === 0)
      return (<div><p>No data returned from server</p></div>)
    else
    {
    return (
      <div className="Nutrikit">
        <Container>
          <h1>
          <b>NutriKit Food Planner</b>
          </h1>
          
          <h2>
            NutriKit allows you to select your groceries, and track your nutritional progress (good or bad)
          </h2>

          <Row sm={12} md={12} lg={12}>
            <Card className="m-2 bg-success text-white">
              <CardHeader tag="h4">
                Nutrition Goal Progress
              </CardHeader>
              <br></br>
              
              <CardSubtitle tag="h5">
                {'Calories (' + this.getTotalFoodValue('Calories') + ' / ' + this.state.calorieGoal + ')'}
              </CardSubtitle>
              <Progress multi sm={12} md={12} lg={12}>
                <Progress bar striped color="warning" value={this.getTotalFoodValue('Calories') * 100 / this.state.calorieGoal} />
                <Progress bar color="dark" value={(this.state.calorieGoal - this.getTotalFoodValue('Calories')) < 0 ? 0 : (this.state.calorieGoal - this.getTotalFoodValue('Calories')) * 100 / this.state.calorieGoal} />
              </Progress>
              <br></br>

              <CardSubtitle tag="h5">
                {'Total Fat (' + this.getTotalFoodValue('Total Fat') + ' / ' + this.state.totalFatGoal + ')'}
              </CardSubtitle>
              <Progress multi sm={12} md={12} lg={12}>
                <Progress bar striped color="warning" value={this.getTotalFoodValue('Total Fat') * 100 / this.state.totalFatGoal} />
                <Progress bar color="dark" value={(this.state.totalFatGoal - this.getTotalFoodValue('Total Fat')) < 0 ? 0 : (this.state.totalFatGoal - this.getTotalFoodValue('Total Fat')) * 100 / this.state.totalFatGoal} />
              </Progress>
              <br></br>

              <CardSubtitle tag="h5">
                {'Saturated Fat (' + this.getTotalFoodValue('Saturated Fat') + ' / ' + this.state.saturatedFatGoal + ')'}
              </CardSubtitle>
              <Progress multi sm={12} md={12} lg={12}>
                <Progress bar striped color="warning" value={this.getTotalFoodValue('Saturated Fat') * 100 / this.state.saturatedFatGoal} />
                <Progress bar color="dark" value={(this.state.saturatedFatGoal - this.getTotalFoodValue('Saturated Fat')) < 0 ? 0 : (this.state.saturatedFatGoal - this.getTotalFoodValue('Saturated Fat')) * 100 / this.state.saturatedFatGoal} />
              </Progress>
              <br></br>
              
              <CardSubtitle tag="h5">
                {'Trans Fat (' + this.getTotalFoodValue('Trans Fat') + ' / ' + this.state.transFatGoal + ')'}
              </CardSubtitle>
              <Progress multi sm={12} md={12} lg={12}>
                <Progress bar striped color="warning" value={this.getTotalFoodValue('Trans Fat') * 100 / this.state.transFatGoal} />
                <Progress bar color="dark" value={(this.state.transFatGoal - this.getTotalFoodValue('Trans Fat')) < 0 ? 0 : (this.state.transFatGoal - this.getTotalFoodValue('Trans Fat')) * 100 / this.state.transFatGoal} />
              </Progress>
              <br></br>

              <CardSubtitle tag="h5">
                {'Protein (' + this.getTotalFoodValue('Protein') + ' / ' + this.state.proteinGoal + ')'}
              </CardSubtitle>
              <Progress multi sm={12} md={12} lg={12}>
                <Progress bar striped color="warning" value={this.getTotalFoodValue('Protein') * 100 / this.state.proteinGoal} />
                <Progress bar color="dark" value={(this.state.proteinGoal - this.getTotalFoodValue('Protein')) < 0 ? 0 : (this.state.proteinGoal - this.getTotalFoodValue('Protein')) * 100 / this.state.proteinGoal} />
              </Progress>
              <br></br>

              <CardSubtitle tag="h5">
                {'Carbohydrate (' + this.getTotalFoodValue('Carbohydrate') + ' / ' + this.state.carbohydrateGoal + ')'}
              </CardSubtitle>
              <Progress multi sm={12} md={12} lg={12}>
                <Progress bar striped color="warning" value={this.getTotalFoodValue('Carbohydrate') * 100 / this.state.carbohydrateGoal} />
                <Progress bar color="dark" value={(this.state.carbohydrateGoal - this.getTotalFoodValue('Carbohydrate')) < 0 ? 0 : (this.state.carbohydrateGoal - this.getTotalFoodValue('Carbohydrate')) * 100 / this.state.carbohydrateGoal} />
              </Progress>
              <br></br>
            </Card>
          </Row>

          <Row>
            <Col sm={12} md={6} lg={4}>
              <Categories
                foodCategories={this.state.foodCategories}
                onChange={this.populateMenuItemsOnChange}
              />

              <MenuItems
                selectedCategoryFoods={this.state.selectedCategoryFoods}
                onClick={this.selectMenuItem}
              />

              <Button color="success" onClick={this.addMenuItemToSelectedItems}>
                {'Add'}
              </Button>

              <Button color="danger" onClick={() => this.deleteMenuFood(this.state.selectedMenuItem)}>
                {'Delete'}
              </Button>
              
              <NutritionDisplayer
                food={this.state.selectedMenuItem}
                dailyValue={this.state.dailyValue}
              />
            </Col>
            
            <Col sm={12} md={6} lg={4}>
              <SelectedItems
                selectedItemsList={this.state.selectedItemsList}
                onClick={this.selectSelectedItem}
              />

              <Button color="success" onClick={this.removeSelectedItem}>
                {'Remove'}
              </Button>

              <br></br>
              <Card className="m-2 bg-success text-white">
                <CardHeader tag="h4">
                    {'Goal Editor'}
                </CardHeader>
                <CardBody className="text-end">
                    Calorie Goal - <input type="number" onChange={(event) => (this.setState({calorieGoal: event.target.value}))}/><br></br>
                    Total Fat Goal - <input type="number" onChange={(event) => (this.setState({totalFatGoal: event.target.value}))}/><br></br>
                    Sat. Fat Goal - <input type="number" onChange={(event) => (this.setState({saturatedFatGoal: event.target.value}))}/><br></br>
                    Trans Fat Goal - <input type="number" onChange={(event) => (this.setState({transFatGoal: event.target.value}))}/><br></br>
                    Protein Goal - <input type="number" onChange={(event) => (this.setState({proteinGoal: event.target.value}))}/><br></br>
                    Carb. Goal - <input type="number" onChange={(event) => (this.setState({carbohydrateGoal: event.target.value}))}/><br></br>
                </CardBody>
              </Card>
            </Col>

            <Col sm={12} md={6} lg={4}>
              <br></br>
              <FoodCreator
                name={"Food Creator: " + this.state.selectedCategory}
                onClick={this.addMenuItem}
                buttonLabel={'Add'}
              />

              <br></br>
              <FoodCreator
                name={"Food Editor: " + (this.state.selectedMenuItem[1] ?? '')}
                onClick={this.editMenuFoodValues}
                buttonLabel={'Edit All Values'}
              />
            </Col>

          </Row>
        </Container>
      </div>
    );
    }
  }
}

export default Nutrikit;