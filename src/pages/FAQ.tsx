import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Shield, CreditCard, BarChart3, Smartphone, Globe, Zap } from 'lucide-react';
import './FAQ.css';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
}

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const faqData: FAQItem[] = [
    // Getting Started
    {
      id: 'gs1',
      category: 'getting-started',
      question: 'How do I create my first QR code?',
      answer: 'Creating your first QR code is simple! Just sign up for a free account, enter the URL or text you want to encode, customize the appearance if desired, and click "Generate QR Code". Your QR code will be ready for download immediately.',
      keywords: ['create', 'first', 'generate', 'new', 'start']
    },
    {
      id: 'gs2',
      category: 'getting-started',
      question: 'What file formats can I download?',
      answer: 'You can download QR codes in multiple formats including PNG, SVG, and PDF. PNG is perfect for digital use, SVG for scalable graphics, and PDF for print materials. All formats maintain high quality at any size.',
      keywords: ['download', 'format', 'png', 'svg', 'pdf', 'file']
    },
    {
      id: 'gs3',
      category: 'getting-started',
      question: 'Can I customize the appearance of my QR codes?',
      answer: 'Yes! Pro and Business plans include customization options like custom colors, logo embedding, different patterns, and various corner styles. You can match your QR codes to your brand colors and style.',
      keywords: ['customize', 'colors', 'logo', 'brand', 'appearance', 'design']
    },
    
    // Plans and Pricing
    {
      id: 'pp1',
      category: 'pricing',
      question: 'What\'s included in the free plan?',
      answer: 'The free plan includes up to 5 QR codes, basic tracking, PNG downloads, and community support. It\'s perfect for personal use and testing our platform before upgrading.',
      keywords: ['free', 'plan', 'included', 'limit', 'basic']
    },
    {
      id: 'pp2',
      category: 'pricing',
      question: 'Can I change plans at any time?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate your billing accordingly. Your existing QR codes and data remain intact.',
      keywords: ['change', 'upgrade', 'downgrade', 'switch', 'plan']
    },
    {
      id: 'pp3',
      category: 'pricing',
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied with QRGen Pro, contact our support team within 30 days for a full refund.',
      keywords: ['refund', 'money-back', 'guarantee', 'cancel', 'return']
    },
    {
      id: 'pp4',
      category: 'pricing',
      question: 'What happens if I exceed my plan limit?',
      answer: 'If you reach your plan\'s QR code limit, you\'ll be prompted to upgrade to continue creating new codes. Your existing QR codes will continue to work normally, and you won\'t lose any data.',
      keywords: ['limit', 'exceed', 'over', 'upgrade', 'more']
    },
    
    // Analytics and Tracking
    {
      id: 'at1',
      category: 'analytics',
      question: 'What analytics data do you provide?',
      answer: 'We provide comprehensive analytics including scan count, location data, device types, browsers, timestamps, and referrer information. Pro and Business plans get additional insights like heat maps and conversion tracking.',
      keywords: ['analytics', 'data', 'tracking', 'scans', 'statistics']
    },
    {
      id: 'at2',
      category: 'analytics',
      question: 'How accurate is the location data?',
      answer: 'Our location data is based on IP geolocation and is accurate to the city level in most cases. We respect user privacy and don\'t collect precise GPS coordinates or personally identifiable information.',
      keywords: ['location', 'accuracy', 'geolocation', 'city', 'privacy']
    },
    {
      id: 'at3',
      category: 'analytics',
      question: 'Can I export my analytics data?',
      answer: 'Yes! Pro and Business plans include data export functionality. You can export your analytics data in CSV or PDF format for further analysis or reporting purposes.',
      keywords: ['export', 'data', 'csv', 'pdf', 'download', 'report']
    },
    
    // Technical Questions
    {
      id: 'tq1',
      category: 'technical',
      question: 'Do QR codes expire?',
      answer: 'No, QR codes generated with QRGen Pro never expire. As long as your account remains active and the destination URL is accessible, your QR codes will continue to work indefinitely.',
      keywords: ['expire', 'lifetime', 'permanent', 'forever', 'duration']
    },
    {
      id: 'tq2',
      category: 'technical',
      question: 'What happens if I delete my account?',
      answer: 'If you delete your account, your QR codes will stop redirecting after a 30-day grace period. We recommend downloading any important analytics data before account deletion.',
      keywords: ['delete', 'account', 'cancel', 'close', 'remove']
    },
    {
      id: 'tq3',
      category: 'technical',
      question: 'Can I use QR codes offline?',
      answer: 'QR codes themselves work offline and can be scanned without internet. However, if they redirect to a URL or track analytics, an internet connection is required for the full functionality.',
      keywords: ['offline', 'internet', 'connection', 'scan', 'work']
    },
    {
      id: 'tq4',
      category: 'technical',
      question: 'How do you ensure QR code security?',
      answer: 'We use HTTPS encryption, secure data centers, and regular security audits. We never store sensitive personal data and comply with GDPR and other privacy regulations.',
      keywords: ['security', 'safe', 'encryption', 'privacy', 'protection']
    },
    
    // Business Features
    {
      id: 'bf1',
      category: 'business',
      question: 'Do you offer API access?',
      answer: 'Yes! Business plan subscribers get full API access to programmatically generate QR codes, retrieve analytics, and manage their account. We provide comprehensive API documentation and SDKs.',
      keywords: ['api', 'integration', 'programmatic', 'developer', 'business']
    },
    {
      id: 'bf2',
      category: 'business',
      question: 'Can multiple team members access the same account?',
      answer: 'Business plans include team management features. You can invite team members, set permissions, and collaborate on QR code campaigns while maintaining centralized billing and analytics.',
      keywords: ['team', 'members', 'collaborate', 'share', 'permissions']
    },
    {
      id: 'bf3',
      category: 'business',
      question: 'Do you offer white-label solutions?',
      answer: 'Business plan subscribers can remove QRGen Pro branding and add their own. For complete white-label solutions, contact our enterprise team for custom pricing and features.',
      keywords: ['white-label', 'branding', 'custom', 'enterprise', 'remove']
    },
    
    // Support
    {
      id: 'sp1',
      category: 'support',
      question: 'How can I contact support?',
      answer: 'You can reach our support team via email at support@qrgen.pro or through the live chat in your dashboard. Pro and Business customers get priority support with faster response times.',
      keywords: ['support', 'contact', 'help', 'email', 'chat']
    },
    {
      id: 'sp2',
      category: 'support',
      question: 'What are your support hours?',
      answer: 'Email support is available 24/7. Live chat is available Monday-Friday 9 AM to 6 PM EST. Pro and Business customers receive responses within 4 hours during business hours.',
      keywords: ['hours', 'availability', 'response', 'time', 'when']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'getting-started', name: 'Getting Started', icon: Zap },
    { id: 'pricing', name: 'Plans & Pricing', icon: CreditCard },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'technical', name: 'Technical', icon: Smartphone },
    { id: 'business', name: 'Business Features', icon: Globe },
    { id: 'support', name: 'Support', icon: Shield }
  ];

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="faq">
      <div className="faq-hero">
        <div className="hero-content">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about QRGen Pro features, pricing, and technical details.</p>
        </div>
      </div>

      <div className="faq-content">
        <div className="faq-search">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="faq-categories">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon size={18} />
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="faq-list">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(item => (
              <div key={item.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleExpanded(item.id)}
                >
                  <span>{item.question}</span>
                  {expandedItems.includes(item.id) ? (
                    <ChevronUp className="chevron" />
                  ) : (
                    <ChevronDown className="chevron" />
                  )}
                </button>
                
                {expandedItems.includes(item.id) && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <HelpCircle size={64} className="no-results-icon" />
              <h3>No results found</h3>
              <p>Try adjusting your search terms or selecting a different category.</p>
            </div>
          )}
        </div>
      </div>

      <div className="faq-contact">
        <div className="contact-content">
          <h2>Still have questions?</h2>
          <p>Can't find what you're looking for? Our support team is here to help!</p>
          <div className="contact-buttons">
            <a href="/contact" className="contact-button primary">
              Contact Support
            </a>
            <a href="mailto:support@qrgen.pro" className="contact-button secondary">
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;