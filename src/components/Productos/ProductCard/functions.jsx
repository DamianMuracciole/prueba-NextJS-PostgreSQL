function addItem(item, productList) {
    if (productList.find((value) => value.id == item.id) == undefined)
      productList.push(item);
    const newArray = productList.filter((e) => e.id != 0);
    localStorage.setItem("listado", JSON.stringify(productList));
    return newArray;
  }
  
  function clearItem(item, productList) {
    let new_List = [];
    new_List = productList.find((value) => value.id == item.id)
      ? productList.filter((e) => e.id != item.id)
      : productList;
    localStorage.setItem("listado", JSON.stringify(new_List));
    return new_List;
  }

export { addItem , clearItem }