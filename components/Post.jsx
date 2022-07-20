import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  HiDotsHorizontal,
  HiHeart,
  HiOutlineHeart,
  HiOutlinePaperAirplane,
  HiOutlineChat,
  HiOutlineBookmark,
  HiOutlineEmojiHappy,
} from "react-icons/hi";
import { db } from "../firebase";
import Moment from "react-moment";
const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();
  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts", id, "likes")), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setcomments(snapshot.docs);
      }
    );
    return unsubscribe;
    // return () => {
    //   unsubscribe();
    // };
  }, [db, id]);
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const likePost = async (e) => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
      return;
    }
    await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
      username: session.user.username,
    });
  };

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setcomment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div className="bg-white my-7 border rounded-sm">
      <div>{/* Header */}</div>
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt="avatar"
          className="rounded-full h-12 w-12  object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <HiDotsHorizontal className="h-5" />
      </div>
      {/* img */}
      <img src={img} alt="postImage" className="object-cover w-full" />
      {/* Buttons */}
      {session && (
        <>
          <div className="flex justify-between p-4">
            <div className="flex space-x-4">
              {hasLiked ? (
                <>
                  <HiHeart className="btn text-red-500" onClick={likePost} />
                </>
              ) : (
                <>
                  <HiOutlineHeart onClick={likePost} className="btn" />
                </>
              )}

              <HiOutlineChat className="btn" />
              <HiOutlinePaperAirplane className="btn" />
            </div>
            <HiOutlineBookmark className="btn" />
          </div>
        </>
      )}

      {/* caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <>
            <p className="font-bold mb-1">{likes.length} likes</p>
          </>
        )}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <>
          <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
            {comments.map((com) => (
              <div key={com.id} className="flex items-center space-x-2 mb-3">
                <img
                  className="h-7 w-7 rounded-full"
                  src={com.data().userImage}
                  alt=""
                />
                <p className="text-sm flex-1">
                  <span className="font-bold mr-2">{com.data().username}</span>
                  {com.data().comment}
                </p>
                <Moment className="px-4 text-xs" fromNow>
                  {com.data().timestamp?.toDate()}
                </Moment>
              </div>
            ))}
          </div>
        </>
      )}

      {/* input box */}
      {session && (
        <>
          <form className="flex items-center p-4">
            <HiOutlineEmojiHappy className="h-7" />
            <input
              type="text"
              className="border-none flex-1 focus:ring-0 outline-none"
              placeholder="Add a comment ... "
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              className="font-semibold text-blue-400"
              onClick={sendComment}
            >
              Post
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Post;
