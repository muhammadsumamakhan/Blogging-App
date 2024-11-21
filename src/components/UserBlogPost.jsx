import React from 'react';


const UserBlogPost = ({ imageSrc, title, author, email, date, content, onClick }) => {
    return (
        <div
            className="max-w-full sm:max-w-[881px] mx-auto mt-4 p-6 mb-10 rounded-lg shadow-lg bg-white border border-gray-300"
            onClick={onClick}
        >
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                <img src={imageSrc} alt="Profile" className="w-20 h-20 bg-gray-200 rounded" />
                
                <div>
                    <p className="text-lg font-semibold text-[#212529]">{title}</p>
                    <p className="text-sm font-semibold text-[#6C757D]">
                        {author} - {email} - {date}
                    </p>
                </div>
            </div>
            <p className="text-base font-normal text-justify text-[#6C757D] leading-7">{content}</p>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                className="px-4 py-1.5 mt-4 text-white font-medium bg-[#7749F8] rounded-md hover:bg-[#6a41e3] transition"
            >
                Read More About This User
            </button>
        </div>
    );
};

export default UserBlogPost;





