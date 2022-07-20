import React from "react";

const Story = ({ img, username }) => {
  return (
    <div>
      <img
        src={img}
        className="h-14 w-14 hover:scale-110 transition transform duration-200 ease-out rounded-full p-[1.5px] border-2 border-red-500 object-contain cursor-pointer"
        alt="avatar"
      />
      <p className="text-xs w-14 truncate">{username}</p>
    </div>
  );
};

export default Story;
