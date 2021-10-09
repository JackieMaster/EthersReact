import React from "react";

function input(props: any) {
  return (
    <div>
      <div className="p-4 min-w-full">
        <input
          {...props}
          className=" p-4 min-w-full border rounded border-gray-200 focus:blue-50 ..."
        />
      </div>
    </div>
  );
}

export default input;
