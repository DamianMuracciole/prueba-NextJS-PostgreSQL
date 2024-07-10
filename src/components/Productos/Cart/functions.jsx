function clearItem(item, productList) {
  //Borrado de un item de la lista del carro
  let new_List = [];
  new_List = productList.find((value) => value.id == item.id)
    ? productList.filter((e) => e.id != item.id)
    : productList;
  // carga el localSorage
  localStorage.setItem("listado", JSON.stringify(new_List));
  // devuelve el nuevo listado
  return new_List;
}

function clearAll() {
  //borro el localStorage
  localStorage.setItem("listado", JSON.stringify([]));
  //Borro el estado
  return [];
}

function sum(listado) {
  let suma = 0;
  listado.map((item) => (suma += Number(item.price)));
  return suma;
}

export { clearItem, clearAll, sum };
