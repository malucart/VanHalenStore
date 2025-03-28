if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
}

function ready() {
	var removeButton = document.getElementsByClassName('btn-remove');
	for (var i = 0; i < removeButton.length; i++) {
		var cartItem = removeButton[i];
		cartItem.addEventListener('click', removeCartItem);
	};

	var quantityInputs = document.getElementsByClassName('cart-quantity-input');
	for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i];
		input.addEventListener('change', quantityChanged);
	};

	var addToCart = document.getElementsByClassName('shop-item-button');
	for (var i = 0; i < addToCart.length; i++) {
		var added = addToCart[i];
		added.addEventListener('click', addCartItem);
	}

	var purchase = document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseCompleted);

	var buttonLatestAlbum = document.getElementsByClassName('header-button')[0].addEventListener('click', latestAlbum);
};

function latestAlbum(event) {
	window.open("https://open.spotify.com/album/5ydOKnIrXsv7AziaSpRzZU?autoplay=true");
}

function purchaseCompleted(event) {
	alert("Thank you for shopping with us!");
	var cartItems = document.getElementsByClassName('cart-items')[0];
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild);
	}
	updateCartTotal();
}

function removeCartItem(event) {
	var buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.remove();
	updateCartTotal();
}

function quantityChanged(event) {
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}

function addCartItem(event) {
	var buttonClicked = event.target;
	var button = buttonClicked.parentElement.parentElement;
	var title = button.getElementsByClassName('shop-item-title')[0].innerText;
	var price = button. getElementsByClassName('shop-item-price')[0].innerText;
	var image = button.getElementsByClassName('shop-item-image')[0].src;
	addItemToCart(image, title, price);
	updateCartTotal();
}

function addItemToCart(image, title, price) {
	var cartRow = document.createElement('div');
	cartRow.classList.add('cart-row');
	var cartItems = document.getElementsByClassName('cart-items')[0];
	var cartItemNames = document.getElementsByClassName('cart-item-title');
	for (var i = 0; i < cartItemNames.length; i++) {
		if (cartItemNames[i].innerText == title) {
			// so it wont go to anything after the for loop
			return;
		}
	}
	var cartRowContents = `
		<div class="cart-item cart-column">
			<img class="cart-item-image" src="${image}" width="100" height="100">
			<span class="cart-item-title">${title}</span>
		</div>
		<span class="cart-price cart-column">${price}</span>
		<div class="cart-quantity cart-column">
			<input class="cart-quantity-input" type="number" value="1">
			<button class="shop-item-button btn-remove cart-quantity-button" type="button">REMOVE</button>
		</div>`
	cartRow.innerHTML = cartRowContents;
	cartItems.append(cartRow);
	cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
	cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
	var cartItemContainer = document.getElementsByClassName('cart-items')[0];
	var cartRows = cartItemContainer.getElementsByClassName('cart-row');
	var total = 0;
	for (var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i];
		var priceElement = cartRow.getElementsByClassName('cart-price')[0];
		var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
		var price = parseFloat(priceElement.innerText.replace('$', ''));
		var quantity = quantityElement.value;
		total = total + (quantity * price);
	};
	// to not round the two last digits
	total = Math.round(total * 100) / 100
	document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
};