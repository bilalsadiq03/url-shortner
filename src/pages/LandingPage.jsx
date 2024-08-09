import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {


    const [LongUrl, setLongUrl] = useState('')
    const navigate = useNavigate();

    const handleShorten = (e) => {
        e.preventDefault()

        if (LongUrl){
            navigate(`/auth?createNew=${LongUrl}`)
        }
    }

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortener <br /> you'll ever need!
      </h2>

      <form onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input
          type="url"
          value={LongUrl}
          placeholder="Enter your long URL"
          className="h-full py-4 px-4 flex-1"
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button className="h-full" type="submit" variant="destructive">
          Shorten!
        </Button>
      </form>
      <img src="/banner.jpg" alt="Error..." className="w-full my-11 md:px-11" />

      <Accordion type="multiple" collapsible className='w-full md:px-11'>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does the URL Shortener works?
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version of that URL. This shortened URL redirects to the orignal long URL when accesssed.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use the App?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Creating an accountallows you to manage your URLs, view analytics, and customize your short URLs
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-1">
          <AccordionTrigger>
            What analytics are available for my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, geolocation dataof the clicks and device types (mobile/desktop) for each of your shortened URL.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default LandingPage