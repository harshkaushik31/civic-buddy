import React from 'react';
import ProfileCard from './ProfileCard';

const TeamMembers = () => {
  const members = [
    {
      name: 'Harsh',
      role: 'Full Stack Developer',
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur facere quaerat magni libero, sunt quo accusantium velit enim, nulla eius molestias debitis rem corrupti!",
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200'
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
