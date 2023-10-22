import { Editor } from "novel";

export default function EditorAI(props: {
  defaultValue: string
  className?: string
}){
  console.log(props.defaultValue)
  return (<div style={{
    margin: "auto",
    width: "1000px",
  }}>
    <Editor
      defaultValue={props.defaultValue}
      completionApi="/api/chatToEmpresa"
      className={props.className}
      disableLocalStorage={true}
    />
  </div>)
}