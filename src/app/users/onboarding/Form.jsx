"use client";
import Form from "@/app/components/core/Form";
import Pagination from "@/app/components/core/Pagination";
import ProgressBar from "@/app/components/core/ProgressBar";
import Button from "@/app/components/core/Button";

import * as Yup from "yup";

import styles from "./onboarding.module.css";
import Image from "next/image";

import arrowLeftGray from "public/arrow-left-gray.webp";

const pages = [
  {
    title: "¿Cuál es tu fecha de nacimiento?",
    id: "birthdate",
    type: "date",
    validation: Yup.date().required(
      "Por favor, introduce tu fecha de nacimiento"
    ),
    defaultValue: "",
  },
  // {
  //   title: "¿Con qué género te identificas?",
  //   id: "gender",
  //   type: "select",
  //   options: gender,
  //   defaultValue: "",
  // },
  // {
  //   title: "¿En qué país vives?",
  //   id: "country",
  //   type: "select",
  //   options: countries,
  //   defaultValue: "",
  // },
  // {
  //   title: "¿En qué ciudad?",
  //   id: "city",
  //   type: "text",
  //   validation: Yup.string().required("Por favor, introduce tu ciudad"),
  //   defaultValue: "",
  // },
  // {
  //   title:
  //     "¿Cuál es tu nivel de estudios actual o tu nivel de estudios más alto?",
  //   description:
  //     "Cuéntanos qué estás estudiando o cuál es el nivel de estudios más alto completado.",
  //   id: "studyLevel",
  //   type: "select",
  //   options: studies,
  //   defaultValue: "",
  // },
  // {
  //   title: "¿Qué grado o estudios estás cursando o has cursado?",
  //   id: "major",
  //   type: "multiselect",
  //   options: degrees,
  //   defaultValue: "",
  // },
  // {
  //   title: "¿En qué institución educativa o universidad estudias o estudiaste?",
  //   description: "Si no lo encuentras, selecciona 'otro'",
  //   id: "university",
  //   type: "select",
  //   options: universities,
  //   defaultValue: "",
  // },
  // {
  //   title: "¿En qué curso estás?",
  //   id: "graduated",
  //   type: "select",
  //   options: graduated,
  //   defaultValue: "",
  // },
  // {
  //   title: "¿Qué idiomas hablas?",
  //   description: "Selecciona todas las opciones que correspondan.",
  //   id: "languages",
  //   type: "multiselect",
  //   options: languages,
  //   defaultValue: "",
  // },
];

const initialValues = Object.fromEntries(
  pages.map(({ id, type, defaultValue }) => {
    if (defaultValue) {
      return [id, defaultValue];
    }
    const value =
      type === "radio"
        ? []
        : type === "multiselect"
        ? []
        : type === "number"
        ? 0
        : "";
    return [id, value];
  })
);

const validationSchema = Yup.object().shape(
  Object.fromEntries(
    pages.map(({ id, type, validation }) => {
      if (validation) {
        return [id, validation];
      }

      if (type === "select") {
        return [id, Yup.object()];
      }

      if (type === "multiselect") {
        return [id, Yup.array()];
      }

      return [id, Yup.string().required("Required")];
    })
  )
);

export default function OnobardingForm() {
  // const router = useRouter();
  // const { student, setStudent } = useStudent();

  const handleSubmit = async (values) => {
    const formattedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => {
        if (key === "birthdate") {
          const [year, month, day] = value.split("-");
          return [key, new Date(year, month - 1, day)];
        }
        if (Array.isArray(value)) {
          return [key, value.map((v) => v.label)];
        }
        if (typeof value === "object") {
          return [key, value.label];
        }
        return [key, value];
      })
    );
    // await fetcher(`/api/students/${student.id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ ...formattedValues, onboardingCompleted: true }),
    // })
    //   .then((res) => res.json())
    //   .then(({ data: user }) => {
    //     setStudent((oldStudent) => ({ ...oldStudent, ...user }));
    //     router.query.page
    //       ? router.replace(router.query.page)
    //       : router.replace("/");
    //   });
  };

  return (
    <div className={styles.onboarding} style={{ backgroundColor: "#f9fafc" }}>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        className={styles.form}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, submitForm }) => (
          <Pagination>
            <Pagination.Change>
              {({ page, previousPage }) => (
                <>
                  <div className={styles.topController}>
                    {page > 1 ? (
                      <Button
                        variant="secondaryCustom"
                        style={{
                          "--color": "#696974",
                          border: "1px solid #E2E2EA",
                        }}
                        type="button"
                        onClick={previousPage}
                      >
                        <Image
                          src={arrowLeftGray}
                          alt="back"
                          width={24}
                          height={24}
                        />
                        Volver
                      </Button>
                    ) : (
                      <div />
                    )}
                    <span className={styles.step}>
                      Paso {page}/{pages.length}
                    </span>
                  </div>
                  <ProgressBar
                    className={styles.progress}
                    progress={page}
                    total={pages.length}
                    style={{
                      "--colorPrimary": "#E4FF3D",
                      "--colorSecondary": "rgba(228, 255, 61, 0.2)",
                      "--height": "20px",
                    }}
                  />
                </>
              )}
            </Pagination.Change>
            {pages.map(
              (
                { title, description, id, options, type, defaultValue },
                index
              ) => {
                const disabled =
                  errors[id] ||
                  (type === "select" ? values[id] === "" : !values[id].length);

                return (
                  <Pagination.Page
                    pageNumber={index + 1}
                    key={id}
                    canEnter={!disabled && index < pages.length}
                    onLastPage={submitForm}
                    numberOfPages={pages.length}
                  >
                    <div className={styles.page}>
                      <div className={styles.heading}>{title}</div>
                      {description && (
                        <div className={styles.description}>{description}</div>
                      )}
                      <div className={styles.field}>
                        <Form.Field
                          name={id}
                          id={id}
                          type={type}
                          options={options}
                        />
                      </div>
                    </div>
                    <div className={styles.footer}>
                      <Pagination.Change>
                        {({ page, nextPage }) =>
                          page < pages.length ? (
                            <Button
                              disabled={disabled}
                              className={styles.nextButton}
                              type="button"
                              onClick={nextPage}
                            >
                              Siguiente
                            </Button>
                          ) : page === pages.length ? (
                            <Form.Submit
                              disabled={disabled}
                              className={styles.nextButton}
                            >
                              Enviar
                            </Form.Submit>
                          ) : (
                            <div />
                          )
                        }
                      </Pagination.Change>
                    </div>
                  </Pagination.Page>
                );
              }
            )}
          </Pagination>
        )}
      </Form>
    </div>
  );
}
