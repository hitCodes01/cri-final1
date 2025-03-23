"use client";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import { ChevronDown, HeadphonesIcon } from "lucide-react";

const TechnicalSupport: React.FC = () => {
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const handleSubmit = () => {
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
    }, 3000);
  };

  const faqs = [
    {
      id: "faq1",
      question: "How to navigate the platform?",
      answer: "To navigate the platform, use the sidebar menu on the left to access different sections. You can click on any section to view its content."
    },
    {
      id: "faq2",
      question: "How to access reports?",
      answer: "Reports can be accessed from the Download Reports section in your User Dashboard. Click the Download button to retrieve the latest reports."
    }
  ];

  return (
    <div 
      className="flex w-screen h-screen bg-cover bg-center bg-no-repeat text-white m-0 p-0 overflow-auto box-border"
      style={{
        backgroundImage: "url('https://t3.ftcdn.net/jpg/04/84/45/02/360_F_484450204_DXknwHxKiZeOlaM4GPT25gFg4Y5jQwxU.jpg')"
      }}
    >
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-5">
        <div className="bg-black/80 rounded-2xl p-5 shadow-2xl max-w-4xl w-full">
          <h1 className="text-3xl font-bold text-center text-white mb-5">
            Technical Support Center
          </h1>

          {/* Submit Ticket Form Section */}
          <div className="bg-white rounded-lg p-5 mb-5 shadow-md">
            <div className="text-center">
              <HeadphonesIcon className="w-10 h-10 text-blue-700 mx-auto" />
              <h2 className="text-xl font-bold text-gray-800 mt-2.5">
                Submit a Ticket
              </h2>
              <p className="text-gray-600 mt-2.5">
                Reach out to our support team for assistance.
              </p>
            </div>

            <form className="flex flex-col gap-4 mt-4">
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Description"
                  rows={4}
                  required
                  className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="self-end px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors duration-300"
              >
                Submit
              </button>
              {ticketSubmitted && (
                <p className="text-green-500 text-center mt-2.5">
                  ✓ Ticket Submitted
                </p>
              )}
            </form>
          </div>

          {/* FAQs Section */}
          <div className="bg-white rounded-lg p-5 shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              FAQs
            </h2>
            <div className="space-y-2">
              {faqs.map((faq) => (
                <div key={faq.id} className="border rounded-lg">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex justify-between items-center p-4 text-left"
                  >
                    <span className="font-semibold text-blue-700">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        expandedFaq === faq.id ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4 text-gray-700">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSupport;