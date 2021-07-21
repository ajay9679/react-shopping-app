import React from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input.js';

const MealItemForm = props => {
	const [amountIsValid, setAmountIsValid] = React.useState(true);
	const amountInputRef = React.useRef();
	const amountId = `amount_${props.id}`;
	const submitHandler = e => {
		e.preventDefault();
		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;
		if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
			setAmountIsValid(false);
			return;
		}
		props.onAddToCart(enteredAmountNumber);
	};

	return <form onSubmit={submitHandler} className={classes.form}>
		<Input label="Quantity" ref={amountInputRef} input={{
			id: amountId,
			type: 'number',
			min: '1',
			max: '5',
			step: '1',
			defaultValue: '1',
		}} />
		<button>+ Add</button>
		{!amountIsValid && <p>Please a valid amount.</p>}
	</form>
};

export default MealItemForm;