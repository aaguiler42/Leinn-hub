import prisma from "@/lib/prisma";
import Chart from "@/app/components/Chart"

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await prisma.user.findFirst()
  const deffaultSkills = [
    'Frontend',
    'Diseño Gráfico',
    'Trabajo en Equipo',
    'Comunicación',
    'Creatividad',
    'Innovación',
    'Liderazgo',
    'Empatía',
    'Proactividad',
    'Adaptabilidad',
    'Resolución de Problemas',
    'Pensamiento Crítico',
    'Tolerancia a la Frustración',
    'Responsabilidad',
    'Autogestión',
    'Organización',
    'Planificación',
    'Gestión del Tiempo',
    'Toma de Decisiones',
    'Comunicación Asertiva',
    'Negociación',
    'Resiliencia',
    'Confianza',
    'Autoconocimiento',
    'Autoestima',
    'Autoconfianza',
    'Inteligencia Emocional',
  ]

  const skills = deffaultSkills.sort((a, b) => Math.random() - 0.5).slice(0, 5)

  return <div>
    {/* Header */}
    <div style={{
      display: "flex",
      flexDirection: "row",
    }}>
      <img src={user?.imageUrl as string} alt="Profile Picture" />
      <div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
      <div>
        EMAIL BUTTON
      </div>
    </div>
    {/* Body */}
    <div style={{
      display: "flex",
      flexDirection: "row",
    }}>
      <div>
        <h2>Skills</h2>
        <div style={{
          display: "flex",
          flexDirection: "row",
        }}>
          {skills.map(skill => {
              return (<div key={skill}>
                {skill} 
                {/* TODO: DEJAR BONITO */}
              </div>)
              }
            )}
        </div>
        <h2>Descripcion</h2>
        <div>
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
        </div>
      </div>
      <div>
        TELA DE ARANA
        <Chart />
      </div>
    </div>
  </div>;
}
