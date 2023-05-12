import React from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';

class FoodCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          calories: 0,
          totalFat: 0.0,
          saturatedFat: 0.0,
          transFat: 0.0,
          protein: 0.0,
          carbohydrate: 0.0
        };
    }

    render() {
        return (
            <div>
            <Card className="m-2 bg-success text-white">
                <CardHeader tag="h4">
                    {this.props.name}
                </CardHeader>
                <CardBody className="text-end">
                    Name - <input type="text" onChange={(event) => (this.setState({name: event.target.value}))}/><br></br>
                    Calories - <input type="number" onChange={(event) => (this.setState({calories: event.target.value}))}/><br></br>
                    Total Fat - <input type="number" onChange={(event) => (this.setState({totalFat: event.target.value}))}/><br></br>
                    Saturated Fat - <input type="number" onChange={(event) => (this.setState({saturatedFat: event.target.value}))}/><br></br>
                    Trans Fat - <input type="number" onChange={(event) => (this.setState({transFat: event.target.value}))}/><br></br>
                    Protein - <input type="number" onChange={(event) => (this.setState({protein: event.target.value}))}/><br></br>
                    Carbohydrate - <input type="number" onChange={(event) => (this.setState({carbohydrate: event.target.value}))}/><br></br>
                </CardBody>

                <Button color="primary" onClick={() => this.props.onClick(this.state.name, this.state.calories, this.state.totalFat, this.state.saturatedFat, this.state.transFat, this.state.protein, this.state.carbohydrate)}>
                    {this.props.buttonLabel}
                </Button>
            </Card>
            </div>
        );
    }
}

export default FoodCreator;