import axios from "axios";

export async function createUser(email,password,name) {
    const API_KEY = 'AIzaSyBbfhChrln5C9Eq2N0GwjfTNre0ia5iMsI';
    const url = 'https://mernstackcorrsbackserver.onrender.com/api/users/register';


    console.log("Name",name);

    const response = await axios.post(url,{
        email:email,
        password: password,
        name: name
    });
    
    return response.data;
}

export async function authenticateUser(email,password) {
    const API_KEY = 'AIzaSyBbfhChrln5C9Eq2N0GwjfTNre0ia5iMsI';
    const url = 'https://mernstackcorrsbackserver.onrender.com/api/users/signin';

    const response = await axios.post(url,{
        email:email,
        password: password
    });

    console.log("Response in Auth"+ JSON.stringify(response.data));

    return response.data;
    
}
