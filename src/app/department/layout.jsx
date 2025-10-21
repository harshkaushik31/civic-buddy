"use client";
import DeptSidebar from "./_components/DeptSidebar";


function layout({ children }) {

  return (
    <div>
      {/* <div className="md:w-64 fixed hidden md:block">
        <DeptSidebar/>
      </div> */}
      <div>{children}</div>
    </div>
  );
}

export default layout;