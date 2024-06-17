import axios from "axios";

export const loginUsers = async ({username, password}) => {
    try {
        return await axios.post('http://localhost:9010/login', {
            username,
            password,
        });
    } catch (error) {
        throw error;
    }
};

