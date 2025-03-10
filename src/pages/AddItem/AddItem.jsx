import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddItemMutation } from '../../redux/features/items/itemsApi';
import  { useGetCurrentDealerQuery } from '../../redux/features/dealer/dealerApi'
import {addToPoint} from '../../redux/features/points/pointsSlice'
import Swal from 'sweetalert2';
import { useDispatch } from'react-redux'

const AddItem = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // const [imageFile, setImageFile] = useState(null);
    const [addItem, { isLoading, isError }] = useAddItemMutation();
    // const [imageFileName, setImageFileName] = useState('');
    const dispatch =  useDispatch();

    const { data: dealer, isLoading: isDealerLoading } = useGetCurrentDealerQuery();

    const onSubmit = async (data) => {
        if (!dealer) {
            Swal.fire({
                title: "Error",
                text: "User data is not available. Please try again later.",
                icon: "error",
            });
            return;
        }
    
        const payload = {
            user_id: dealer.id || "3970a2cb-6bc1-45e6-bec0-a8c88199eb0d",
            seller_name: dealer.name || "Jared",
            seller_phone: dealer.phone || "123456789",
            description: data.description,
            quantity: parseFloat(data.quantity), // ✅ Convert to Float
            material: data.material,
            pickUpAddress: data.pickUpAddress,
            pickUpTime: data.pickUpTime,
            listPlat: data.listPlat,
            price: parseFloat(data.price) || 0, // ✅ Convert to Float (optional price)
        };
    
       console.log(payload)
    
        try {
            await addItem(payload).unwrap();
            dispatch(addToPoint(payload))
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
    
    
    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setImageFile(file);
    //         setImageFileName(file.name);
    //     }
    // };

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
                {/* <div className="mb-4">
                    <label className="block text-sm font-semibold text-green-700 mb-2">Upload Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
                    {imageFileName && <p className="text-sm text-gray-600">Selected: {imageFileName}</p>}
                </div> */}
                <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                    {isLoading ? "Listing..." : "List Item"}
                </button>
            </form>
        </div>
    );
};

export default AddItem;
