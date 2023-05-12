import React from 'react';
import { Card, CardHeader } from 'reactstrap';

class SelectedItems extends React.Component {
  renderOption = (index, food) => {
    return (
      <option key={index} value={food}>{food[1]}</option>
    );
  }

  render() {
    return (
      <div>
        <Card className="m-4 bg-success text-white">
          <div className="SelectedItemsCard">
            <CardHeader tag="h5">
              Selected Items
            </CardHeader>

            <select className="SelectedItems" size="10" onClick={this.props.onClick}>
              {this.props.selectedItemsList.map((food, index) => (
                this.renderOption(index, food)
              ))}
            </select>
          </div>
          <br></br>
        </Card>
      </div>
    );
  }
}

export default SelectedItems;