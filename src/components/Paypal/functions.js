import { roundedPrice } from "../Productos/ProductCard/functions";

function dataObjectForPaypal(productList) {

  const totalityPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < productList.productList.length; i++) {
      totalPrice += roundedPrice(productList.productList[i].price * (1 - productList.productList[i].discount) * (1 + productList.productList[i].taxes))
    }
    return {
      currency_code: "USD",
      value: String(totalPrice),
      breakdown: {
        item_total: {
          currency_code: "USD",
          value: String(totalPrice),
        },
      },
    }
  }
  const items = productList.productList.map(item => {
    return {
      name: item.title,
      description: item.description,
      quantity: "1",
      unit_amount: {
        currency_code: "USD",
        value: String(roundedPrice(item.price * (1 - item.discount) * (1 + item.taxes))),
      },
    }
  })

  const amount = totalityPrice()

  const data = [{
    amount,
    items
  }]


  return { amount, items, data }
}

export { dataObjectForPaypal }