"use client";

import SinglePostDetails from "@/app/_component/singlepost/page";
import SkelltonLoading from "@/app/_component/SkelltonLoading/page";
import { getSinglePost } from "@/app/redux/slices/postsSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface IPrams {
  id: string;
}
export default function SinglePost(props: { params: IPrams }) {
  const { token } = useSelector((state: RootState) => state.loginSlice);
  const router = useRouter();
  const { loading, post } = useSelector((state: RootState) => state.posts);
  const { commentAdd } = useSelector((state: RootState) => state.comments);
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    dispatch(getSinglePost(props.params.id));
  }, [props.params.id, dispatch, commentAdd]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/signin");
    } else {
      setIsClient(true);
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return (
    <>
      {isClient && (
        <Container maxWidth="sm">
          {loading ? <SkelltonLoading /> : post && <SinglePostDetails />}
        </Container>
      )}
    </>
  );
}
