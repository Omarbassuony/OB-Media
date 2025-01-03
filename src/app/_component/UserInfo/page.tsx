"use client";
import { RootState } from "@/app/redux/store";
import { Avatar, Card, Fab, Paper } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import UpdateImage from "../UpdateImage/page";
import { MenuContext } from "@/app/_context/MenuContext/MenuContext";

export default function UserInfo() {
  const { photo, name, email, dateOfBirth, loading } = useSelector(
    (state: RootState) => state.userInfo
  );

  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    throw new Error("useContext must be used within a MenuContextProvider");
  }

  const { setUpdateImage, showUpdateImage } = menuContext;
  return (
    <>
      {loading ? (
        ""
      ) : (
        <Paper className="mb-4" elevation={2}>
          <h2 className="px-4 pt-3 text-2xl font-semibold">About User</h2>
          <Card className="w-full p-4 pt-0 flex justify-between items-center text-center md:text-start flex-col-reverse gap-8 md:flex-row">
            <div>
              <h3 className="text-lg">UserName: {name}</h3>
              <h3 className="text-lg my-2">DateOfBirth: {dateOfBirth}</h3>
              <p className="text-lg">Email: {email}</p>
            </div>
            <div>
              <Avatar className="w-40 h-40 bg-mainColor text-white" aria-label="recipe">
                {photo ? (
                  <Image
                    src={photo}
                    alt="User Image"
                    style={{ width: "auto", height: "auto" }}
                    width={150}
                    height={150}
                    priority
                  />
                ) : (
                  name.slice(0, 1).toUpperCase()
                )}
              </Avatar>
              <Fab
                onClick={() => setUpdateImage(true)}
                className="mt-3"
                variant="extended"
                color="primary"
              >
                <UpgradeIcon className="uppercase" sx={{ mr: 1 }} />
                Update Image
              </Fab>
            </div>
          </Card>
        </Paper>
      )}

      <div
        className={`h-screen ${
          showUpdateImage ? "flex" : "hidden"
        }  justify-start items-center fixed top-0 left-0 w-full bg-black/50 z-[99999999]`}
      >
        <UpdateImage />
      </div>
    </>
  );
}
