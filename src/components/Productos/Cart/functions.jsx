function clearItem(item, productList) {
  //Borrado de un item de la lista del carro
  let new_List = [];
  new_List = productList.find((value) => value.id == item.id)
    ? productList.filter((e) => e.id != item.id)
    : productList;
  // carga el localStorage
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

function subTotalRow(listado) {
  let sumaTotal = 0;
  listado.map((item) => (sumaTotal += Number(item.price)));
  return sumaTotal;
}

function discountTotal(listado) {
  let sumaTotal = 0;
  listado.map((item) => (sumaTotal += Number(item.price)* Number(item.discount)));
  return sumaTotal;
}

function totalTaxes(listado) {
  let sumaTotal = 0;
  listado.map((item) => (sumaTotal += Number(item.price)* Number(item.taxes)));
  return sumaTotal;
}

export { clearItem, clearAll, subTotalRow , discountTotal , totalTaxes };
