import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase/config";
import UserBlogPost from "../components/UserBlogPost";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userBlog"));
        const dataArr = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          date: doc.data().date ? doc.data().date.toDate().toLocaleString() : "No date available",
          documentId: doc.id,
        }));
        setBlogs(dataArr);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // single user blog
  const singleUserBlog = (item) => {
    if (!auth.currentUser) {
      console.log("user login nahi ha.");
      setShowModal(true); // Show modal when user is not logged in
      return;
    }
    console.log("user login haa.", item);
    navigate(`/user/${item.uid}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading blogs. Please try again later.</p>;

  return (
    <>
      {/* Header */}
      <div className="w-full h-[70px] flex justify-between items-center bg-white border-b-2 px-4 md:px-16 lg:px-[166px]">
        <h1 className="text-black text-xl md:text-2xl font-bold">Good Morning Readers!</h1>
      </div>

      {/* All Blogs Heading */}
      <div className="flex justify-start max-w-[881px] mx-auto mt-8 text-left">
        <h1 className="text-2xl font-semibold text-[#152536]">All Blogs</h1>
      </div>

      {/* Blog Posts */}
      {blogs.length > 0 ? (
        blogs.map((item) => (
          <UserBlogPost
            key={item.documentId}
            imageSrc={
              item.imageSrc ||
              "https://i.ibb.co/yVJBYFG/businessman-character-avatar-isolated-24877-60111.jpg"
            }
            title={item.title || "Untitled Blog"}
            author={item.userName || "Unknown Author"}
            email={item.userEmail || "No Email Provided"}
            date={item.date}
            content={item.description || "No content available"}
            onClick={() => singleUserBlog(item)}
          />
        ))
      ) : (
        <p className="text-center mt-10 pb-10">No blogs available. Be the first to write one!</p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
            <h2 className="text-lg font-semibold text-center text-gray-800">Log In Required</h2>
            <p className="text-gray-600 mt-2 text-center">
              To access this blog post, please log in to your account.
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
