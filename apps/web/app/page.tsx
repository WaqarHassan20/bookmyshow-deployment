import { client } from "@repo/db/client"

export default async function Page() {

  const user = await client.user.findFirst()


return (<div>
    <h1>Welcome to the Web App</h1>
    { user?.id}    
    { user?.username}    
  {user?.password}
</div>)

}