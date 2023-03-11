import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com";

export const getUsers = () => {
    axios.get(`${baseUrl}/users`)
      .then(res => {
        console.log(res.data);
      })
};

export const getProducts = () => {
    console.log("products..")
};

export const saveProduct = () => {

};

export const updateProduct = () => {

};

export const deleteProduct = () => {

};