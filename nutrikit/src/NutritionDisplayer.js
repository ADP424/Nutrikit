import React from 'react';
import { Card, CardHeader, CardText } from 'reactstrap';

class NutritionDisplayer extends React.Component {
    render() {
        if(this.props.food.length === 0) {
            return (
                <div>
                    <Card className="m-2 bg-success text-white">
                        <CardHeader tag="h4">
                            Nutrition Facts
                        </CardHeader>
                        <CardHeader tag="h5">
                            {'Calories - ???'}
                        </CardHeader>
                        <CardText>
                            {'Total Fat - ???'}
                        </CardText>
                        <CardText>
                            {'Saturated Fat - ???'}
                        </CardText>
                        <CardText>
                            {'Trans Fat - ???'}
                        </CardText>
                        <CardText>
                            {'Protein - ???'}
                        </CardText>
                        <CardText>
                            {'Carbohydrate - ???'}
                        </CardText>
                    </Card>
                </div>
            );
        }

        return (
            <div>
            <Card className="m-2 bg-success text-white">
                <CardHeader tag="h4">
                    Nutrition Facts
                </CardHeader>
                <CardHeader tag="h5">
                    {'Calories - ' + this.props.food[3]}
                </CardHeader>
                <CardText className={(this.props.food[4] / this.props.dailyValue.get('Total Fat') <= 0.05) ? 'LowQuantity' : ((this.props.food[4] / this.props.dailyValue.get('Total Fat') >= 0.2) ? 'HighQuantity' : 'MediumQuantity')}>
                    {'Total Fat - ' + this.props.food[4].toFixed(2) + 'g'}
                </CardText>
                <CardText className={(this.props.food[5] / this.props.dailyValue.get('Saturated Fat') <= 0.05) ? 'LowQuantity' : ((this.props.food[5] / this.props.dailyValue.get('Saturated Fat') >= 0.2) ? 'HighQuantity' : 'MediumQuantity')}>
                    {'Saturated Fat - ' + this.props.food[5].toFixed(2) + 'g'}
                </CardText>
                <CardText className={(this.props.food[6] / this.props.dailyValue.get('Trans Fat') <= 0.05) ? 'LowQuantity' : ((this.props.food[6] / this.props.dailyValue.get('Trans Fat') >= 0.2) ? 'HighQuantity' : 'MediumQuantity')}>
                    {'Trans Fat - ' + this.props.food[6].toFixed(2) + 'g'}
                </CardText>
                <CardText className={(this.props.food[7] / this.props.dailyValue.get('Protein') <= 0.05) ? 'LowQuantity' : ((this.props.food[7] / this.props.dailyValue.get('Protein') >= 0.2) ? 'HighQuantity' : 'MediumQuantity')}>
                    {'Protein - ' + this.props.food[7].toFixed(2) + 'g'}
                </CardText>
                <CardText className={(this.props.food[8] / this.props.dailyValue.get('Carbohydrate') <= 0.05) ? 'LowQuantity' : ((this.props.food[8] / this.props.dailyValue.get('Carbohydrate') >= 0.2) ? 'HighQuantity' : 'MediumQuantity')}>
                    {'Carbohydrate - ' + this.props.food[8].toFixed(2) + 'g'}
                </CardText>
            </Card>
            </div>
        );
    }
}

export default NutritionDisplayer;