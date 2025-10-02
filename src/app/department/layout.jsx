"use client";
import DeptSidebar from "./_components/DeptSidebar";


function layout({ children }) {

  return (
    <div>
      <div className="md:w-64 fixed hidden md:block">
        <DeptSidebar/>
      </div>
      <div className="md:ml-64">{children}</div>
    </div>
  );
}

export default layout;