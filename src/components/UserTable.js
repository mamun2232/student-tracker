import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import EditModal from './EditModal'
import toast from "react-hot-toast";
const UserTable = ({ user, i }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isDelete, setIsDelete] = useState(false);
  const [mailSend , SedMailSend] = useState(false)
  const { _id, name, email, phone, hobby , sendMail } = user;
  
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function EditCloseModal() {
      setIsDelete(false);
  }

  function EditOpenModal() {
      setIsDelete(true);
  }
  
  const sendDataToEmailHundaler = (id) =>{
      fetch(`http://localhost:5000/sendEmail/${_id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((result) => {
                  console.log(result);
              if (result.modifiedCount > 0) {
                console.log(result);
                EditCloseModal();
                toast.success(`Student Data Send this ${email}.`);
              } else {
                toast.error("Student Data Update fail");
              }
            });

  }

  return (
    <tr className="bg-[#EEEEEE] text-center">
      <th className="p-4">
      <div class="form-control ">
  <label class="cursor-pointer label flex justify-center">
    <input type="checkbox" onClick={()=>sendDataToEmailHundaler(_id)} checked={sendMail} class="checkbox checkbox-accent" />
  </label>
</div>


      </th>
      <td className="p-4">{i + 1}</td>
      <td className="p-4">{name}</td>
      <td className="p-4">{phone}</td>
      <td className="p-4">{email}</td>
      <td className="p-4">{hobby}</td>
      <td className="p-4 flex justify-center gap-2">
        <span  onClick={() =>EditOpenModal()} className=" cursor-pointer text-2xl text-blue-800">
          <FaEdit />
        </span>
        <span
          onClick={() => openModal()}
          className=" cursor-pointer text-2xl text-red-500"
        >
          <MdDeleteForever />
        </span>
      </td>
      {isOpen && (
        <DeleteModal
          closeModal={closeModal}
          openModal={openModal}
          isOpen={isOpen}
          user={user}
        ></DeleteModal>
      )}
      
      {
      isDelete && <EditModal
      EditCloseModal={EditCloseModal}
      EditOpenModal={EditOpenModal}
          isDelete={isDelete}
          user={user}
      ></EditModal>
      }

    </tr>
  );
};

export default UserTable;
