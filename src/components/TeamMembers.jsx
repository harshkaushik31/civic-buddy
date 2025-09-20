import React from 'react';
import ProfileCard from './ProfileCard';

const TeamMembers = () => {
  const members = [
    {
      name: 'Harsh',
      role: 'Full Stack Developer',
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur facere quaerat magni libero, sunt quo accusantium velit enim, nulla eius molestias debitis rem corrupti!",
      image: 'https://res.cloudinary.com/dpcal7pun/image/upload/v1758295245/WhatsApp_Image_2025-08-20_at_11.50.26_AM_1_oz7jmz.jpg'
    },
    {
      name: 'Divyanshu',
      role: 'UI/UX Designer',
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus a consequatur praesentium dolor? Modi blanditiis aperiam odit quia natus magnam in id saepe cupiditate!",
      image: 'https://randomuser.me/api/portraits/men/40.jpg'
    },
    {
      name: 'Aksh',
      role: 'ML Engineer',
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus a consequatur praesentium dolor? Modi blanditiis aperiam odit quia natus magnam in id saepe cupiditate!",
      image: 'https://randomuser.me/api/portraits/men/31.jpg'
    }
  ];

  return (
    <div className='flex flex-col'>
        <h1 className='text-4xl text-center text-white'>Team Members</h1>
        <div className="flex flex-wrap gap-8 p-6 justify-center">
      {members.map((member, index) => (
        <ProfileCard
          key={index}
          name={member.name}
          role={member.role}
          description={member.description}
          image={member.image}
        />
      ))}
    </div>
    </div>
  );
};

export default TeamMembers;
