"use client";
import Form from "@/app/components/core/Form";
import Pagination from "@/app/components/core/Pagination";
import ProgressBar from "@/app/components/core/ProgressBar";
import Button from "@/app/components/core/Button";

import * as Yup from "yup";

import styles from "./onboarding.module.css";
import Image from "next/image";

import arrowLeftGray from "public/arrow-left-gray.webp";

// Describe una situación en la que tuviste que colaborar en un equipo diverso. ¿Cómo contribuiste al éxito del equipo?

// ¿Cómo te aseguras de mantener una actitud positiva y ética en situaciones desafiantes? ¿Puedes proporcionar un ejemplo?

// Háblame sobre un proyecto o compromiso en el que te involucraste a largo plazo. ¿Cómo mantuviste tu motivación y compromiso a lo largo del tiempo?

// ¿Puedes compartir una experiencia en la que enfrentaste dificultades significativas? ¿Cómo te adaptaste y superaste esos obstáculos?

// ¿Qué estrategias usas para fomentar la colaboración y el trabajo en equipo entre personas con diferentes perspectivas y habilidades?

// ¿Puedes describir una ocasión en la que demostraste tu capacidad para liderar y motivar a otros hacia un objetivo común?
const pages = [
  {
    title: "Cuestionario de selección",
    description: (
      <div className={styles.introduction}>
        <p>
          ¡Bienvenidos al cuestionario de selección de Team Labs, donde la
          innovación y el espíritu emprendedor se encuentran con la inteligencia
          artificial de vanguardia!
        </p>

        <p>
          En este cuestionario, tendrás la oportunidad de demostrar tus
          habilidades y cualidades que valoramos profundamente en un Leinner:
          emprendimiento, proactividad y mucho más.
        </p>

        <p>
          Pero nuestro proceso va más allá de las calificaciones. También
          realizamos un análisis en profundidad para conocerte mejor,
          comprendiendo tus valores y cómo encajas en la cultura de Team Labs.
        </p>

        <p>
          ¡Es hora de comenzar esta emocionante aventura en Team Labs y
          descubrir si tu camino se cruza con el nuestro!
        </p>
      </div>
    ),
    id: "1",
  },
  {
    title: "Describe un logro del que estés particularmente orgulloso.",
    id: "2",
    type: "textarea",
  },
  {
    title: "¿Qué le dirías a tu yo de hace 5 años?",
    id: "3",
    type: "textarea",
  },
  {
    title: "¿Cuál es tu visión de éxito en la vida?",
    id: "4",
    type: "textarea",
  },
  {
    title: "Imagina que recibes 250.000€ en este momento. ¿Qué harías?",
    id: "5",
    type: "textarea",
  },
];

const initialValues = Object.fromEntries(
  pages
    .filter((p) => p.type)
    .map(({ id, type, defaultValue }) => {
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
    pages
      .filter((p) => p.type)
      .map(({ id }) => {
        return [
          id,
          Yup.string().required("Por favor, completa esta pregunta."),
        ];
      })
  )
);

export default function OnboardingForm() {
  const handleSubmit = async (values) => {
    const formattedValues = Object.entries(values).map(
      ([key, value], index) => {
        if (Array.isArray(value)) {
          return [key, value.map((v) => v.label)];
        }
        if (typeof value === "object") {
          return [key, value.label];
        }
        return {
          data: value,
          id: key,
          question: pages[index].title,
        };
      }
    );

    await fetch("/api/onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedValues),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
                      "--colorPrimary": "var(--secondary)",
                      "--colorSecondary": "var(--secondary-light)",
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
                  type &&
                  (errors[id] ||
                    (type === "select"
                      ? values[id] === ""
                      : !values[id].length));

                return (
                  <Pagination.Page
                    pageNumber={index + 1}
                    key={id}
                    canEnter={
                      !disabled && index < pages.length && type !== "textarea"
                    }
                    onLastPage={submitForm}
                    numberOfPages={pages.length}
                  >
                    <div className={styles.page}>
                      <div className={styles.heading}>{title}</div>
                      {description && (
                        <div className={styles.description}>{description}</div>
                      )}
                      {type && (
                        <div className={styles.field}>
                          <Form.Field
                            name={id}
                            id={id}
                            type={type}
                            options={options}
                          />
                        </div>
                      )}
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
