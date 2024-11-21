import React from 'react';

const Profile = () => {
  return (
    <>
      {/* Header */}
      <div className="w-full h-[70px] flex justify-between items-center bg-white opacity-100 border-b-2 px-4 md:px-16 lg:px-[166px]">
        <h1 className="text-black text-xl md:text-2xl font-bold">Profile</h1>
      </div>

      {/* Profile Container */}
      <div className="max-w-[700px] mx-auto mt-8 mb-10 p-8 rounded-lg shadow-lg border border-gray-300 bg-white">
        <form className="space-y-6">
          {/* Profile Image */}
          <div className="relative flex justify-center md:justify-start">
            <img
              className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] object-cover rounded-lg shadow-md"
              src="https://i.ibb.co/yVJBYFG/businessman-character-avatar-isolated-24877-60111.jpg"
              alt="Profile"
            />
            {/* Edit Icon */}
            <button
              className="absolute bottom-2 right-2 w-8 h-8 flex justify-center items-center bg-indigo-600 text-white rounded-full"
              aria-label="Edit profile image"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M13.586 2.586a2 2 0 0 1 2.828 0l2 2a 2 2 0 0 1 0 2.828l-10 10A2 2 0 0 1 7 18H5v-2a2 2 0 0 1 .586-1.414l10-10zM4 20a1 1 0 1 0 2 0h10a1 1 0 1 0 0-2H6a1 1 0 0 0-2 0v2z"/>
              </svg>
            </button>
          </div>

          {/* Name Section
          <div className="flex items-center justify-center md:justify-start">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mr-2">Muhammad Sumama Khan</h1>
            <button className="w-5 h-5" aria-label="Edit name">
              <svg
                style={{
                  width: '15.71px',
                  height: '15.71px',
                  background: '#9747FF',
                  borderRadius: '3px',
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M13.586 2.586a2 2 0 0 1 2.828 0l2 2a 2 2 0 0 1 0 2.828l-10 10A2 2 0 0 1 7 18H5v-2a2 2 0 0 1 .586-1.414l10-10zM4 20a1 1 0 1 0 2 0h10a1 1 0 1 0 0-2H6a1 1 0 0 0-2 0v2z"/>
              </svg>
            </button>
          </div> */}

          {/* Password Fields */}
          <div className="flex flex-col space-y-4">
            <label className="font-semibold text-gray-600 text-lg">Password</label>
            <input
              type="password"
              placeholder="New password"
              className="w-full md:w-[250px] h-[38px] p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
            <input
              type="password"
              placeholder="Repeat password"
              className="w-full md:w-[250px] h-[38px] p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Update Button */}
          <div className="flex justify-center md:justify-start">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
