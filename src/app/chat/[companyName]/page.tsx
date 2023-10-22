"use client";
import EditorAI from "../../components/EditorAI"

export default function ChhatAI({
  params: { companyName },
}:{
  params: {
    companyName: string
  }
}) {
  const areas = [
    'Gestión de eventos',
    'Gestión de proyectos',
    'Gestión de equipos',
    'Gestión de recursos',
    'Gestión de clientes',
    'Gestión de ventas',
    'Gestión de marketing',
    'Gestión de finanzas',
    'Gestión de producción',
    'Gestión de calidad',
    'Gestión de logística',
    'Gestión de compras',
    'Gestión de inventario',
  ]

  const company = decodeURIComponent(companyName)
  const defaultMessage = `
    Hola ${company}, he visto vuestro perfil por LEINN Hub y además he visto que necesitáis ayuda con la ${areas}.
    Ya que mi perfil está orientado a
  `

  return (
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    height: "100%",
    padding: '1rem',
    paddingBottom: '2rem',
  }}>
    <h2 style={{
      textAlign: "center",
      margin: "1rem",
      fontSize: "1.3rem",
      fontWeight: "500"
    }}>Haz una proposición a {company}</h2>
    <EditorAI defaultValue={defaultMessage} className="relative min-h-[550px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg editor"/>
    <button style={{
      textAlign: "center",
      fontSize: "1.3rem",
      fontWeight: "500",
      width: "fit-content",
      justifySelf: "center",
      marginInline: "auto",
      marginTop: "1rem",
      borderRadius: "4px",
    }} onClick={() => {
      window.location.href = "/"
    }}>Enviar proposición</button>
  </div>
)}
