// "use client"
// import Image from "next/image";
// import styles from "./page.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllPosts } from "@/lib/postsSlice";
// import { useEffect } from "react";
// import SinglePost from "./_component/singlepost/page";
// export default function Home() {
//   const dispatch = useDispatch();
//   const { allPosts,isLoading, isError } = useSelector((state: any) => state.posts);

//   useEffect(()=>{
//     dispatch(getAllPosts())
//   },[])
// return (
// <>


//    <div className="container mt-8 flex-col flex items-center w-full mx-auto">
//   {allPosts?.map((post:any)=> <SinglePost postdetails={post}/> )}
//   </div>
// </>
//   );
// }
"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPosts } from "./redux/slices/postsSlice";
import { Container } from "@mui/material";
import AllPosts from "./_component/AllPosts/page";
import SkelltonLoading from "./_component/SkelltonLoading/page";

export default function Home() {
  const { token } = useSelector((state: RootState) => state.loginSlice);
  const { loading, posts } = useSelector((state: RootState) => state.posts);
  const { commentAdd} = useSelector((state: RootState) => state.comments);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/signin");
    } else {
      dispatch(getPosts());
      setIsClient(true);
    }
  }, [token, router, dispatch,commentAdd]);

  if (!token) {
    return null;
  }

  return (
    <>
      {isClient && (
        <Container maxWidth="sm">
          {loading ? <SkelltonLoading /> : posts && <AllPosts />}
        </Container>
      )}
    </>
  );
}
