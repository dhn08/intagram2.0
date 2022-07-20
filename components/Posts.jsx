import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { db } from "../firebase";
import Post from "./Post";

// const posts = [
//   {
//     id: 123,
//     username: "Alexa",
//     img: "https://images.pexels.com/photos/3013440/pexels-photo-3013440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     userImg:
//       "https://images.pexels.com/photos/1590483/pexels-photo-1590483.jpeg?auto=compress&cs=tinysrgb&w=600",
//     caption: "this is dope",
//   },
//   {
//     id: 100,
//     username: "Alexa",
//     img: "https://images.pexels.com/photos/3013440/pexels-photo-3013440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     userImg:
//       "https://images.pexels.com/photos/1590483/pexels-photo-1590483.jpeg?auto=compress&cs=tinysrgb&w=600",
//     caption: "this is dope",
//   },
// ];
const Posts = ({ posts }) => {
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     query(collection(db, "posts"), orderBy("timestamp", "desc")),
  //     (snapshot) => {
  //       setPosts(snapshot.docs);
  //     }
  //   );
  //   return unsubscribe;
  // }, [db]);
  const [dynamicPost, setdynamicPost] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setdynamicPost(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db]);
  console.log(dynamicPost);
  return (
    <div>
      {console.log(dynamicPost)}
      {dynamicPost
        ? dynamicPost.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              username={post.data().username}
              userImg={post.data().profileImg}
              img={post.data().image}
              caption={post.data().caption}
            />
          ))
        : posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              username={post.username}
              userImg={post.profileImg}
              img={post.image}
              caption={post.caption}
            />
          ))}
      {/* {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))} */}
    </div>
  );
};

export default Posts;
