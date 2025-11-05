
import NavAdmin from "./NavAdmin"

function Admin() {
  return (
      <div style={{ padding: "20px" }}>
      <NavAdmin/>
      <div className="mb-4 bg-amber-300">
        <h1 className="text-center h-full p-2 w-full" >Gestión de Administradores</h1>
      </div>
    </div>
  )
}

export default Admin