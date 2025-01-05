const { faker } = require('@faker-js/faker');

// Function to generate a fake shopping list
const generateShoppingList = (count = 10) => {
  const shoppingList = [];
  
  for (let i = 0; i < count; i++) {
    const item = {
      name: faker.commerce.productName(), // Generates a random product name
      price: faker.commerce.price(1, 100, 2, '$') // Generates a random price between $1 and $100
    };
    shoppingList.push(item);
  }
  
  return shoppingList;
}

// Create a list with 10 items
const shoppingList = generateShoppingList(10);
console.log(shoppingList);
