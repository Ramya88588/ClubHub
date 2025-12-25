import CardFeature from '@/components/shared/cardFeature'
import React, {useEffect, useState} from 'react'
import { getUpcomingEvents } from '@/firebase/collections'
// const Upcoming = () => {
//   return (
//     <div className="p-6 pb-20 flex flex-col gap-7 bg-base-200 mt-10 border-y py-20">
//       <span className="font-semibold text-[36px]">UPCOMING EVENTS</span>
//       <div className="flex flex-wrap gap-4">
//     <CardFeature img="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//       alt="Shoes" title="Event Title" desc="Description of the event..." eventDate="DD/MM/YY" />
//       <CardFeature img="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//       alt="Shoes" title="Event Title" desc="Description of the event..." eventDate="DD/MM/YY" />
//       <CardFeature img="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//       alt="Shoes" title="Event Title" desc="Description of the event..." eventDate="DD/MM/YY" />
//       <CardFeature img="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//       alt="Shoes" title="Event Title" desc="Description of the event..." eventDate="DD/MM/YY" />
//       </div>
//     </div>
//   )
// }

// export default Upcoming

const Upcoming = () =>{
  const [events, setEvents] = useState([]);
  const [loading, Fding] = useState(true);
  useEffect(()=>{
    const fetchEvents = async ()=>{
      const data = await getUpcomingEvents();
      setEvents(data.slice(0,4));
      setLoading(false);
    };
    fetchEvents();
  },[]);
  
  if(loading){
    return(
      <div className="p-6 py-20 bg-base-200">
        <p>Loading upcoming events...</p>
      </div>
    );
  }
 return (
    <div className="p-6 pb-20 flex flex-col gap-7 bg-base-200 mt-10 border-y py-20">
      <span className="font-semibold text-[36px]">UPCOMING EVENTS</span>
      <div className="flex flex-wrap gap-4">
        {
          events.map((event)=>{
            <CardFeature
              key = {event.clubId}
              img = {event.image}
              alt = {event.title}
              title={event.title}
              desc={event.description}
              eventDate={event.date}
            />

          })
        }
      </div>
    </div>
  );
};

export default Upcoming;

