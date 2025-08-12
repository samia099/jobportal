// Updated ViewJobModal.jsx
import React from "react";
import { format } from "date-fns";

const ViewJobModal = ({ job, onClose }) => {
  if (!job) return null;

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  // Handle both array and string formats for requirements
  const getRequirementsList = () => {
    if (Array.isArray(job.requirements)) {
      return job.requirements;
    } else if (typeof job.requirements === 'string') {
      return job.requirements.split(',');
    }
    return [];
  };

  // Handle both array and string formats for skills
  const getSkillsList = () => {
    if (Array.isArray(job.skills)) {
      return job.skills;
    } else if (typeof job.skills === 'string') {
      return job.skills.split(',');
    }
    return [];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Job Type</h3>
              <p className="text-lg capitalize">
                {job.type.replace("-", " ")}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Location</h3>
              <p className="text-lg">{job.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Salary</h3>
              <p className="text-lg">
                {job.salary?.min && job.salary?.max
                  ? `${job.salary.currency || "$"}${job.salary.min} - ${job.salary.max}`
                  : "Not specified"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
              <p className="text-lg">{formatDate(job.deadline)}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Job Description
            </h3>
            <p className="text-gray-700 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Requirements
            </h3>
            <ul className="list-disc pl-5 text-gray-700">
              {getRequirementsList().map((req, index) => (
                <li key={index} className="mb-1">
                  {req.trim()}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {getSkillsList().map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJobModal;