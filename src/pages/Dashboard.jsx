import Error from '@/components/Error';
import LinkCard from '@/components/LinkCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UrlState } from '@/context';
import { getClicksForUrls } from '@/db/apiClicks';
import { getUrls } from '@/db/apiUrls';
import useFetch from '@/hooks/useFetch';
import { Filter } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'

const Dashboard = () => {


  const [searchQuery, setSearchQuery] = useState('');

  const { user } = UrlState();

  const {loading, error, data: urls, fn: fnUrls} = useFetch(getUrls, user?.id);
  console.log(urls);

  const {
    loading: loadingClicks, 
    data: Clicks, 
    fn: fnClicks
  } = useFetch(
    getClicksForUrls, 
    urls?.map((url) => url.id)
  );

  useEffect(() => {
   fnUrls()
  }, []);

  useEffect(() => {
   if (urls?.length){
    fnClicks();
   } 
  }, [urls?.length]);
  
  const filteredUrls = urls?.filter((url) => {
    url.title.toLowerCase().includes(searchQuery.toLowerCase());
  });
  console.log(filteredUrls)

  return (
    <div className='flex flex-col gap-8'>
      {
        loading || loadingClicks &&
        <BarLoader width={"100%"} color="#36d7b7" /> 
      }

      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{Clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className='flex justify-between'>
        <h1 className='text-4xl font-extrabold'>Create Links</h1>
        <Button>Create Link</Button>
      </div>

      <div className='relative'>
        <Input 
          type='text'
          placeholder='Filter Links...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className='absolute top-2 right-2 p-1' />
      </div>

      {
        error &&
        <Error message={error.message} />
      }

      { 
        (filteredUrls || []).map((url, id) => {
          return <LinkCard key={id} url={url} fetchUrls={fnUrls} /> ;
        })
      }


    </div>
  );
}

export default Dashboard