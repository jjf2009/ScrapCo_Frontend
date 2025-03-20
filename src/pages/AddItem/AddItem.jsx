import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddItemMutation } from '../../redux/features/items/itemsApi';
import {addToPoint} from '../../redux/features/points/pointsSlice'
import Swal from 'sweetalert2';
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from'react-redux'
// import axios from "axios";
// import UploadImage from "./UploadImage";


const AddItem = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [addItem, { isLoading }] = useAddItemMutation();
    const dispatch = useDispatch();
    const { currentUser } = useAuth();
    // const [pictures, setPictures] = useState([]);

    // const handleUpload = (imageUrl) => {
    //     setPictures({ ...data, pictures: [...data.pictures, imageUrl] });
    //   };
    const onSubmit = async (data) => {
        const payload = {
            user_id: currentUser?.id,
            seller_name: currentUser.fullName|| "Jared",
            seller_phone: currentUser.phone|| "123456789",
            description: data.description,
            quantity: parseFloat(data.quantity), // ✅ Convert to Float
            material: data.material,
            pickUpAddress: data.pickUpAddress,
            pickUpTime: data.pickUpTime,
            listPlat: data.listPlat,
            price: parseFloat(data.price) || 0,
            // pictures, // ✅ Convert to Float (optional price)
        };
       console.log(payload)
        try {
            await addItem(payload).unwrap();
            dispatch(addToPoint({ user_id: payload.user_id, points: 10 })); 
            Swal.fire({
                title: "Item listed",
                text: "Your scrap item has been listed successfully!",
                icon: "success",
            });
            reset();
            // setImageFileName('');
            //  setImageFile(null);
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Failed to list item",
                text: "Please try again.",
                icon: "error",
            });
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-green-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-800 mb-4">List Your Scrap Item</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Item Name"
                    name="name"
                    placeholder="Enter scrap item name"
                    register={register}
                />
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Describe the item"
                    type="textarea"
                    register={register}
                />
                <SelectField
    label="Material"
    name="material"
    options={[
        { value: '', label: 'Select Material' },
        { value: 'ALUMINUM', label: 'ALUMINUM' },
        { value: 'STEEL', label: 'STEEL' },
        { value: 'PAPER', label: 'PAPER' },
        { value: 'RUBBER', label: 'RUBBER' },
    ]}
    register={register}
/>
  {/* ✅ Corrected UploadImage Usage */}
  {/* <UploadImage onUpload={handleUpload} /> */}

{/* ✅ Show Uploaded Images */}
{/* <div className="flex flex-wrap gap-2 mt-2">
    {pictures.map((pic, index) => (
        <img key={index} src={pic} alt="Uploaded" className="w-24 h-24 object-cover rounded-md" />
    ))}
</div> */}
<InputField
    label="Quantity"
    name="quantity"
    type="number"
    placeholder="Enter quantity"
    register={register}
/>

<InputField
    label="Pick-up Address"
    name="pickUpAddress"
    placeholder="Enter pick-up address"
    register={register}
/>

<InputField
    label="Pick-up Time"
    name="pickUpTime"
    type="text"
    register={register}
/>

<SelectField
    label="List Platform"
    name="listPlat"
    options={[
        { value: 'WEBSITE', label: 'WEBSITE ' },
    ]}
    register={register}
/>

                <InputField
                    label="Expected Price"
                    name="price"
                    type="number"
                    placeholder="Set a price (optional)"
                    register={register}
                />
                <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                    {isLoading ? "Listing..." : "List Item"}
                </button>
            </form>
        </div>
    );
};

export default AddItem;
