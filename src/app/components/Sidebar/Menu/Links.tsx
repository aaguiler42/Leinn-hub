import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends, FaBuilding, FaEuroSign } from "react-icons/fa";

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
    title: "Contribuidores",
    path: "/companies",
    icon: <FaBuilding />,
    cName: "nav-text",
  },
  {
    title: "Contribuciones",
    path: "/contribuciones",
    icon: <FaEuroSign />,
    cName: "nav-text",
  }
];
