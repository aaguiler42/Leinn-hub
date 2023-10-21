// "use client";
import Form from "@/app/components/core/Form";
import Pagination from "@/app/components/core/Pagination";
import ProgressBar from "@/app/components/core/ProgressBar";
import Button from "@/app/components/core/Button";

import * as Yup from "yup";

import styles from "./onboarding.module.css";
import Image from "next/image";

import arrowLeftGray from "public/arrow-left-gray.webp";
import OnobardingForm from "./Form.jsx";

export default function Onboarding() {
  return <OnobardingForm />;
}
