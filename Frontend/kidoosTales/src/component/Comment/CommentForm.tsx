import React from 'react'
import { useState } from 'react';



type CommentFormProps = {
  onClose: () => void
}

const CommentForm = ({ onClose }: CommentFormProps) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const commentData = {
      text: comment,
      createdAt: new Date()
    }

    console.log('Comment submitted:', commentData)

    setComment('')
    onClose() 
  }

  return (
    <div className="p-4 h-full bg-white flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-lg">Add Comment</h2>
        <button
          onClick={onClose}
          className="text-xl font-bold"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 space-y-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full flex-1 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a comment..."
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Post Comment
        </button>
      </form>

    </div>
  )
}

export default CommentForm


