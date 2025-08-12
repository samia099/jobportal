import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, Globe, Facebook, Linkedin, Users, Building2, Filter, Grid3X3, List } from 'lucide-react';

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Sample companies data based on your schema
  const companiesData = [
    {
      _id: '1',
      name: 'Tech Solutions BD',
      employerProfile: {
        company: {
          website: 'https://techsolutions.com.bd',
          description: 'Leading software development company in Bangladesh specializing in web and mobile applications. We work with cutting-edge technologies to deliver innovative solutions for businesses across various industries.',
          facebook: 'https://facebook.com/techsolutionsbd',
          linkedin: 'https://linkedin.com/company/techsolutionsbd',
          contactEmail: 'hr@techsolutions.com.bd',
          contactPhone: '+880 1700-123456'
        },
        contactInfo: {
          phone: '+880 2-9876543',
          address: 'House 45, Road 12, Sector 7',
          city: 'Dhaka',
          country: 'Bangladesh'
        }
      },
      photo: null,
      createdAt: '2024-01-15'
    },
    {
      _id: '2',
      name: 'Green Valley Textiles',
      employerProfile: {
        company: {
          website: 'https://greenvalleytextiles.com',
          description: 'Sustainable textile manufacturing company with 20+ years of experience. We focus on eco-friendly production methods and export quality garments to international markets.',
          facebook: 'https://facebook.com/greenvalleytextiles',
          linkedin: 'https://linkedin.com/company/greenvalleytextiles',
          contactEmail: 'careers@greenvalleytextiles.com',
          contactPhone: '+880 1800-234567'
        },
        contactInfo: {
          phone: '+880 31-456789',
          address: 'Industrial Area, EPZ',
          city: 'Chattogram',
          country: 'Bangladesh'
        }
      },
      photo: null,
      createdAt: '2024-02-10'
    },
    {
      _id: '3',
      name: 'Digital Marketing Pro',
      employerProfile: {
        company: {
          website: 'https://digitalmarketingpro.bd',
          description: 'Full-service digital marketing agency helping businesses grow their online presence. We specialize in SEO, social media marketing, and content creation.',
          facebook: 'https://facebook.com/digitalmarketingprobd',
          linkedin: 'https://linkedin.com/company/digitalmarketingpro',
          contactEmail: 'hello@digitalmarketingpro.bd',
          contactPhone: '+880 1900-345678'
        },
        contactInfo: {
          phone: '+880 2-8765432',
          address: 'Level 5, Building 23, Gulshan Avenue',
          city: 'Dhaka',
          country: 'Bangladesh'
        }
      },
      photo: null,
      createdAt: '2024-01-28'
    },
    {
      _id: '4',
      name: 'Fresh Foods Ltd',
      employerProfile: {
        company: {
          website: 'https://freshfoods.com.bd',
          description: 'Premium food processing and distribution company serving fresh and healthy products across Bangladesh. We maintain the highest quality standards in food safety.',
          facebook: 'https://facebook.com/freshfoodsbd',
          linkedin: 'https://linkedin.com/company/freshfoods',
          contactEmail: 'hr@freshfoods.com.bd',
          contactPhone: '+880 1600-456789'
        },
        contactInfo: {
          phone: '+880 2-7654321',
          address: 'Food Park, Savar',
          city: 'Dhaka',
          country: 'Bangladesh'
        }
      },
      photo: null,
      createdAt: '2024-03-05'
    },
    {
      _id: '5',
      name: 'Coastal Engineering',
      employerProfile: {
        company: {
          website: 'https://coastalengineering.bd',
          description: 'Civil engineering and construction company specializing in coastal and marine infrastructure projects. We have completed numerous prestigious projects across the country.',
          facebook: 'https://facebook.com/coastalengineeringbd',
          linkedin: 'https://linkedin.com/company/coastalengineering',
          contactEmail: 'recruitment@coastalengineering.bd',
          contactPhone: '+880 1500-567890'
        },
        contactInfo: {
          phone: '+880 31-987654',
          address: 'Port City Complex, GEC Circle',
          city: 'Chattogram',
          country: 'Bangladesh'
        }
      },
      photo: null,
      createdAt: '2024-02-20'
    },
    {
      _id: '6',
      name: 'FinTech Innovations',
      employerProfile: {
        company: {
          website: 'https://fintechinnovations.bd',
          description: 'Revolutionary financial technology company developing digital payment solutions and banking software. We are transforming the financial landscape of Bangladesh.',
          facebook: 'https://facebook.com/fintechinnovationsbd',
          linkedin: 'https://linkedin.com/company/fintechinnovations',
          contactEmail: 'careers@fintechinnovations.bd',
          contactPhone: '+880 1400-678901'
        },
        contactInfo: {
          phone: '+880 2-6543210',
          address: 'Tower 12, Banani Commercial Area',
          city: 'Dhaka',
          country: 'Bangladesh'
        }
      },
      photo: null,
      createdAt: '2024-01-08'
    }
  ];

  // Get unique cities for filter
  const cities = [...new Set(companiesData.map(company => company.employerProfile.contactInfo.city))];

  // Filter companies based on search and city
  const filteredCompanies = companiesData.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.employerProfile.company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || company.employerProfile.contactInfo.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const CompanyCard = ({ company }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{company.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{company.employerProfile.contactInfo.city}, {company.employerProfile.contactInfo.country}</span>
          </div>
        </div>
        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
          <Building2 className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {company.employerProfile.company.description}
      </p>

      <div className="space-y-2 mb-4">
        {company.employerProfile.company.contactEmail && (
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            <span>{company.employerProfile.company.contactEmail}</span>
          </div>
        )}
        {company.employerProfile.company.contactPhone && (
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            <span>{company.employerProfile.company.contactPhone}</span>
          </div>
        )}
        {company.employerProfile.company.website && (
          <div className="flex items-center text-sm text-gray-600">
            <Globe className="h-4 w-4 mr-2" />
            <a href={company.employerProfile.company.website} className="text-blue-600 hover:underline">
              Visit Website
            </a>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {company.employerProfile.company.facebook && (
            <a href={company.employerProfile.company.facebook} className="text-blue-600 hover:text-blue-700">
              <Facebook className="h-5 w-5" />
            </a>
          )}
          {company.employerProfile.company.linkedin && (
            <a href={company.employerProfile.company.linkedin} className="text-blue-600 hover:text-blue-700">
              <Linkedin className="h-5 w-5" />
            </a>
          )}
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );

  const CompanyListItem = ({ company }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Building2 className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-800">{company.name}</h3>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
              View Details
            </button>
          </div>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{company.employerProfile.contactInfo.city}, {company.employerProfile.contactInfo.country}</span>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {company.employerProfile.company.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {company.employerProfile.company.contactEmail && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>{company.employerProfile.company.contactEmail}</span>
                </div>
              )}
              {company.employerProfile.company.website && (
                <a href={company.employerProfile.company.website} className="flex items-center text-blue-600 hover:underline">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>Website</span>
                </a>
              )}
            </div>
            <div className="flex space-x-2">
              {company.employerProfile.company.facebook && (
                <a href={company.employerProfile.company.facebook} className="text-blue-600 hover:text-blue-700">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {company.employerProfile.company.linkedin && (
                <a href={company.employerProfile.company.linkedin} className="text-blue-600 hover:text-blue-700">
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Companies Directory</h1>
            <p className="text-xl text-blue-100">
              Discover leading employers and career opportunities across Bangladesh
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="container mx-auto px-6 py-4">
        <p className="text-gray-600">
          Showing {filteredCompanies.length} companies
          {selectedCity !== 'all' && ` in ${selectedCity}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Companies Grid/List */}
      <div className="container mx-auto px-6 pb-12">
        {filteredCompanies.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredCompanies.map(company => (
              viewMode === 'grid' ? (
                <CompanyCard key={company._id} company={company} />
              ) : (
                <CompanyListItem key={company._id} company={company} />
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No companies found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedCity !== 'all' 
                ? "Try adjusting your search criteria" 
                : "Companies will appear here once employers register"
              }
            </p>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{companiesData.length}</div>
              <div className="text-blue-200">Total Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">{cities.length}</div>
              <div className="text-blue-200">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Active Job Posts</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-blue-200">Job Applications</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;