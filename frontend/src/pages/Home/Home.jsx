import { Search, MapPin, Briefcase, Users, Building, CheckCircle, Star, Menu, X, User, Bell, Settings, LogOut, Eye, EyeOff, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('jobs');

  const features = [
    {
      icon: <Zap className="h-10 w-10 text-blue-600" />,
      title: "Lightning Fast Search",
      description: "AI-powered job matching that finds perfect opportunities in seconds, not hours.",
      color: "bg-blue-50"
    },
    {
      icon: <Target className="h-10 w-10 text-teal-600" />,
      title: "Precision Targeting",
      description: "Smart filters that understand your career goals and match you with ideal positions.",
      color: "bg-teal-50"
    },
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: "Direct Connect",
      description: "Skip the middleman - connect directly with decision makers and hiring teams.",
      color: "bg-blue-50"
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-teal-600" />,
      title: "Career Intelligence",
      description: "Market insights and salary data to negotiate better offers and plan your growth.",
      color: "bg-teal-50"
    }
  ];

  const stats = [
    { number: "50K+", label: "Live Opportunities", color: "text-blue-600" },
    { number: "25K+", label: "Partner Companies", color: "text-teal-600" },
    { number: "100K+", label: "Success Stories", color: "text-blue-600" },
    { number: "95%", label: "Match Rate", color: "text-teal-600" }
  ];

  const jobCategories = [
    { name: "Technology", count: "12,450", color: "bg-blue-600" },
    { name: "Marketing", count: "8,230", color: "bg-teal-600" },
    { name: "Design", count: "5,670", color: "bg-blue-600" },
    { name: "Sales", count: "9,120", color: "bg-teal-600" },
    { name: "Finance", count: "6,890", color: "bg-blue-600" },
    { name: "Healthcare", count: "4,560", color: "bg-teal-600" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Unique Hero Section with Split Layout */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="h-4 w-4 mr-2" />
                #1 Job Platform of 2025
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Your Career,
                <br />
                <span className="text-blue-600">Amplified</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Stop scrolling through endless job boards. Our intelligent platform 
                learns what you want and delivers opportunities that actually matter.
              </p>

              {/* Unique Search Interface */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-xl mb-8">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === 'jobs' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Find Jobs
                  </button>
                  <button
                    onClick={() => setActiveTab('companies')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === 'companies' ? 'bg-teal-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Explore Companies
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder={activeTab === 'jobs' ? "Software Engineer, Product Manager..." : "Google, Microsoft, Startup..."}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="San Francisco, Remote..."
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all font-medium flex items-center gap-2">
                      Search
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Access Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-500 text-sm">Quick search:</span>
                {['Remote Work', 'Senior Level', '$100k+', 'Startup'].map((tag, index) => (
                  <button
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm font-medium border-2 transition-all hover:scale-105 ${
                      index % 2 === 0 
                        ? 'border-blue-200 text-blue-600 hover:bg-blue-50' 
                        : 'border-teal-200 text-teal-600 hover:bg-teal-50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Visual - Job Categories Grid */}
            <div className="relative">
              <div className="bg-gray-50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Explore by Category
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {jobCategories.map((category, index) => (
                    <div
                      key={category.name}
                      className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1"
                    >
                      <div className={`w-12 h-12 ${category.color} rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{category.name}</h4>
                      <p className="text-sm text-gray-500">{category.count} jobs</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">2,847</p>
                    <p className="text-sm text-gray-500">Hired this week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Stats Bar */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className={`text-4xl md:text-5xl font-black mb-2 ${stat.color} group-hover:scale-110 transition-transform`}>
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features Section with Alternating Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Built Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We didn't just build another job board. We reimagined how careers should be discovered.
            </p>
          </div>

          <div className="space-y-24">
            {features.map((feature, index) => (
              <div key={index} className={`flex items-center gap-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className={`inline-flex items-center justify-center w-20 h-20 ${feature.color} rounded-2xl mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-xl text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
                <div className="flex-1">
                  <div className={`h-80 ${feature.color} rounded-3xl flex items-center justify-center`}>
                    <div className="text-6xl opacity-20">
                      {feature.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bold CTA Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Stop Looking.
            <br />
            <span className="text-teal-400">Start Finding.</span>
          </h2>
          <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
            Your dream job isn't hiding - it's waiting for you to discover it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-blue-600 text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-blue-700 transition-all hover:scale-105 flex items-center gap-3">
              Start Your Search
              <ArrowRight className="h-6 w-6" />
            </button>
            <button className="bg-transparent border-3 border-teal-400 text-teal-400 px-12 py-6 rounded-2xl text-xl font-bold hover:bg-teal-400 hover:text-gray-900 transition-all">
              For Employers
            </button>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-teal-400 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-600 rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-20 h-20 bg-teal-400 rounded-full"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;