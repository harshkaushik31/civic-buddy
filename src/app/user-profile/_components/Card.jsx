export default function Card({imageUrl,id,description}) {
    return (
        <div className="p-4 bg-white rounded-lg shadow max-w-80 m-2">
            <img className="rounded-md max-h-40 w-full object-cover" src={imageUrl} alt="officeImage" />
            <p className="text-gray-900 text-xl font-semibold ml-2 mt-2">{id}</p>
            <p className="text-gray-500 text-sm my-3 ml-2">{description}</p>
        </div>
    );
};