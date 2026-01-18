import React from 'react'

const comments = [
  {
    id: 1,
    name: "Amit Sharma",
    avatar: "https://i.pravatar.cc/40?img=1",
    text: "Amazing video 🔥 Loved the storytelling!",
    date: "2 hours ago",
  },
  {
    id: 2,
    name: "Priya Patil",
    avatar: "https://i.pravatar.cc/40?img=2",
    text: "Very informative 👏",
    date: "1 day ago",
  },
  {
    id: 3,
    name: "Rahul Verma",
    avatar: "https://i.pravatar.cc/40?img=3",
    text: "Waiting for next part 😍",
    date: "3 days ago",
  },
   {
    id: 1,
    name: "Amit Sharma",
    avatar: "https://i.pravatar.cc/40?img=1",
    text: "Amazing video 🔥 Loved the storytelling!",
    date: "2 hours ago",
  },
  {
    id: 2,
    name: "Priya Patil",
    avatar: "https://i.pravatar.cc/40?img=2",
    text: "Very informative 👏",
    date: "1 day ago",
  },
  {
    id: 3,
    name: "Rahul Verma",
    avatar: "https://i.pravatar.cc/40?img=3",
    text: "Waiting for next part 😍",
    date: "3 days ago",
  },
];

const CommentList = () => {
  return (
    <div className="h-screen">
 <div className="p-1 m-1 space-y-4 overflow-y-auto bg-white lg:h-[50px] ">
      <h2 className="text-lg font-semibold mb-2">Comments</h2>

      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm">{comment.name}</p>
              <span className="text-xs text-gray-400">
                {comment.date}
              </span>
            </div>

            <p className="text-sm text-gray-700">
              {comment.text}
            </p>
          </div>
        </div>
      ))}
    </div>
    </div>
   
  );
};

export default CommentList;


