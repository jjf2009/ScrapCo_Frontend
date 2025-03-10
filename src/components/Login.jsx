import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useRegisterDealerMutation } from "../redux/features/dealer/dealerApi";

const Login = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [registerDealer, { isLoading, error }] = useRegisterDealerMutation();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const userType = watch("userType", "individual");

    const onSubmit = async (data) => {
        try {
            const payload = {
                fullName: data.fullName,
                phone: data.phone,
                email: data.email,
                password: data.password,
                permAddress: data.address,  // Match permAddress
                sellerRole: data.userType === "individual" ? "INDIVIDUAL" : "ORGANISATION", // Match sellerRole
                orgName: data.organizationName || undefined,
                orgAddress: data.organizationAddress || undefined,
                gstNumber: data.gstNumber || undefined,
                licenseNumber: data.licenseNumber || undefined,
            };
            
            console.log(payload);

            const response = await registerDealer(payload).unwrap();
            alert("Registration successful!");
            navigate("/");
        } catch (err) {
            setMessage(err?.data?.message || "Registration failed!");
            console.error(err);
        }
    };

    return (
        <div className="h-full bg-white flex flex-col mb-5">
            <div className="flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
                    <div className="card bg-green-900 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-center text-2xl font-bold mb-2 justify-center text-white">
                                Registration
                            </h2>
                            <div className="divider m-0"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text text-white">Full Name</span></label>
                                    <input {...register("fullName", { required: "Full Name is required" })} type="text" className="input input-bordered w-full bg-white" />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text text-white">Phone Number</span></label>
                                    <input {...register("phone", { required: "Phone Number is required" })} type="tel" className="input input-bordered w-full bg-white" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-tex text-white">Email</span></label>
                                    <input {...register("email", { required: "Email is required" })} type="email" className="input input-bordered w-full bg-white" />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text text-white">Password</span></label>
                                    <input {...register("password", { required: "Password is required" })} type="password" className="input input-bordered w-full bg-white" />
                                </div>
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text text-white">Permanent Address</span></label>
                                <textarea {...register("address", { required: "Address is required" })} className="textarea textarea-bordered w-full bg-white" />
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text text-white">User Type</span></label>
                                <select {...register("userType", { required: "User Type is required" })} className="select select-bordered w-full bg-white">
                                    <option value="individual">Individual Seller</option>
                                    <option value="organization">Organization/Business</option>
                                </select>
                            </div>
                            {userType === "organization" && (
                                <div className="bg-green-900 p-4 rounded-lg mt-4">
                                    <h3 className="font-medium mb-3 text-white">Organization Details</h3>
                                    <div className="space-y-4">
                                        <div className="form-control w-full">
                                            <label className="label"><span className="label-text text-white">Organization Name</span></label>
                                            <input {...register("organizationName", { required: "Organization Name is required" })} type="text" className="input input-bordered w-full bg-white" />
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label"><span className="label-text text-white">Organization Address</span></label>
                                            <textarea {...register("organizationAddress", { required: "Organization Address is required" })} className="textarea textarea-bordered w-full bg-white" />
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label"><span className="label-text text-white">GST Number</span></label>
                                            <input {...register("gstNumber", { required: "GST Number is required" })} type="text" className="input input-bordered w-full bg-white" />
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label"><span className="label-text text-white">License Number</span></label>
                                            <input {...register("licenseNumber", { required: "License Number is required" })} type="text" className="input input-bordered w-full bg-white" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="form-control mt-6">
                                <button type="submit" disabled={isLoading} className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}>Get Started</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;