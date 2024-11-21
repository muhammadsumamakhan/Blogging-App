import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import UserBlogList from '../components/UserBlogList';

const UserBlogDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from Firestore
    const getDataFromFirestore = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user data from 'userblog' collection
        const userQuery = query(collection(db, 'userBlog'), where('uid', '==', id));
        const userSnapshot = await getDocs(userQuery);
         // Debugging log
        console.log("User Snapshot:", userSnapshot); 
        if (userSnapshot.empty) {
          setError('User not found');
          setLoading(false);
          return;
        }

        // Extract user data from Firestore
        const fetchedUserData = userSnapshot.docs.map(doc => doc.data());
        console.log("Fetched User Data:", fetchedUserData); 

        if (fetchedUserData.length > 0) {
          // Assuming one user per ID
          setUser(fetchedUserData[0]);  
        } else {
          setError('User not found in database');
        }

        // Fetch blogs for this user from the 'blogs' collection
        const blogsSnapshot = await getDocs(collection(db, 'userBlog'));
        console.log("Blogs Snapshot:", blogsSnapshot);  

        const userBlogs = blogsSnapshot.docs
          .filter(doc => doc.data().uid === id)  
          .map(doc => ({ ...doc.data(), docid: doc.id }));

        console.log("Filtered User Blogs:", userBlogs);  
        setBlogs(userBlogs);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    getDataFromFirestore();
  }, [id]);  // Only fetch when `id` changes

  return (
    <>
      <div className="w-full h-[70px] flex justify-between items-center bg-white border-b-2 px-4 md:px-16 lg:px-[166px]">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 text-lg sm:text-xl md:text-2xl font-bold hover:text-indigo-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to all blogs
        </button>
      </div>

      <div className="flex flex-col lg:flex-row justify-center mt-8 mb-10 px-4 md:px-8 lg:px-16 gap-8">
        <div className="max-w-full w-full lg:max-w-[700px] space-y-6">
          <h1 className="text-xl md:text-2xl font-semibold text-[#152536] mb-4">
            All from <span className="text-[#7749F8]">{user?.userName || "Unknown User"}</span>
          </h1>

          {/* User Blog list */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            blogs.length > 0 ? (
              blogs.map(blog => (
                <UserBlogList
                  key={blog.docid}
                  profilePicture={blog.profilePicture}
                  title={blog.title}
                  author={blog.userName}
                  email={blog.userEmail}
                  date={blog.date}  
                  content={blog.description}
                />
              ))
            ) 
            :(
              <p>No blogs available from this user.</p>
            )
          )}
        </div>

        {/* Right Column - Profile Sidebar */}
        <div className="flex flex-col items-center  mt-8 lg:mt-0 w-full lg:w-60">
          <p className="text-lg font-semibold text-[#152536] mb-2">{user?.userEmail || 'Email not available'}</p>
          <h1 className="text-xl text-center md:text-2xl font-bold text-[#7749F8] mb-4">{user?.userName}</h1>
          <img
            src={user?.profilePicture || "https://i.ibb.co/yVJBYFG/businessman-character-avatar-isolated-24877-60111.jpg"}
            alt="Profile"
            className="w-40 h-40 sm:w-48 sm:h-48 lg:w-60 lg:h-60 rounded-lg border border-gray-300"
          />
        </div>
      </div>

    </>
  );
};

export default UserBlogDetails;














































