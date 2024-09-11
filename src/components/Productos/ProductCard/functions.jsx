function addItem(item, productList) {
    if (productList.find((value) => value.id == item.id) == undefined)
      productList.push(item);
    const newArray = productList.filter((e) => e.id != 0);
    localStorage.setItem("listadoOtonio1568", JSON.stringify(productList));
    return newArray;
  }
  
  function clearItem(item, productList) {
    let new_List = [];
    new_List = productList.find((value) => value.id == item.id)
      ? productList.filter((e) => e.id != item.id)
      : productList;
    localStorage.setItem("listadoOtonio1568", JSON.stringify(new_List));
    return new_List;
  }

  function roundedPrice( price ){
    const price2decimal = Math.round(price*100)/100
    return price2decimal
  }

export { addItem , clearItem , roundedPrice}