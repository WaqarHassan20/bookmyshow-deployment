import { client } from "@repo/db/client"
import Link from "next/link"

export default async function Page() {

  const user = await client.user.findUnique({
    where: { username: "helloworld" }
  })

  return (
    <>
      <div>
        <h1>Welcome to the test Web App</h1> <br />
        USER_ID = {user?.id} <br />
        USER_NAME = {user?.username} <br />
        USER_PASSWORD = {user?.password}
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link href="/birthday">
          <button style={{ padding: "10px 20px", backgroundColor: "#ff69b4", color: "#fff", border: "none", borderRadius: "5px" }}>
            Go to Birthday Page
          </button>
        </Link>
      </div>
    </>
  );
}
