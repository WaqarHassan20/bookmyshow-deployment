import { client } from "@repo/db/client"
import Link from "next/link"

export default async function Page() {

  const user = await client.user.findUnique({
    where: { username: "helloworld" }
  })

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>First CI-CD Testing and Deployment</h1>
        <br />
        <p   style={{
              padding: "10px 20px",
              fontWeight: "bold",
              color: "#fff",
              fontSize: "20px",
              backgroundColor: "green",
              borderRadius: "5px",
              display: "inline-block",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
              cursor: "pointer",
              marginBottom: "20px",
              textAlign: "center",
        }}>Happy Birthday Ali Abbas Chadhar 🎉</p>
        <br /><br />
        USER_ID = {user?.id} <br /><br />
        USER_NAME = {user?.username} <br /><br />
        USER_PASSWORD = {user?.password}
      </div>

      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <Link href="/birthday">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "20px",
              display: "inline-block",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
              marginBottom: "20px",
              textAlign: "center",
              backgroundColor: "blue",
              fontWeight: "bolder",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Go to Birthday Page
          </button>
        </Link>
      </div>
    </>
  )
}
