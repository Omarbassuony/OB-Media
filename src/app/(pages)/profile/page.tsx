"use client";
import { AppDispatch, RootState } from "@/app/redux/store";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AddPost from "@/app/_component/addpost/page";
import { Container, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MenuContext } from "@/app/_context/MenuContext/MenuContext";
import UserPosts from "@/app/_component/UserPosts/page";
import SkelltonLoading from "@/app/_component/SkelltonLoading/page";
import { getUserPosts } from "@/app/redux/slices/userPosts";
import UserInfo from "@/app/_component/UserInfo/page";

export default function Profile() {
  const { token } = useSelector((state: RootState) => state.loginSlice);
  const { loading, posts, addPost, removePost, updatePost } = useSelector(
    (state: RootState) => state.userPosts
  );
  const { addImage } = useSelector((state: RootState) => state.userInfo);
  const { commentAdd, commentDeleted } = useSelector(
    (state: RootState) => state.comments
  );
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    throw new Error("useContext must be used within a MenuContextProvider");
  }

  const { setShowMenu, showMenu } = menuContext;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/signin");
    } else {
      dispatch(getUserPosts());
      setIsClient(true);
    }
  }, [
    token,
    router,
    dispatch,
    addPost,
    removePost,
    addImage,
    updatePost,
    commentAdd,
    commentDeleted,
  ]);

  if (!token) {
    return null;
  }

  return (
    <>
      {isClient && (
        <>
          <Fab
            onClick={() => setShowMenu(true)}
            className="fixed bottom-12 right-12"
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          <div className={`${showMenu ? "" : "hidden"}`}>
            <div className="h-screen flex justify-start items-center fixed top-0 left-0 w-full bg-black/50 z-[99999]">
              <AddPost />
            </div>
          </div>

          <Container maxWidth="sm">
            <UserInfo />
            {loading ? <SkelltonLoading /> : posts && <UserPosts />}
          </Container>
        </>
      )}
    </>
  );
}
