import { Award, Shield, Target, Users } from 'lucide-react';
import React from 'react';

const AboutPage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About BDJobBox</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Connecting talent with opportunity across Bangladesh's growing job market
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-mint-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Target className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              BDJobBox is dedicated to revolutionizing the job market in Bangladesh by creating 
              a seamless platform that connects talented job seekers with forward-thinking employers. 
              We believe in empowering careers and driving economic growth through efficient, 
              technology-driven recruitment solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose BDJobBox</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">For Job Seekers</h3>
              <p className="text-gray-600">
                Discover thousands of job opportunities, build your professional profile, 
                and connect with top employers across Bangladesh.
              </p>
            </div>
            <div className="text-center p-6 bg-mint-50 rounded-lg">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">For Employers</h3>
              <p className="text-gray-600">
                Access a vast pool of qualified candidates, streamline your hiring process, 
                and build your employer brand effectively.
              </p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Trusted Platform</h3>
              <p className="text-gray-600">
                Secure, reliable, and user-friendly platform with verified profiles 
                and comprehensive support for all users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-200">Active Job Seekers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-blue-200">Registered Employers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25,000+</div>
              <div className="text-blue-200">Jobs Posted</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <div className="text-blue-200">Successful Placements</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Values */}
      <div className="py-16 bg-mint-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Continuously improving our platform with cutting-edge technology 
                to provide the best user experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Integrity</h3>
              <p className="text-gray-600">
                Maintaining transparency and trust in all our interactions 
                with job seekers and employers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Excellence</h3>
              <p className="text-gray-600">
                Striving for the highest quality in our services and 
                supporting career growth for all users.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Community</h3>
              <p className="text-gray-600">
                Building a strong professional community that contributes 
                to Bangladesh's economic development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default AboutPage;