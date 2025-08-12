// JobList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ApplyJobModal from "./components/ApplyJobModal";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:9000/jobs", {
          params: {
            status: "approved"
          }
        });
        setJobs(response.data.jobs);
      } catch (error) {
        toast.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Available Jobs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h2>
              <div className="flex items-center mb-2">
                <span className="text-gray-600 mr-2">{job.type.replace("-", " ")}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-600 ml-2">{job.location}</span>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills?.slice(0, 3).map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">
                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleApply(job)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isApplyModalOpen && selectedJob && (
        <ApplyJobModal
          job={selectedJob}
          onClose={() => setIsApplyModalOpen(false)}
        />
      )}
    </div>
  );
};

export default JobList;