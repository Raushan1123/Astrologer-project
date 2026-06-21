import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogDetail = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API}/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Blog post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      }).catch(() => {
        // User cancelled share
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-purple-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 pt-20">
      <SEO
        title={`${blog.title} - Acharyaa Indira Pandey`}
        description={blog.excerpt}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>

          {/* Blog Header */}
          <Card className="overflow-hidden mb-8">
            <div className="relative h-96 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                  {blog.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blog.read_time}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Blog Content */}
          <Card className="p-8 md:p-12 mb-8">
            <div
              className="blog-content prose prose-lg max-w-none
                prose-headings:text-purple-900 prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-purple-700 prose-a:font-medium hover:prose-a:underline
                prose-strong:text-purple-900 prose-strong:font-semibold
                prose-ul:my-6 prose-li:my-2
                prose-blockquote:border-purple-600 prose-blockquote:bg-purple-50
                prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </Card>

          {/* Share Button */}
          <div className="flex justify-center mb-12">
            <Button onClick={handleShare} variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share this article
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

