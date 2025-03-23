// pages/resources.js
import "../styles/resources.css";
import "../globals.css";
import Head from 'next/head';
import Footer from '../components/Footer';

export default function Resources() {
  return (
    <div className="text-gray-900 font-sans">
      <Head>
        <title>Resources & Education Hub</title>
      </Head>

      {/* Overview Section */}
      <section className="relative h-screen bg-cover bg-center resources-overview">
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-5xl font-bold text-white shadow-lg">Resources & Education Hub</h1>
          <p className="text-lg text-gray-200 mt-4 max-w-2xl">
            The Resources & Education Hub offers a wealth of learning materials, workshops, and publications designed to empower communities and leaders with the knowledge they need to tackle climate change effectively.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold mb-12 section-heading">Explore Our Resources</h2>

          {/* Learning Modules */}
          <div className="resource-card bg-cover bg-center mb-12 learning-modules">
            <div className="bg-overlay p-8 rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-blue-500 mb-4">Learning Modules</h3>
              <p className="text-gray-200 mb-4">
                Learning Modules cover a range of topics, from climate science fundamentals to actionable adaptation strategies for communities, NGOs, and local governments.
              </p>
              <button className="resource-button bg-blue-500 hover:bg-blue-600">
                Explore Learning Modules
              </button>
            </div>
          </div>

          {/* Community Workshop Toolkit */}
          <div className="resource-card bg-cover bg-center mb-12 workshop-toolkit">
            <div className="bg-overlay p-8 rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-green-500 mb-4">Community Workshop Toolkit</h3>
              <p className="text-gray-200 mb-4">
                Organize local resilience workshops using the Community Workshop Toolkit. Access guides, templates, and presentations to engage communities in building climate resilience.
              </p>
              <button className="resource-button bg-green-500 hover:bg-green-600">
                Access Workshop Toolkit
              </button>
            </div>
          </div>

          {/* Publications & Research Archive */}
          <div className="resource-card bg-cover bg-center mb-12 research-archive">
            <div className="bg-overlay p-8 rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-purple-500 mb-4">Publications & Research Archive</h3>
              <p className="text-gray-200 mb-4">
                Our Publications & Research Archive is a library of the latest research in climate resilience and AI applications, offering a reliable resource for policymakers, activists, and researchers.
              </p>
              <button className="resource-button bg-purple-500 hover:bg-purple-600">
                View Research Archive
              </button>
            </div>
          </div>

          {/* Youth & Schools Section */}
          <div className="resource-card bg-cover bg-center youth-section">
            <div className="bg-overlay p-8 rounded-lg shadow-lg">
              <h3 className="text-3xl font-semibold text-pink-500 mb-4">Youth & Schools Section</h3>
              <p className="text-gray-200 mb-4">
                The Youth & Schools Section offers resources tailored to educators and youth groups, providing students with a foundational understanding of climate challenges and resilience.
              </p>
              <button className="resource-button bg-pink-500 hover:bg-pink-600">
                Explore Youth Resources
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
