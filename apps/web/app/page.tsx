import { client } from "@repo/db/client"

export default async function Page() {

    const user = await client.user.findUnique({
    where: { username: "helloworld" }
  })


  return (<>
            <div>
                <h1>Welcome to the test Web App</h1> <br />
                USER_ID = { user?.id}   <br /> 
                USER_NAME =   {user?.username} <br />
                USER_PASSWORD = {user?.password}
            </div>
          </>
  );
}