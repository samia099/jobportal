// EditJobModal.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";

const EditJobModal = ({ job, onClose, onJobUpdated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (job) {
      // Format the date for the date input
      const formattedDeadline = job.deadline
        ? format(new Date(job.deadline), "yyyy-MM-dd")
        : "";
      
      reset({
        ...job,
        deadline: formattedDeadline,
      });
    }
  }, [job, reset]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:9000/jobs/${job._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Job updated successfully!");
      onJobUpdated(response.data.job);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job");
    }
  };

  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Edit Job</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

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
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.type.message}
                  </p>
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
                />
              </div>

              {/* Currency */}
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="salary.currency">
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

            <div className="mt-8 flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJobModal;