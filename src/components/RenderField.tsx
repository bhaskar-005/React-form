import { RiUserFill } from "react-icons/ri";

const RenderField= (label:any, value:String ) => {
  if (!value) return null;
  return (
    <div className="flex items-center mb-4">
      <RiUserFill className="text-xl text-blue-500 mr-4" />
      <div className="flex flex-col">
        <div className="text-lg font-semibold">{label}</div>
        <div className="ml-1 mt-1 mr-3 text-gray-800 text-lg">{value}</div>
      </div>
    </div>
  );
};

export default RenderField;
