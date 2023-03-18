import axios from "axios";

const baseUrl = "http://localhost:5071";
const products = [
    {
      id: 1,
      productName: "Sunlight 400g",
      sku: "PT001",
      category: "Soaps",
      price: "180.00"
    },
    {
      id: 2,
      productName: "Dasani Water 500ml",
      sku: "PT002",
      category: "Beverages",
      price: "60.00"
    },
    {
      id: 3,
      productName: "Afia Juice 500ml",
      sku: "PT003",
      category: "Beverages",
      price: "70.00"
    },
    {
      id: 4,
      productName: "Superloaf Bread 400g",
      sku: "PT004",
      category: "Bakery",
      price: "60.00",
    },
    {
      id: 5,
      productName: "Eggs",
      sku: "PT005",
      category: "Eggs",
      brand: "N/D",
      price: "15.00"
    }
  ];

export const getUsers = () => {
    axios.get(`${baseUrl}/users`)
      .then(res => {
        console.log(res.data);
      })
};

export const getProducts = () => {
  console.log("Here::")
  axios.get(`${baseUrl}/products`)
  .then(res => {
    console.log("Data::")
    console.log(res.data)
    return res.data;
  })
};

export const saveProduct = () => {

};

export const updateProduct = () => {

};

export const deleteProduct = () => {

};