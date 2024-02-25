import { createSlice } from "@reduxjs/toolkit";

const cardValue = [
    {
        cardName: "cat",
        isVisible: false,
    },
    {
        cardName: "defuse",
        isVisible: false,
    },
    {
        cardName: "shuffle",
        isVisible: false,
    },
    {
        cardName: "exploding_kitten_bomb",
        isDefused: false,
        isVisible: false,
    },
];

const initialState = {
    username: '',
    cards: [],
    value: {},
    showBoard: false,
    highScore: 0,
    currentScore: 0
}

export const cardSlice = createSlice({
    name: 'card',
    initialState: initialState,
    reducers: {
        updateUsername:(state, action)=>{
        state.username = action.payload
        console.log(state.username);
        },
        startGame: (state, action) => {
              if(state.username === ''){
                  state.showBoard = false
              }
              else{
                state.showBoard = true
                const tempCard = []
                for (let i = 0; i < 5; i++) {
                    const rv = Math.floor(Math.random() * 4);
                    tempCard.push({ ...cardValue[rv], id: i + 1 });
                }
                state.cards = tempCard
              }
        },
        setCardVisible: (state, action) => {
            state.cards = state.cards.map((card) => card.id === action.payload.id ? { ...card, isVisible: true } : card)
        },
        setCardValue: (state, action) => {
            state.value = action.payload
        },
        removeCard: (state, action) => {
            state.cards = state.cards.filter((card) => card.id !== action.payload.id)
            console.log(state.cards);
        },
        explodingBomb: (state, action) => {
            state.cards = state.cards.map((card) => card.cardName === "exploding_kitten_bomb" ? { ...card, isDefused: false } : card)
            state.cards = state.cards.filter((card) => card.id !== action.payload.id)
        },
        defuseBomb: (state, action) => {
            state.cards = state.cards.map((card) => card.cardName === "exploding_kitten_bomb" ? { ...card, isDefused: true } : card)
            state.cards = state.cards.filter((card) => card.id !== action.payload.id)
        },
        updateCurrentScore: (state, action) => {
            state.currentScore = action.payload
        },
        updateHighScore: (state, action) => {
            state.highScore = action.payload
        },

    }
})

export const { startGame, setCardVisible, setCardValue, removeCard, explodingBomb, defuseBomb, handleScore, updateCurrentScore, updateHighScore, updateUsername } = cardSlice.actions
export default cardSlice.reducer