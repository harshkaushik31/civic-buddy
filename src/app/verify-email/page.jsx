"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      console.log("Sending verification request...");
      await axios.post("/api/users/verify-email", { token });
      setVerified(true);
      setError(false);
    } catch (error) {
      setError(true);
      setVerified(false);
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Email</h1>
          <p className="text-gray-600">Click the button below to verify your email address</p>
        </div>

        {/* Token Status */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Token Status:</p>
          <p className={`text-sm font-mono break-all ${token ? 'text-green-600' : 'text-red-600'}`}>
            {token ? token : "Could not get token from URL"}
          </p>
        </div>

        {/* Verify Button */}
        {!verified && !error && (
          <button 
            onClick={verifyUserEmail}
            disabled={!token || loading}
            className={`w-full h-12 rounded-full text-white font-medium transition-all duration-200 mb-6 ${
              !token || loading
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Verifying...
              </div>
            ) : (
              'Click Here to Verify Email'
            )}
          </button>
        )}

        {/* Success State */}
        {verified && (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6">Your email has been successfully verified.</p>
            <Link 
              href="/login"
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              Continue to Login
            </Link>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">There was an error verifying your email. The token may be invalid or expired.</p>
            <div className="space-y-3">
              <Link 
                href="/login"
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                Go to Login
              </Link>
              <button
                onClick={() => {
                  setError(false);
                  setVerified(false);
                }}
                className="w-full h-12 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-full transition-all duration-200"
              >
                Try Again
                </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? <Link href="/contact" className="text-indigo-600 hover:text-indigo-700">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  )
}