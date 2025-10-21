import Link from "next/link";

  const departments = [
    { value: "PWD", label: "Public Works Department (PWD)" , color:"red"},
    { value: "NRDA", label: "Naya Raipur Development Authority (NRDA)" ,color:"green"},
    { value: "NRMC", label: "Naya Raipur Municipal Corporation (NRMC)" , color:"red"},
    { value: "Electricity", label: "Electricity Department", color:"red" },
    { value: "Water", label: "Water Supply Department", color:"red" },
    { value: "Traffic", label: "Traffic Police", color:"red" },
    { value: "Environment", label: "Environment Department", color:"red" }
  ];


export default  function page() {
  return (
    <div className="flex w-full flex-wrap justify-center items-center min-h-screen">
      {
        departments.map((dept, index)=>(
          <Link href={`/department/${dept.value}`} key={index}>
          <button  className="border border-black bg-gray-100 p-12 m-8 rounded-2xl hover:cursor-pointer">
            <strong>{dept.value}</strong>
            <br />
            <em>{dept.label}</em>
          </button>
          </Link>
        ))
      }
    </div>
  )
}

