import { GET_ALL_USER, DELETE_USER } from '../actions/user';
import _ from 'lodash'

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USER: return [...action.users] 

        case DELETE_USER:
             return _.filter(state, (user) => (user.ID !== action.userId))
        
        default:
            return state;
    }
}