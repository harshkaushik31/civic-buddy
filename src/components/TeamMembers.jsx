import React from 'react';
import ProfileCard from './ProfileCard';

const TeamMembers = () => {
  const members = [
    {
      name: 'Harsh',
      role: 'Full Stack Developer',
      description: "Harsh is a skilled full stack developer with a sharp mind for coding. He seamlessly bridges front-end design and back-end logic, delivering complete digital solutions.",
      image: 'https://res.cloudinary.com/dpcal7pun/image/upload/v1758295245/WhatsApp_Image_2025-08-20_at_11.50.26_AM_1_oz7jmz.jpg'
    },
    {
      name: 'Divyanshu',
      role: 'UI/UX Designer',
      description: "Divyanshu is a talented UI/UX designer with a keen eye for detail. He crafts intuitive, user-friendly interfaces that blend aesthetics with seamless functionality",
      image: 'https://res.cloudinary.com/dpcal7pun/image/upload/v1758379251/WhatsApp_Image_2025-09-20_at_5.09.03_PM_1_ppn1yp.jpg'
    },
    {
      name: 'Aksh',
      role: 'ML Engineer',
      description: "Aksh is a dedicated ML engineer who builds intelligent models. He transforms data into insights, creating smart algorithms that drive innovative machine learning solutions",
      image: 'https://res.cloudinary.com/dpcal7pun/image/upload/v1758379262/WhatsApp_Image_2025-09-20_at_8.07.13_PM_t7tgnv.jpg'
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
