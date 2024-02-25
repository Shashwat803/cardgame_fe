import axios from "axios";

// const devBaseUrl = "http://localhost:8080/"
const ProdBaseUrl = "https://cardgame-be.onrender.com/"

const api = axios.create({
    baseURL: ProdBaseUrl,
   
})

export const registerUser = async (username) => {
    try {
        const response = await api.post('/register', {Username:username})
        return response
    } catch (error) {
        console.log(error);
    }
}

export const postScore = async (username, highScore) => {
    try {
        const response = await api.post(`/record-win/${username}`, { Wins: highScore })
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getLeaderboard = async () => {
    try {
        const response = await api.get(`/leaderboard`)
        return response
    } catch (error) {
        console.log(error);
    }
}