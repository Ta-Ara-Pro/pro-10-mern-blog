import { Alert, Button, Modal, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [commentError, setCommentError] = useState("");

  const navigate = useNavigate();

  // =================================================
  // FETCH POST COMMENTS
  // =================================================
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mern-blog-api-p10.vercel.app/api';
        const res = await fetch(`${API_BASE_URL}/comment/getPostComments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setComments(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, [postId]);

  // =================================================
  // SUBMIT FUNCTION
  // =================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim().length === 0) {
      setCommentError("Comment cannot be empty.");
      return;
    }
    if (comment.length > 200) {
      setCommentError("Comment exceeds the maximum character limit.");
      return;
    }
    setCommentError("");

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mern-blog-api-p10.vercel.app/api';
      const res = await fetch(`${API_BASE_URL}/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setComments((prev) => [data, ...prev]);
      } else {
        setCommentError(data.message);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  // =================================================
  // COMMENTS LIKES FUNCTION
  // =================================================
  const handleLike = async (commentId) => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mern-blog-api-p10.vercel.app/api';
      const res = await fetch(`${API_BASE_URL}/comment/likeComment/${commentId}`, {
        method: "PUT",
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // =================================================
  // EDIT COMMENTS FUNCTION
  // =================================================
  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };
  // =================================================
  // DELETE COMMENTS FUNCTION
  // =================================================
  const [showModal, setShowModal] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState('')

  const handleDelete = async () => {
    setShowModal(false)
    try {
      if(!currentUser){
        navigate('/sign-in');
        return;
      }
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mern-blog-api-p10.vercel.app/api'; 
      const res = await fetch(`${API_BASE_URL}/comment/delete/${commentToDelete}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      );
      if(res.ok){
        const data = await res.json()
        setComments( comments.filter((comment) => comment._id !== commentToDelete ))
      }
    } catch (error) {
      console.log(error, error.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-6 w-6 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt={currentUser.username}
          />
          <Link to="/dashboard?tab=profile" className="text-cyan-600 hover:underline">
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link to="/sign-in" className="text-cyan-600 hover:underline">
            Login
          </Link>
        </div>
      )}

      {currentUser && (
        <form onSubmit={handleSubmit} className="border border-teal-500 p-3 rounded-md">
          <Textarea
            placeholder="Add a comment"
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p>{200 - comment.length} char remaining</p>
            <Button
              outline
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={!comment.trim()}
            >
              Submit
            </Button>
          </div>
          {commentError && <Alert color="failure" className="mt-5">{commentError}</Alert>}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={() => handleLike(comment._id)}
              onEdit={handleEdit}
              onDelete={(commentId)=> {setShowModal(true); setCommentToDelete(commentId)}}
            />
          ))}
        </>
      )}
          <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CommentSection;
