import React, { useState, useRef, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, Timestamp, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db, auth } from '../config/firebase/config';
import BlogPost from '../components/Blogpost';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';

const Dashboard = () => {
    const placeholderInput = useRef();
    const textareaInput = useRef();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    // State for Delete Modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteBlogId, setDeleteBlogId] = useState(null);
    // State for Edit Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editBlogId, setEditBlogId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    // Function to publish a new blog
    const publishBlog = async (e) => {
        e.preventDefault();
        const title = placeholderInput.current.value;
        const description = textareaInput.current.value;

        if (!title || !description) {
            toast.error("Please fill in all fields!");
            return;
        }

        setLoading(true);

        // Add blog document to Firestore
        try {
            const docRef = await addDoc(collection(db, "userBlog"), {
                userEmail: auth.currentUser?.email,
                userName: auth.currentUser?.displayName,
                title,
                description,
                uid: auth.currentUser?.uid,
                date: Timestamp.fromDate(new Date()),
            });

            // Add the new blog to the state to update the UI
            setBlogs(prevBlogs => [
                ...prevBlogs,
                { title, description, uid: auth.currentUser?.uid, docid: docRef.id }
            ]);

            placeholderInput.current.value = "";
            textareaInput.current.value = "";

            toast.success("Blog published successfully!");
        } catch (error) {
            console.error("Error adding blog:", error);
            toast.error("Error publishing blog. Please try again!");
        } finally {
            setLoading(false);
        }
    };

    // Fetch blogs from Firestore
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "userBlog"), where("uid", "==", auth.currentUser?.uid));
                const querySnapshot = await getDocs(q);
                const fetchedBlogs = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    docid: doc.id,
                }));
                setBlogs(fetchedBlogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                toast.error("Error fetching blogs. Please try again!");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);



    // Function to handle blog edit(simple) 
    /*
    const handleEdit = async (item, index) => {
        const updatedTitle = prompt("Update Title", item.title);
        const updatedDescription = prompt("Update Description", item.description);
        if (updatedTitle || updatedDescription) {
            try {
                const blogsRef = doc(db, "userBlog", item.docid);
                await updateDoc(blogsRef, { 
                    title: updatedTitle,
                    description: updatedDescription,
                });
                const updatedBlogs = [...blogs];
                updatedBlogs[index].title = updatedTitle;
                updatedBlogs[index].description = updatedDescription;
                setTodos(updatedBlogs);
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        }
    };
    */

    // Function to handle blog edit
    const handleEdit = (item) => {
        setEditBlogId(item.docid);
        setEditTitle(item.title);
        setEditDescription(item.description);
        setIsEditModalOpen(true);
    };

    // Function to update the blog in Firestore
    const updateBlog = async () => {
        if (!editTitle || !editDescription) {
            toast.error("Please fill in all fields!");
            return;
        }

        try {
            const blogsRef = doc(db, "userBlog", editBlogId);
            await updateDoc(blogsRef, {
                title: editTitle,
                description: editDescription,
            });

            setBlogs(blogs.map(blog =>
                blog.docid === editBlogId ? { ...blog, title: editTitle, description: editDescription } : blog
            ));

            setIsEditModalOpen(false);
            toast.success("Blog updated successfully!");
        } catch (error) {
            console.error("Error updating document:", error);
            toast.error("Error updating blog. Please try again!");
        }
    };



    // Function to handle blog delete(simple) 
    /*
    const handleDelete = async (item, index) => {
        try {
            await deleteDoc(doc(db, "userBlog", item.docid));
            const updatedBlogs = [...blogs];
            updatedBlogs.splice(index, 1);
            setBlogs(updatedBlogs);
        } catch (error) {
            console.error("Error deleting blog: ", error);
        }
    };
    */

    // Handle the blog delete process
    const handleDelete = async () => {
        if (deleteBlogId) {
            try {
                await deleteDoc(doc(db, "userBlog", deleteBlogId));
                setBlogs(blogs.filter(blog => blog.docid !== deleteBlogId));
                setDeleteBlogId(null);
                setIsDeleteModalOpen(false);
                toast.success("Blog deleted successfully!");
            } catch (error) {
                console.error("Error deleting document:", error);
                toast.error("Error deleting blog. Please try again!");
            }
        }
    };

    return (
        <>
            <div className="w-full h-[70px] flex justify-between items-center bg-white border-b-2 px-4 md:px-16 lg:px-[166px]">
                <h1 className="text-black text-xl md:text-2xl font-bold">Dashboard</h1>
            </div>

            {/* Form to publish a new blog */}
            <div className="max-w-[881px] mx-auto mt-8  p-4 sm:p-6 rounded-md shadow-lg bg-white">
                <form className="space-y-4" onSubmit={publishBlog}>
                    <input
                        type="text"
                        placeholder="Enter blog title"
                        className="w-full h-10 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        ref={placeholderInput}
                    />
                    <textarea
                        placeholder="What is on your mind?"
                        className="w-full h-28 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        ref={textareaInput}
                    />
                    <button
                        type="submit"
                        className="w-full sm:w-[135px] h-10 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors"
                    >
                        {loading ? <span className="loading loading-dots loading-md"></span> : 'Publish Blog'}
                    </button>
                </form>
            </div>

            {/* Display list of blogs */}
            <div className="max-w-[881px] mx-auto mt-8 mb-10 px-4 sm:px-0 text-left">
                {loading ? (
                    <div className=" pb-10 text-center loading-dots"></div>
                ) : blogs.length > 0 ? (
                    blogs.map((item, index) => (
                        <BlogPost
                            key={item.docid}
                            image={item.image}
                            title={item.title}
                            author={item.userName}
                            email={item.userEmail}
                            date={item.date?.toDate().toLocaleDateString()}
                            content={item.description}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => {
                                setDeleteBlogId(item.docid);
                                setIsDeleteModalOpen(true);
                            }}
                        />
                    ))
                ) : (
                    <p className="text-center">No blogs to display</p>
                )}
            </div>

            {/* Edit Blog Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-lg">
                        <h2 className="text-xl font-bold">Edit Blog</h2>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full h-10 p-2 mt-4 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                            placeholder="Enter blog title"
                        />
                        <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full h-28 p-2 mt-4 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                            placeholder="What is on your mind?"
                        />
                        <div className="mt-4 flex justify-end gap-x-3">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="w-20 sm:w-24 h-8 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateBlog}
                                className="w-20 sm:w-24 h-8 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors focus:outline-none "
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for delete confirmation */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md shadow-lg">
                        <h2 className="text-xl font-bold">Are you sure you want to delete this blog?</h2>
                        <div className="mt-4 flex justify-end gap-x-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="w-20 sm:w-24 h-8 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="w-20 sm:w-24 h-8 bg-red-600 text-white rounded hover:bg-red-700 transition-colors focus:outline-none"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </>
    );
};

export default Dashboard;





// const Dashboard = () => {
//     console.log("Dashboard Component Rendered");
  
//     return (
//       <div>
//         <h1>Dashboard</h1>
//       </div>
//     );
//   };

// export default Dashboard;