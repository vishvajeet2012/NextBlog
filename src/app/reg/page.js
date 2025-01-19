"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerUserAction } from "@/actions/register";

// Define schema using zod
const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(3, { message: "Password must be at least 3 characters" }),
});

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Use zod for validation
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    setSuccessMessage("");

    try {
      // Prepare form data
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      // Call the server action
      const result = await registerUserAction(formData);

      if (result.error) {
        setServerError(result.error.map((err) => err.message).join(", "));
      } else {
        setSuccessMessage("Registration successful!");
        console.log("Server Decision:", result.decision); // Log decision for debugging
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Registration</h2>

        {/* Display success or error messages */}
        {serverError && <p className="text-red-500 text-center mb-4">{serverError}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className={`w-full border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1" aria-live="polite">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className={`w-full border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1" aria-live="polite">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1" aria-live="polite">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1" aria-live="polite">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
