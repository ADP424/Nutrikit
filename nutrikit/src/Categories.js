import React from 'react';
import { Card, CardHeader } from 'reactstrap';

class Categories extends React.Component {
    renderOption = (category) => {
      return (
        <option key={category} value={category}>{category}</option>
      );
    }
  
    render() {
      return (
        <Card className="m-4 bg-success text-white">
          <div className="SelectedItemsCard">
            <CardHeader tag="h5">
              Categories
            </CardHeader>

            <select className="Categories" size="1" onChange={this.props.onChange}>
              {this.renderOption('')}
              {this.props.foodCategories.map(foodType => (
                this.renderOption(foodType)
              ))}
            </select>
          </div>
          <br></br>
        </Card>
      );
    }
  }

  export default Categories;