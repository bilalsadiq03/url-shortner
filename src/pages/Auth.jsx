import Login from '@/components/Login';
import Signup from '@/components/Signup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Auth = () => {


  const [searchParams] = useSearchParams();

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold up! let's login first..."
          : "Login/Signup"}
      </h1>

      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className='grid grid-cols-2 w-full'>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth