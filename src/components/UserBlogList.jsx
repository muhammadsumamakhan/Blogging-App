import React from 'react';

const UserBlogList = ({ profilePicture, title, author, date, email, content }) => {
  // Convert Firestore Timestamp to a readable date string
  const formattedDate = date ? date.toDate().toLocaleString() : "Date not available";

  return (
    <div className="p-4 sm:p-6 rounded-lg shadow-lg bg-white border border-gray-300">
      <div className="flex gap-4 items-center mb-4">
        {/* Profile Picture */}
        <img
          src={profilePicture|| "https://i.ibb.co/yVJBYFG/businessman-character-avatar-isolated-24877-60111.jpg"}
          alt="Profile"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded"
        />
        {/* Blog Title and Date */}
        <div>
          <p className="text-base sm:text-lg font-semibold text-[#212529]">
            {title}
          </p>
          <p className="text-xs sm:text-sm font-semibold text-[#6C757D]">
            {author} - {email} - {formattedDate} 
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <p className="text-sm sm:text-base font-normal text-[#6C757D] leading-6 sm:leading-7">
        {content}
      </p>
    </div>
  );
};

export default UserBlogList;
