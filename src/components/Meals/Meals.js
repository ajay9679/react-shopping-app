import React from 'react';
import MealsSummary from './MealsSummary.js';
import AvailableMeals from './AvailableMeals.js';

const Meals = () => {
    return <React.Fragment>
        <MealsSummary />
        <AvailableMeals />
    </React.Fragment>
};

export default Meals;
