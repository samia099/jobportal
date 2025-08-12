// JobPostForm.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const JobPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      // Debug: Log the token and data
      console.log("Sending request with token:", token);
      console.log("Job data:", data);

      const response = await axios.post("http://localhost:9000/jobs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      toast.success("Job posted successfully! Waiting for admin approval.");
      navigate("/dashboard/jobs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post job");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a New Job</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Job Title*
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Job title is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Senior Software Engineer"
            />
            {errors.title && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Job Description */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Job Description*
            </label>
            <textarea
              id="description"
              rows={5}
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed job description..."
            />
            {errors.description && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Requirements */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2" htmlFor="requirements">
              Requirements (comma separated)*
            </label>
            <textarea
              id="requirements"
              rows={3}
              {...register("requirements", {
                required: "Requirements are required",
                validate: (value) =>
                  value.split(",").length > 0 ||
                  "Enter at least one requirement",
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 5+ years experience, Bachelor's degree, etc."
            />
            {errors.requirements && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.requirements.message}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2" htmlFor="skills">
              Required Skills (comma separated)*
            </label>
            <textarea
              id="skills"
              rows={3}
              {...register("skills", {
                required: "Skills are required",
                validate: (value) =>
                  value.split(",").length > 0 || "Enter at least one skill",
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. JavaScript, React, Node.js, etc."
            />
            {errors.skills && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.skills.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="location">
              Location*
            </label>
            <input
              id="location"
              type="text"
              {...register("location", { required: "Location is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. New York, Remote, etc."
            />
            {errors.location && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="type">
              Job Type*
            </label>
            <select
              id="type"
              {...register("type", { required: "Job type is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select job type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Internship</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="salary.min">
              Minimum Salary ($)
            </label>
            <input
              id="salary.min"
              type="number"
              {...register("salary.min")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 50000"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="salary.max">
              Maximum Salary ($)
            </label>
            <input
              id="salary.max"
              type="number"
              {...register("salary.max")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 80000"
            />
          </div>

          {/* Currency */}
          <div>
            <label
              className="block text-gray-700 mb-2"
              htmlFor="salary.currency"
            >
              Currency
            </label>
            <select
              id="salary.currency"
              {...register("salary.currency")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="deadline">
              Application Deadline*
            </label>
            <input
              id="deadline"
              type="date"
              {...register("deadline", {
                required: "Deadline is required",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return (
                    selectedDate >= today || "Deadline must be in the future"
                  );
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.deadline && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.deadline.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50"
          >
            {isSubmitting ? "Posting Job..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostForm;
