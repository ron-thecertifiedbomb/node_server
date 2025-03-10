  




const cheapProducts = products.filter((product) => {
    const price = Number(product.price);
    return price > 100 && price < 500;
});


console.log(cheapProducts)
  
