// frontend/src/components/ContactSection.tsx
import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Github, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner'; // For feedback

export function ContactSection() {
  // Example Team Data (Replace with actual data or fetch from API)
  const developers = [
    { name: 'John Smith', role: 'Lead Developer', image: '/images/placeholder-dev1.jpg', linkedin: '#', github: '#' },
    { name: 'Sarah Johnson', role: 'AI Engineer', image: '/images/placeholder-dev2.jpg', linkedin: '#', github: '#' },
    { name: 'Michael Chen', role: 'Frontend Developer', image: '/images/placeholder-dev3.jpg', linkedin: '#', github: '#' }
  ];
    // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // ** Simulate form submission **
    // In a real app, you'd send this data to your backend or a form service (e.g., Formspree, Netlify Forms)
    console.log("Form Data Submitted:", formData);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    // Example: Using fetch to send to a backend endpoint (replace with your actual endpoint)
    /*
    try {
      const response = await fetch('/api/contact', { // Replace with your actual API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      toast.success("Message Sent!", { description: "We'll get back to you soon." });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("Submission Failed", { description: "Please try again later or use another contact method." });
    } finally {
      setIsSubmitting(false);
    }
    */

    // Mock success:
    toast.success("Message Sent!", { description: "We'll get back to you soon (Simulated)." });
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    setIsSubmitting(false);
  };


  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-950 via-gray-900/80 to-gray-950">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Connect With Us
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions, feedback, or need assistance? We're here to help.
          </p>
        </div>

        {/* Meet the Team Section (Optional) */}
        {/* Uncomment and replace placeholder data if needed
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-10 text-center text-white">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {developers.map(dev => (
              <div key={dev.name} className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <img src={dev.image} alt={dev.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-emerald-500/50" />
                </div>
                <h4 className="text-xl font-semibold mb-1 text-white">{dev.name}</h4>
                <p className="text-emerald-400 mb-3 text-sm">{dev.role}</p>
                <div className="flex justify-center space-x-4">
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition text-sm">LinkedIn</a>
                  <a href={dev.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-sm">GitHub</a>
                </div>
              </div>
            ))}
          </div>
        </div>
         */}


        {/* Contact Form and Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800 p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h3>
            <form onSubmit={handleFormSubmit}>
              {/* Name Input */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleInputChange} required
                       className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                       placeholder="Your name" />
              </div>
              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input type="email" id="email" value={formData.email} onChange={handleInputChange} required
                       className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                       placeholder="your.email@example.com" />
              </div>
              {/* Subject Input */}
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                <input type="text" id="subject" value={formData.subject} onChange={handleInputChange} required
                       className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                       placeholder="How can we help?" />
              </div>
              {/* Message Textarea */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea id="message" rows={4} value={formData.message} onChange={handleInputChange} required
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 resize-none"
                          placeholder="Your message..."></textarea>
              </div>
              {/* Submit Button */}
              <button type="submit" disabled={isSubmitting}
                      className="w-full flex items-center justify-center bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out shadow-md disabled:opacity-60 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information & Community */}
          <div className="flex flex-col space-y-8">
            {/* Contact Info Block */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800 p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start">
                  <div className="bg-emerald-900/30 p-3 rounded-full mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200">Email</h4>
                    <a href="mailto:contact@deepfakedetector.ai" className="text-gray-300 hover:text-emerald-400 transition duration-200 break-all">contact@deepfakedetector.ai</a>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start">
                  <div className="bg-blue-900/30 p-3 rounded-full mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200">Phone</h4>
                    <a href="tel:+15551234567" className="text-gray-300 hover:text-blue-400 transition duration-200">+1 (555) 123-4567</a>
                  </div>
                </div>
                {/* Address */}
                <div className="flex items-start">
                  <div className="bg-purple-900/30 p-3 rounded-full mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200">Address</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      123 AI Research Ave<br />Innovation District, CA 94107<br />United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Block (Example) */}
            <div className="bg-gradient-to-r from-emerald-900/10 via-gray-900/20 to-blue-900/10 rounded-xl border border-gray-800 p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-white">Join Our Community</h3>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                Stay updated on the latest in deepfake detection technology and connect with others interested in media authenticity.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="flex-1 bg-blue-600/80 hover:bg-blue-700/90 text-white p-2.5 rounded-lg flex items-center justify-center text-sm font-medium transition duration-200" onClick={() => toast.info("Community Forum coming soon!")}>
                  <MessageSquare size={18} className="mr-2" /> Forum
                </button>
                <button className="flex-1 bg-gray-700/80 hover:bg-gray-600/90 text-white p-2.5 rounded-lg flex items-center justify-center text-sm font-medium transition duration-200" onClick={() => toast.info("Newsletter signup coming soon!")}>
                  <Mail size={18} className="mr-2" /> Newsletter
                </button>
              </div>
            </div>
          </div>
        </div>

         {/* GitHub Project Link */}
         <div className="bg-gradient-to-r from-gray-900 via-gray-800/80 to-gray-900 rounded-xl border border-gray-700 p-8 mt-16 text-center md:text-left">
             <div className="md:flex md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center justify-center md:justify-start text-white">
                    <Github className="mr-2 h-5 w-5" /> Follow Our Project
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 md:mb-0">
                    Stay up to date with our latest developments and contribute to our open-source efforts (if applicable).
                  </p>
                </div>
                 <a href="https://github.com/your-github-username/deepfake-detector-repo" // <-- REPLACE with your actual GitHub link
                   target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center px-6 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition duration-200 text-sm shadow-md">
                    <Github className="mr-2 h-4 w-4" /> View on GitHub
                 </a>
             </div>
        </div>
      </div>
    </section>
  );
}