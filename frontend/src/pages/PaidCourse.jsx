import React, { useEffect, useState } from 'react';

const PaidCourse = () => {
    const [courseData, setCourseData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch('http://localhost:3000/paid-course-data', {
                    method: 'GET',
                    credentials: 'include' // Must include credentials to send the cookie
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch course data');
                }

                const data = await response.json();
                setCourseData(data.course);
            } catch (err) {
                console.error("Error fetching paid course data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, []);

    if (loading) {
        return <div className="text-center text-xl mt-10">Loading course content...</div>;
    }

    if (error) {
        return <div className="text-center text-xl mt-10 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-10">
            <h1 className="text-4xl font-bold mb-6 text-center">
                {courseData.userName}
            </h1>
            <h1 className="text-4xl font-bold mb-6 text-center">
                {courseData.title}
            </h1>
            <p className="text-lg leading-relaxed text-gray-700">
                {courseData.content}
            </p>
        </div>
    );
};

export default PaidCourse;