import React, { useState } from "react";
import { useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import AddInfoModal from "./AddInfoModal";
import UserTable from "./UserTable";
const UserInfoTable = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, [userInfo]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className=" max-w-7xl m-auto px-4 mt-10">
      <div className="card overflow-x-auto w-full h-[560px] bg-base-100 shadow-xl">
        <div className="card-body">
          <div onClick={() => openModal()} className="flex justify-center">
            <div className="border py-3 px-8 rounded-full flex gap-2">
              <span className="">Add Now</span>
              <span className="mt-1">
                <GrAdd />
              </span>
            </div>
          </div>

          <div className="overflow-x-auto  overflow-y-scroll h-[440px] ">
            <table className=" w-full  bg-red-50 shadow rounded-lg">
              {/* <!-- head --> */}
              <thead>
                <tr className=" ">
                  <th className="p-4 text-[#FD5D5D]">select</th>
                  <th className="p-4 text-[#FD5D5D]">Id</th>
                  <th className="p-4 text-[#FD5D5D]">Name</th>
                  <th className="p-4 text-[#FD5D5D]">Phone</th>
                  <th className="p-4 text-[#FD5D5D]">Email</th>
                  <th className="p-4 text-[#FD5D5D]">Hobbies</th>
                  <th className="p-4 text-[#FD5D5D]">Update/delete</th>
                </tr>
              </thead>
              <tbody>
                {userInfo.map((user, i) => (
                  <UserTable user={user} i={i} key={i}></UserTable>
                ))}
              </tbody>
            </table>

            {isOpen && (
              <AddInfoModal
                closeModal={closeModal}
                openModal={openModal}
                isOpen={isOpen}
              ></AddInfoModal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoTable;
