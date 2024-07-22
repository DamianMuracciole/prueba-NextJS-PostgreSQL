const showCart = {
  transform: "translateX(0)",
  top: '3.5rem',
  transition: "all .7s ease-in-out",
};

const hiddenCart = {
  transform: "translateX(400px)",
  visibility: "hidden",
  width: "0vw",
  top: '3.5rem',
  transition: "all .7s ease-in-out .3s",
};

const showIconCart = {
  transform: "scale(1,1)",
  transition: "all .3s ease-in-out .7s",
};

const hiddenIconCart = {
  transform: "scale(0,0)",
  transition: "all .3s ease-in-out",
};


export { showCart, hiddenCart, showIconCart, hiddenIconCart }