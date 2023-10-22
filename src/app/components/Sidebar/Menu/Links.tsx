import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends, FaBuilding } from "react-icons/fa";

export const Links = [
  {
    title: "Inicio",
    path: "/",
    icon: <AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Leinners",
    path: "/users",
    icon: <FaUserFriends />,
    cName: "nav-text",
  },
  {
    title: "Compañías",
    path: "/companies",
    icon: <FaBuilding />,
    cName: "nav-text",
  },
];
