import axios from "axios";

const BACKEND_URL = "https://react-native-320d9-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + "/expenses.json", expenseData);
//   firebase holds auto generated id from the name property
  const id = response.data.name;
  return id;
}

// using async await to wait until the promise is resolved and we get data
export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];
  console.log(response.data);
  //   the key is the unique id that firebase gives us for each object
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  //   will return an array of objects in the form we want them
  return expenses;
}

// no async in case we want to use loader spinner
export function updateExpense(id, expenseData){
return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData)
}


export function deleteExpense(id){
return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}
