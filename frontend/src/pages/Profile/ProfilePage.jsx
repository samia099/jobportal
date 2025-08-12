import React, { useState, useEffect } from "react";
import {
  User,
  Edit3,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Globe,
  Facebook,
  Linkedin,
  Plus,
  Trash2,
  Camera,
} from "lucide-react";
import useCurrentUser from "../../hooks/useCurrentUser";
import axios from "axios";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, loading, error, refreshUser } = useCurrentUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);

  // ImageBB API key - replace with your actual key
  const imgbbApi = "7f3a98e5b9235e50d10ab2af5590caa9";

  useEffect(() => {
    if (user) {
      setEditFormData({
        name: user.name || "",
        email: user.email || "",
        photo: user.photo || "",
        jobSeekerProfile:
          user.role === "jobseeker"
            ? {
                bio: user.jobSeekerProfile?.bio || "",
                skills: user.jobSeekerProfile?.skills || [],
                contactInfo: {
                  phone: user.jobSeekerProfile?.contactInfo?.phone || "",
                  address: user.jobSeekerProfile?.contactInfo?.address || "",
                  city: user.jobSeekerProfile?.contactInfo?.city || "",
                  country: user.jobSeekerProfile?.contactInfo?.country || "",
                },
                experience: user.jobSeekerProfile?.experience || [],
                education: user.jobSeekerProfile?.education || [],
              }
            : undefined,
        employerProfile:
          user.role === "employer"
            ? {
                company: {
                  name: user.employerProfile?.company?.name || "",
                  website: user.employerProfile?.company?.website || "",
                  description: user.employerProfile?.company?.description || "",
                  logo: user.employerProfile?.company?.logo || "",
                  facebook: user.employerProfile?.company?.facebook || "",
                  linkedin: user.employerProfile?.company?.linkedin || "",
                  contactEmail:
                    user.employerProfile?.company?.contactEmail || "",
                  contactPhone:
                    user.employerProfile?.company?.contactPhone || "",
                },
                contactInfo: {
                  phone: user.employerProfile?.contactInfo?.phone || "",
                  address: user.employerProfile?.contactInfo?.address || "",
                  city: user.employerProfile?.contactInfo?.city || "",
                  country: user.employerProfile?.contactInfo?.country || "",
                },
              }
            : undefined,
      });
    }
  }, [user]);

  // Photo upload function
  const handlePhotoUpload = async (file, isCompanyLogo = false) => {
    if (!file) return null;

    // Validate file
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return null;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a JPG or PNG image");
      return null;
    }

    setPhotoUploading(true);
    const loadingToast = toast.loading(
      isCompanyLogo ? "Uploading logo..." : "Uploading photo..."
    );

    try {
      const formData = new FormData();
      formData.append("image", file);

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApi}`,
        formData
      );

      toast.dismiss(loadingToast);
      toast.success(
        isCompanyLogo
          ? "Logo uploaded successfully!"
          : "Photo uploaded successfully!"
      );
      return uploadRes.data.data.url;
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to upload image");
      console.error("Image upload error:", error);
      return null;
    } finally {
      setPhotoUploading(false);
    }
  };

  // Profile photo change handler
  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const photoUrl = await handlePhotoUpload(file);
    if (photoUrl) {
      handleInputChange("photo", photoUrl);
    }
  };

  // Company logo change handler
  const handleCompanyLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const logoUrl = await handlePhotoUpload(file, true);
    if (logoUrl) {
      handleInputChange("employerProfile.company.logo", logoUrl);
    }
  };

  const handleInputChange = (path, value) => {
    setEditFormData((prev) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleSkillsChange = (skills) => {
    const skillsArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
    handleInputChange("jobSeekerProfile.skills", skillsArray);
  };

  const addExperience = () => {
    const newExperience = {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    handleInputChange("jobSeekerProfile.experience", [
      ...(editFormData.jobSeekerProfile?.experience || []),
      newExperience,
    ]);
  };

  const updateExperience = (index, field, value) => {
    const experiences = [...(editFormData.jobSeekerProfile?.experience || [])];
    experiences[index] = { ...experiences[index], [field]: value };
    handleInputChange("jobSeekerProfile.experience", experiences);
  };

  const removeExperience = (index) => {
    const experiences = (
      editFormData.jobSeekerProfile?.experience || []
    ).filter((_, i) => i !== index);
    handleInputChange("jobSeekerProfile.experience", experiences);
  };

  const addEducation = () => {
    const newEducation = {
      degree: "",
      institution: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      current: false,
    };
    handleInputChange("jobSeekerProfile.education", [
      ...(editFormData.jobSeekerProfile?.education || []),
      newEducation,
    ]);
  };

  const updateEducation = (index, field, value) => {
    const educations = [...(editFormData.jobSeekerProfile?.education || [])];
    educations[index] = { ...educations[index], [field]: value };
    handleInputChange("jobSeekerProfile.education", educations);
  };

  const removeEducation = (index) => {
    const educations = (editFormData.jobSeekerProfile?.education || []).filter(
      (_, i) => i !== index
    );
    handleInputChange("jobSeekerProfile.education", educations);
  };

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    setUpdateError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:9000/update/profile",
        editFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        await refreshUser();
        setIsEditModalOpen(false);
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update profile";
      setUpdateError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-gray-600 text-center">
          <p className="text-xl font-semibold">
            Please log in to view your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-teal-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-teal-100"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center border-4 border-teal-100">
                    <User className="w-10 h-10 text-white" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-gray-600 flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {user.email}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                    user.role === "employer"
                      ? "bg-teal-100 text-teal-800"
                      : user.role === "jobseeker"
                      ? "bg-cyan-100 text-cyan-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-md"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Job Seeker Profile */}
        {user.role === "jobseeker" && (
          <div className="space-y-6">
            {/* Bio */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-teal-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-3"></div>
                About
              </h2>
              <p className="text-gray-700">
                {user.jobSeekerProfile?.bio || "No bio added yet."}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-teal-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-3"></div>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {user.jobSeekerProfile?.skills?.length > 0 ? (
                  user.jobSeekerProfile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills added yet.</p>
                )}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-teal-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-3"></div>
                Experience
              </h2>
              {user.jobSeekerProfile?.experience?.length > 0 ? (
                <div className="space-y-4">
                  {user.jobSeekerProfile.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-gradient-to-b from-teal-500 to-cyan-500 pl-4 bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-r-lg"
                    >
                      <h3 className="font-semibold text-lg text-gray-900">{exp.title}</h3>
                      <p className="text-teal-700 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(exp.startDate).toLocaleDateString()} -
                        {exp.current
                          ? " Present"
                          : ` ${new Date(exp.endDate).toLocaleDateString()}`}
                      </p>
                      {exp.description && (
                        <p className="text-gray-700 mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No experience added yet.</p>
              )}
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-teal-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-3"></div>
                Education
              </h2>
              {user.jobSeekerProfile?.education?.length > 0 ? (
                <div className="space-y-4">
                  {user.jobSeekerProfile.education.map((edu, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-gradient-to-b from-emerald-500 to-teal-500 pl-4 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-r-lg"
                    >
                      <h3 className="font-semibold text-lg text-gray-900">{edu.degree}</h3>
                      <p className="text-emerald-700 font-medium">{edu.institution}</p>
                      {edu.fieldOfStudy && (
                        <p className="text-gray-700">{edu.fieldOfStudy}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">
                        {edu.startYear} -{" "}
                        {edu.current ? "Present" : edu.endYear}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No education added yet.</p>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-teal-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-3"></div>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.jobSeekerProfile?.contactInfo?.phone && (
                  <p className="flex items-center text-gray-700 bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg">
                    <Phone className="w-4 h-4 mr-2 text-teal-600" />
                    {user.jobSeekerProfile.contactInfo.phone}
                  </p>
                )}
                {user.jobSeekerProfile?.contactInfo?.address && (
                  <p className="flex items-center text-gray-700 bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg">
                    <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                    {user.jobSeekerProfile.contactInfo.address}
                  </p>
                )}
                {user.jobSeekerProfile?.contactInfo?.city && (
                  <p className="text-gray-700 bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg">
                    <span className="font-medium text-teal-700">City:</span> {user.jobSeekerProfile.contactInfo.city}
                  </p>
                )}
                {user.jobSeekerProfile?.contactInfo?.country && (
                  <p className="text-gray-700 bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg">
                    <span className="font-medium text-teal-700">Country:</span> {user.jobSeekerProfile.contactInfo.country}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Employer Profile */}
        {user.role === "employer" && (
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-teal-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-3"></div>
                Company Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  {user.employerProfile?.company?.logo ? (
                    <img
                      src={user.employerProfile.company.logo}
                      alt="Company Logo"
                      className="w-16 h-16 rounded-lg object-cover border-2 border-teal-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-teal-100 to-cyan-100 flex items-center justify-center border-2 border-teal-200">
                      <Building className="w-8 h-8 text-teal-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg flex items-center text-gray-900">
                      <Building className="w-5 h-5 mr-2 text-teal-600" />
                      {user.employerProfile?.company?.name || "Company name not set"}
                    </h3>
                    {user.employerProfile?.company?.website && (
                      <p className="flex items-center text-gray-600 mt-1">
                        <Globe className="w-4 h-4 mr-2 text-teal-600" />
                        <a
                          href={user.employerProfile.company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-teal-800 hover:underline font-medium"
                        >
                          {user.employerProfile.company.website}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
                
                {user.employerProfile?.company?.description && (
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg">
                    <h4 className="font-medium text-teal-800 mb-2">Company Description</h4>
                    <p className="text-gray-700">{user.employerProfile.company.description}</p>
                  </div>
                )}

                {/* Company Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.employerProfile?.company?.contactEmail && (
                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg">
                      <p className="flex items-center text-gray-700">
                        <Mail className="w-4 h-4 mr-2 text-teal-600" />
                        <span className="font-medium text-teal-700 mr-2">Company Email:</span>
                        {user.employerProfile.company.contactEmail}
                      </p>
                    </div>
                  )}
                  {user.employerProfile?.company?.contactPhone && (
                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg">
                      <p className="flex items-center text-gray-700">
                        <Phone className="w-4 h-4 mr-2 text-teal-600" />
                        <span className="font-medium text-teal-700 mr-2">Company Phone:</span>
                        {user.employerProfile.company.contactPhone}
                      </p>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                {(user.employerProfile?.company?.facebook || user.employerProfile?.company?.linkedin) && (
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg">
                    <h4 className="font-medium text-teal-800 mb-3">Social Links</h4>
                    <div className="flex space-x-4">
                      {user.employerProfile?.company?.facebook && (
                        <a
                          href={user.employerProfile.company.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800 bg-white px-3 py-2 rounded-lg shadow-sm transition-colors"
                        >
                          <Facebook className="w-5 h-5 mr-2" />
                          Facebook
                        </a>
                      )}
                      {user.employerProfile?.company?.linkedin && (
                        <a
                          href={user.employerProfile.company.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-700 hover:text-blue-900 bg-white px-3 py-2 rounded-lg shadow-sm transition-colors"
                        >
                          <Linkedin className="w-5 h-5 mr-2" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-teal-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-3"></div>
                Personal Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.employerProfile?.contactInfo?.phone && (
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg">
                    <p className="flex items-center text-gray-700">
                      <Phone className="w-4 h-4 mr-2 text-teal-600" />
                      <span className="font-medium text-teal-700 mr-2">Personal Phone:</span>
                      {user.employerProfile.contactInfo.phone}
                    </p>
                  </div>
                )}
                {user.employerProfile?.contactInfo?.address && (
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg">
                    <p className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                      <span className="font-medium text-teal-700 mr-2">Address:</span>
                      {user.employerProfile.contactInfo.address}
                    </p>
                  </div>
                )}
                {user.employerProfile?.contactInfo?.city && (
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg">
                    <p className="text-gray-700">
                      <span className="font-medium text-teal-700">City:</span> {user.employerProfile.contactInfo.city}
                    </p>
                  </div>
                )}
                {user.employerProfile?.contactInfo?.country && (
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg">
                    <p className="text-gray-700">
                      <span className="font-medium text-teal-700">Country:</span> {user.employerProfile.contactInfo.country}
                    </p>
                  </div>
                )}
              </div>
              
              {!user.employerProfile?.contactInfo?.phone && 
               !user.employerProfile?.contactInfo?.address && 
               !user.employerProfile?.contactInfo?.city && 
               !user.employerProfile?.contactInfo?.country && (
                <p className="text-gray-500 text-center py-4">No personal contact information added yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto w-full border border-teal-200">
              <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                  disabled={isUpdating || photoUploading}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {updateError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    {updateError}
                  </div>
                )}

                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-2"></div>
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-teal-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editFormData.name || ""}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-teal-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editFormData.email || ""}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-teal-700 mb-1">
                      Profile Photo
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        {editFormData.photo ? (
                          <img
                            src={editFormData.photo}
                            alt="Profile Preview"
                            className="w-16 h-16 rounded-full object-cover border-2 border-teal-200"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center border-2 border-teal-200">
                            <User className="w-8 h-8 text-white" />
                          </div>
                        )}
                        {photoUploading && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={handleProfilePhotoChange}
                          disabled={photoUploading}
                          className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <p className="text-sm text-teal-600 mt-1">
                          JPG, PNG up to 2MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Seeker Fields */}
                {user.role === "jobseeker" && (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-2"></div>
                        Professional Information
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-teal-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          rows={4}
                          value={editFormData.jobSeekerProfile?.bio || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "jobSeekerProfile.bio",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-teal-700 mb-1">
                          Skills (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={
                            editFormData.jobSeekerProfile?.skills?.join(", ") ||
                            ""
                          }
                          onChange={(e) => handleSkillsChange(e.target.value)}
                          className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="JavaScript, React, Node.js, etc."
                        />
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-2"></div>
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={
                              editFormData.jobSeekerProfile?.contactInfo
                                ?.phone || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "jobSeekerProfile.contactInfo.phone",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            value={
                              editFormData.jobSeekerProfile?.contactInfo
                                ?.address || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "jobSeekerProfile.contactInfo.address",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            value={
                              editFormData.jobSeekerProfile?.contactInfo
                                ?.city || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "jobSeekerProfile.contactInfo.city",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            Country
                          </label>
                          <input
                            type="text"
                            value={
                              editFormData.jobSeekerProfile?.contactInfo
                                ?.country || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "jobSeekerProfile.contactInfo.country",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-2"></div>
                          Experience
                        </h3>
                        <button
                          onClick={addExperience}
                          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-3 py-1 rounded-lg flex items-center space-x-1 text-sm transition-all duration-200"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Experience</span>
                        </button>
                      </div>
                      {editFormData.jobSeekerProfile?.experience?.map(
                        (exp, index) => (
                          <div
                            key={index}
                            className="border border-teal-200 rounded-lg p-4 space-y-3 bg-gradient-to-r from-teal-50 to-cyan-50"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-teal-800">
                                Experience {index + 1}
                              </h4>
                              <button
                                onClick={() => removeExperience(index)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="Job Title"
                                value={exp.title || ""}
                                onChange={(e) =>
                                  updateExperience(
                                    index,
                                    "title",
                                    e.target.value
                                  )
                                }
                                className="px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                              />
                              <input
                                type="text"
                                placeholder="Company"
                                value={exp.company || ""}
                                onChange={(e) =>
                                  updateExperience(
                                    index,
                                    "company",
                                    e.target.value
                                  )
                                }
                                className="px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                              />
                              <input
                                type="date"
                                placeholder="Start Date"
                                value={
                                  exp.startDate
                                    ? exp.startDate.split("T")[0]
                                    : ""
                                }
                                onChange={(e) =>
                                  updateExperience(
                                    index,
                                    "startDate",
                                    e.target.value
                                  )
                                }
                                className="px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                              />
                              {!exp.current && (
                                <input
                                  type="date"
                                  placeholder="End Date"
                                  value={
                                    exp.endDate ? exp.endDate.split("T")[0] : ""
                                  }
                                  onChange={(e) =>
                                    updateExperience(
                                      index,
                                      "endDate",
                                      e.target.value
                                    )
                                  }
                                  className="px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                                />
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={exp.current || false}
                                onChange={(e) =>
                                  updateExperience(
                                    index,
                                    "current",
                                    e.target.checked
                                  )
                                }
                                className="rounded text-teal-600 focus:ring-teal-500"
                              />
                              <label className="text-sm text-teal-700 font-medium">
                                Currently working here
                              </label>
                            </div>
                            <textarea
                              placeholder="Job Description"
                              value={exp.description || ""}
                              onChange={(e) =>
                                updateExperience(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                            />
                          </div>
                        )
                      )}
                    </div>

                    {/* Education */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-2"></div>
                          Education
                        </h3>
                        <button
                          onClick={addEducation}
                          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-3 py-1 rounded-lg flex items-center space-x-1 text-sm transition-all duration-200"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Education</span>
                        </button>
                      </div>
                      {editFormData.jobSeekerProfile?.education?.map(
                        (edu, index) => (
                          <div
                            key={index}
                            className="border border-teal-200 rounded-lg p-4 space-y-3 bg-gradient-to-r from-emerald-50 to-teal-50"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-emerald-800">
                                Education {index + 1}
                              </h4>
                              <button
                                onClick={() => removeEducation(index)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="Degree"
                                value={edu.degree || ""}
                                onChange={(e) =>
                                  updateEducation(
                                    index,
                                    "degree",
                                    e.target.value
                                  )
                                }
                                className="px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                              />
                              <input
                                type="text"
                                placeholder="Institution"
                                value={edu.institution || ""}
                                onChange={(e) =>
                                  updateEducation(
                                    index,
                                    "institution",
                                    e.target.value
                                  )
                                }
                                className="px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                              />
                              <input
                                type="text"
                                placeholder="Field of Study"
                                value={edu.fieldOfStudy || ""}
                                onChange={(e) =>
                                  updateEducation(
                                    index,
                                    "fieldOfStudy",
                                    e.target.value
                                  )
                                }
                                className="px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                              />
                              <input
                                type="number"
                                placeholder="Start Year"
                                value={edu.startYear || ""}
                                onChange={(e) =>
                                  updateEducation(
                                    index,
                                    "startYear",
                                    e.target.value
                                  )
                                }
                                className="px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                              />
                              {!edu.current && (
                                <input
                                  type="number"
                                  placeholder="End Year"
                                  value={edu.endYear || ""}
                                  onChange={(e) =>
                                    updateEducation(
                                      index,
                                      "endYear",
                                      e.target.value
                                    )
                                  }
                                  className="px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                                />
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={edu.current || false}
                                onChange={(e) =>
                                  updateEducation(
                                    index,
                                    "current",
                                    e.target.checked
                                  )
                                }
                                className="rounded text-teal-600 focus:ring-teal-500"
                              />
                              <label className="text-sm text-emerald-700 font-medium">
                                Currently studying here
                              </label>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}

                {/* Employer Fields */}
                {user.role === "employer" && (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-2"></div>
                        Company Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={
                              editFormData.employerProfile?.company?.name || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "employerProfile.company.name",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            Website
                          </label>
                          <input
                            type="url"
                            value={
                              editFormData.employerProfile?.company?.website ||
                              ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "employerProfile.company.website",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-teal-700 mb-1">
                          Company Logo
                        </label>
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            {editFormData.employerProfile?.company?.logo ? (
                              <img
                                src={editFormData.employerProfile.company.logo}
                                alt="Logo Preview"
                                className="w-16 h-16 rounded-lg object-cover border-2 border-teal-200"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-teal-100 to-cyan-100 flex items-center justify-center border-2 border-teal-200">
                                <Building className="w-8 h-8 text-teal-600" />
                              </div>
                            )}
                            {photoUploading && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/jpg"
                              onChange={handleCompanyLogoChange}
                              disabled={photoUploading}
                              className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <p className="text-sm text-teal-600 mt-1">
                              JPG, PNG up to 2MB
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-teal-700 mb-1">
                          Company Description
                        </label>
                        <textarea
                          rows={4}
                          value={
                            editFormData.employerProfile?.company
                              ?.description || ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              "employerProfile.company.description",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Tell us about your company..."
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            Facebook URL
                          </label>
                          <input
                            type="url"
                            value={
                              editFormData.employerProfile?.company?.facebook ||
                              ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "employerProfile.company.facebook",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            LinkedIn URL
                          </label>
                          <input
                            type="url"
                            value={
                              editFormData.employerProfile?.company?.linkedin ||
                              ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "employerProfile.company.linkedin",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            Contact Email
                          </label>
                          <input
                            type="email"
                            value={
                              editFormData.employerProfile?.company
                                ?.contactEmail || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "employerProfile.company.contactEmail",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            Contact Phone
                          </label>
                          <input
                            type="tel"
                            value={
                              editFormData.employerProfile?.company
                                ?.contactPhone || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "employerProfile.company.contactPhone",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Employer Contact Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-2"></div>
                        Personal Contact Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={
                              editFormData.employerProfile?.contactInfo
                                ?.phone || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "employerProfile.contactInfo.phone",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            value={
                              editFormData.employerProfile?.contactInfo
                                ?.address || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "employerProfile.contactInfo.address",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            value={
                              editFormData.employerProfile?.contactInfo?.city ||
                              ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "employerProfile.contactInfo.city",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-teal-700 mb-1">
                            Country
                          </label>
                          <input
                            type="text"
                            value={
                              editFormData.employerProfile?.contactInfo
                                ?.country || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                "employerProfile.contactInfo.country",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white border-t border-teal-200 pt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    disabled={isUpdating || photoUploading}
                    className="px-6 py-2 border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 disabled:opacity-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    disabled={isUpdating || photoUploading}
                    className="px-6 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 flex items-center space-x-2 disabled:opacity-50 transition-all duration-200 shadow-md"
                  >
                    {isUpdating || photoUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>
                          {photoUploading ? "Uploading..." : "Updating..."}
                        </span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;