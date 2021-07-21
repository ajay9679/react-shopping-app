import React from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal.js';
import CartContext from '../../store/cart-context.js';
import CartItem from './CartItem.js';
import Checkout from './Checkout.js';

const Cart = props => {
	const [isCheckout, setIsCheckout] = React.useState(false);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [didSubmit, setDidSubmit] = React.useState(false);
	const cartCtx = React.useContext(CartContext);
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;
	const cartItemRemoveHandler = id => cartCtx.removeItem(id);
	const cartItemAddHandler = item => cartCtx.addItem({...item, amount: 1});
	const orderHandler = () => setIsCheckout(true);
	const submitOrderHandler = async userData => {
		setIsSubmitting(true);
		const date = new Date().toLocaleString();
		const response = await fetch('https://section-17-default-rtdb.firebaseio.com/orders.json', {
			method: 'POST',
			body: JSON.stringify({
				user: userData,
				orderedItems: cartCtx.items,
				dateTime: date,
			})
		});
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const cartItems = <ul className={classes['cart-items']}>
		{cartCtx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />)}
    </ul>
    const modalActions = <div className={classes.actions}>
		<button className={classes['button-alt']} onClick={props.onClose}>Close</button>
		{hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
	</div>

	const cartModalContent = <React.Fragment>
		{cartItems}
		<div className={classes.total}>
			<div>Total Amount</div>
			<div>{totalAmount}</div>
		</div>
		{isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
		{!isCheckout && modalActions}
	</React.Fragment>

	const isSubmittingModalContent = <p>please wait...</p>
	const didSubmitModalContent = <React.Fragment>
		<p>successfully sent the order</p>
		<div className={classes.actions}>
			<button className={classes.button} onClick={props.onClose}>Close</button>
		</div>
	</React.Fragment>

	return <Modal onClose={props.onClose}>
		{!isSubmitting && !didSubmit && cartModalContent}
		{isSubmitting && isSubmittingModalContent}
		{!isSubmitting && didSubmit && didSubmitModalContent}
	</Modal>
};

export default Cart;
