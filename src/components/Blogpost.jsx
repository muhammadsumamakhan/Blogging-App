import React from 'react';

const BlogPost = ({ image, title, author,email, date, content, onEdit, onDelete }) => {
    return (
        <div className="max-w-[881px] mx-auto mt-4 p-4 sm:p-6 rounded-lg shadow-lg bg-white border border-gray-300">
            {/* Blog Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
                {/* Image */}
                <img
                src={image|| "https://i.ibb.co/yVJBYFG/businessman-character-avatar-isolated-24877-60111.jpg"}
                    alt="Blog"
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded"
                />

                {/* Title and Date */}
                <div>
                    <p className="text-lg font-semibold text-[#212529]">{title}</p>
                    <p className="text-sm font-semibold text-[#6C757D]">
                        {author} - {email} - {date}
                    </p>
                </div>
            </div>

            {/* Blog Content */}
            <p className="text-sm sm:text-base font-normal text-[#6C757D] leading-6 sm:leading-7">
                {content}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
                <button
                    onClick={onEdit}
                    className="w-20 sm:w-24 h-8 bg-[#7749F8] text-white text-sm font-medium rounded"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="w-20 sm:w-24 h-8 bg-[#7749F8] text-white text-sm font-medium rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default BlogPost;

