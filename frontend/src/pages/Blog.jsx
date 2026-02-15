import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { mockBlogs } from '../mockData';
import { Calendar, Clock, User, ArrowRight, Search, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const categories = ['All', 'Astrology Basics', 'Weekly Horoscope', 'Planetary Movements', 'Remedies'];

  const filteredBlogs = mockBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubscribing(true);

    try {
      await axios.post(`${API}/newsletter`, { email: newsletterEmail });
      toast.success('Successfully subscribed to newsletter!');
      setNewsletterEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      if (error.response?.data?.message === 'Already subscribed') {
        toast.info('You are already subscribed to our newsletter');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515942661900-94b3d1972591"
            alt="Blog Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Astrological Insights & Wisdom</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
              Astrology Blog
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore articles on astrology, planetary movements, remedies, and cosmic wisdom
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-y border-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className={selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                      : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredBlogs.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">Featured Article</h2>
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-80 md:h-auto overflow-hidden">
                    <img
                      src={filteredBlogs[0].image}
                      alt={filteredBlogs[0].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full mb-4 w-fit">
                      {filteredBlogs[0].category}
                    </div>
                    <h3 className="text-3xl font-bold text-purple-900 mb-4">
                      {filteredBlogs[0].title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {filteredBlogs[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{filteredBlogs[0].author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(filteredBlogs[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{filteredBlogs[0].readTime}</span>
                      </div>
                    </div>
                    <Link to={`/blog/${filteredBlogs[0].id}`}>
                      <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                        Read Full Article
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-purple-900 mb-6">Latest Articles</h2>
            
            {filteredBlogs.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredBlogs.slice(1).map((blog) => (
                  <Card
                    key={blog.id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-700 text-xs font-semibold rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-purple-900 mb-3 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                      <Link to={`/blog/${blog.id}`}>
                        <Button
                          variant="ghost"
                          className="text-purple-700 hover:text-purple-900 p-0 hover:bg-transparent group/btn"
                        >
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-gray-600 text-lg">No articles found matching your search.</p>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-purple-100 mb-8">
              Get weekly horoscopes, astrological insights, and remedies delivered to your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <Button 
                type="submit"
                disabled={subscribing}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 shadow-lg disabled:opacity-50"
              >
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            <p className="text-sm text-purple-200 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
