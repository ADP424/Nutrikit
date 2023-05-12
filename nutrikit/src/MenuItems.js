import React from 'react';
import { Card, CardHeader } from 'reactstrap';

class MenuItems extends React.Component {
    renderOption = (food) => {
      return (
        <option key={food[0]} value={food}>{food[1]}</option>
      );
    }
  
    render() {
      return (
        <Card className="m-4 bg-success text-white">
          <div className="SelectedItemsCard">
            <CardHeader tag="h5">
              Menu Items
            </CardHeader>

            <select className="MenuItems" size="5" onClick={this.props.onClick}>
              {this.props.selectedCategoryFoods.map(food => (
                this.renderOption(food)
              ))}
            </select>
          </div>
          <br></br>
        </Card>
      );
    }
  }

  export default MenuItems;