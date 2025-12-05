import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-6">
        <h1 className="text-4xl font-bold">About StartSpace</h1>
        <p className="text-gray-600 mt-2">
          StartSpace is a community for founders, builders and mentors to share
          startup ideas, find collaborators and get feedback.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-700">
            To help early-stage founders turn ideas into products by connecting
            them with talent, resources and a supportive community.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">What you can do</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Post and discover startup ideas</li>
            <li>Join teams and find cofounders</li>
            <li>Share feedback and resources</li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">Team</h2>
          <p className="text-gray-700">Small team of builders and designers passionate about startups.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">Get involved</h2>
          <p className="text-gray-700 mb-4">Have a question or want to collaborate?</p>
          <Link to="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}