import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
    points: []
};

const pointSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {
        addToPoint: (state, action) => {
            const existingItem = state.points.find(item => item._id === action.payload._id);
            
            if (!existingItem) {
                state.points.push(action.payload);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Point Added!",
                    text: "This product has been successfully added to your points.",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    title: "Already in poinst",
                    text: "This item is already in your points!",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK"
                });
            }
        },
        removeFromPoint: (state, action) => {
            state.points = state.points.filter(item => item._id !== action.payload._id);
            Swal.fire({
                position: "top-end",
                icon: "info",
                title: "Point Removed",
                text: "The item has been removed from your points.",
                showConfirmButton: false,
                timer: 1200
            });
        },
        clearPoint: (state) => {
            state.points = [];
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Points Cleared",
                text: "Your points has been emptied successfully.",
                showConfirmButton: false,
                timer: 1200
            });
        }
    }
});

// Export actions
export const { addToPoint, removeFromPoint, clearPoint } = pointSlice.actions;
export default pointSlice.reducer;