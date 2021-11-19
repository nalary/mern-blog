import axios from "axios";

export const writeCall = async (post, category) => {
    try {
        await axios.post("/categories", { name: category });
        const res = await axios.post("/posts", post);        
        window.location.replace("/posts/" + res.data._id);
    } catch (err) {
        console.log(err);
    }
};

export const updateCall = async (updatedUser, userId, dispatch) => {
    dispatch({ type: "UPDATE_START" });
    try {
        const res = await axios.put(`/users/${userId}`, updatedUser);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};