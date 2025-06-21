import React, { useState } from 'react';
import axios from 'axios';

export default function UploadPage() {
    const [jobDescription, setJobDescription] = useState('');
    const [userBio, setUserBio] = useState('');
    const [cvFile, setCvFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [coverLetter, setCoverLetter] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setCvFile(e.target.files[0]);
    };

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setCoverLetter(null);

        try {
            const formData = new FormData();
            formData.append('jobDescription', jobDescription);
            formData.append('userBio', userBio);
            if (cvFile) formData.append('cvFile', cvFile);

            const response = await axios.post(
                'http://localhost:5000/api/generate-cover-letter',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setCoverLetter(response.data.coverLetter);
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">AI Cover Letter Generator</h1>

            <label className="block mb-2 font-medium">Upload Your CV (PDF or Word)</label>
            <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="block w-full mb-4 border p-2 rounded"
            />

            <label className="block mb-2 font-medium">Job Description</label>
            <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                rows={6}
                placeholder="Paste the job description here..."
            />

            <label className="block mb-2 font-medium">Your Bio</label>
            <textarea
                value={userBio}
                onChange={(e) => setUserBio(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                rows={4}
                placeholder="E.g., I’m a junior developer with experience in React and Node..."
            />

            <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Generating...' : 'Generate Cover Letter'}
            </button>

            {error && <p className="text-red-600 mt-4">{error}</p>}

            {coverLetter && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Generated Cover Letter:</h2>
                    <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded border">
            {coverLetter}
          </pre>
                </div>
            )}
        </div>
    );
}
