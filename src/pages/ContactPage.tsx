import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { validateEmail } from '../utils/format';

export function ContactPage() {
  const { submitContactForm } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Product & Care Question');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (message.trim().length < 10) {
      setError('Please write a brief message (at least 10 characters).');
      return;
    }

    submitContactForm({
      name: name.trim(),
      email: email.trim(),
      topic,
      message: message.trim(),
    });
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="py-12 lg:py-16 bg-[#FAF7F2] min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-2 mb-10">
          <p className="text-xs font-semibold tracking-wider text-[#B8533A]">
            Contact Jaipur Block Studio
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231F1D]">
            We Would Love to Hear From You
          </h1>
          <p className="text-sm sm:text-base text-[#6B5E54]">
            Questions about cushion cover sizing, UK delivery timelines, fabric care, or styling combinations? Send our London desk a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white border border-[#E5DDD0] rounded-xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-[#1E3A5F] font-medium text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Message Received</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#231F1D]">
                  Thank You for Reaching Out
                </h2>
                <p className="text-sm text-[#6B5E54] leading-relaxed">
                  Your enquiry has been recorded in our demonstration inbox. Our UK studio desk typically responds within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 text-sm font-medium bg-[#231F1D] text-white rounded-md hover:bg-[#B8533A] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h2 className="font-serif text-xl font-semibold text-[#231F1D] pb-3 border-b border-[#EFE7DA]">
                  Send an Enquiry
                </h2>

                {error && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-md bg-[#FDF2F0] border border-[#E6B8AE] text-xs text-[#9B412B]"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-medium text-[#231F1D]">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Hannah Gallagher"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-medium text-[#231F1D]">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@londonhome.co.uk"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-topic" className="block text-xs font-medium text-[#231F1D]">
                    Enquiry Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                  >
                    <option value="Product & Care Question">Product &amp; Care Question</option>
                    <option value="UK Order & Delivery Support">UK Order &amp; Delivery Support</option>
                    <option value="Interior Styling Advice">Interior Styling Advice</option>
                    <option value="Press & Partnerships">Press &amp; Partnerships</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-medium text-[#231F1D]">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our studio assist with your cushion cover order?"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium bg-[#B8533A] text-white rounded-md hover:bg-[#9B412B] transition-colors cursor-pointer"
                >
                  Submit Message
                </button>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E5DDD0] rounded-xl p-6 space-y-5">
              <h2 className="font-serif text-xl font-semibold text-[#231F1D] pb-3 border-b border-[#EFE7DA]">
                Direct Studio Channels
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B8533A] shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs font-medium text-[#6B5E54]">
                      Studio Email
                    </span>
                    <a
                      href="mailto:hello@jaipurblockstudio.co.uk"
                      className="font-medium text-[#231F1D] hover:text-[#B8533A]"
                    >
                      hello@jaipurblockstudio.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#1E3A5F] shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs font-medium text-[#6B5E54]">
                      UK Dispatch &amp; Correspondence
                    </span>
                    <p className="text-[#231F1D]">
                      Shoreditch, London E2, United Kingdom (Online Storefront)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#1E3A5F] shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs font-medium text-[#6B5E54]">
                      Artisan Printing Partners
                    </span>
                    <p className="text-[#231F1D]">
                      Sanganer &amp; Bagru, Jaipur, Rajasthan, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F2ECE1] border border-[#E5DDD0] rounded-xl p-6 space-y-3">
              <h2 className="font-serif text-lg font-semibold text-[#231F1D]">
                Social Channels
              </h2>
              <p className="text-xs text-[#6B5E54] leading-relaxed">
                Follow our behind-the-scenes woodblock carving notes and London home styling lookbooks.
              </p>
              <div className="flex flex-wrap gap-3 pt-1 text-xs font-medium">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-white border border-[#E5DDD0] rounded-md text-[#231F1D] hover:border-[#B8533A] transition-colors"
                >
                  Instagram @jaipurblockstudio
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-white border border-[#E5DDD0] rounded-md text-[#231F1D] hover:border-[#B8533A] transition-colors"
                >
                  Pinterest Lookbook
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-white border border-[#E5DDD0] rounded-md text-[#231F1D] hover:border-[#B8533A] transition-colors"
                >
                  LinkedIn Venture Profile
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
