import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const EditModal = ({ EditCloseModal, EditOpenModal, isDelete, user }) => {
  const { _id, name, email, phone, hobby } = user;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: { name: name, phone: phone, email: email, hobby: hobby },
  });

  const onSubmit = (data) => {
    fetch(`http://localhost:5000/user/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          console.log(result);
          EditCloseModal();
          toast.success("Student Data Update Successfull");
        } else {
          toast.error("Student Data Update fail");
        }
      });
  };

  return (
    <>
      <Transition appear show={isDelete} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={EditCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-center leading-6 text-gray-900"
                  >
                    Update a student Information
                  </Dialog.Title>
                  <div className="mt-2 flex justify-center">
                    <div className="form-control w-full max-w-xs">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        {/* name  */}

                        <div class="form-control w-full max-w-xs mr-4">
                          <label class="label">
                            <span class="label-text"> Name</span>
                          </label>
                          <input
                            {...register("name", {
                              required: {
                                value: true,
                                message: "Name is Required",
                              },
                            })}
                            type="text"
                            placeholder="Enter Name"
                            class="input input-bordered w-full max-w-xs"
                          />
                          <label class="label">
                            {errors.name?.type === "required" && (
                              <span className="text-red-500">
                                {errors.name.message}
                              </span>
                            )}
                          </label>
                        </div>

                        <div class="form-control w-full max-w-xs">
                          <label class="label">
                            <span class="label-text">Number</span>
                          </label>
                          <input
                            {...register("phone", {
                              required: {
                                value: true,
                                message: "Phone is Required",
                              },
                            })}
                            type="number"
                            placeholder="Enter Phone Number"
                            class="input input-bordered w-full max-w-xs"
                          />
                          <label class="label">
                            {errors.phone?.type === "required" && (
                              <span className="text-red-500">
                                {errors.phone.message}
                              </span>
                            )}
                          </label>
                        </div>

                        <div class="form-control w-full max-w-xs mr-4">
                          <label class="label">
                            <span class="label-text">Email</span>
                          </label>
                          <input
                            {...register("email", {
                              required: {
                                value: true,
                                message: "Email Required",
                              },
                            })}
                            type="email"
                            placeholder="Enter Email Address"
                            class="input input-bordered w-full max-w-xs"
                          />
                          <label class="label">
                            {errors.email?.type === "required" && (
                              <span className="text-red-500">
                                {errors.email.message}
                              </span>
                            )}
                          </label>
                        </div>

                        {/* price  */}
                        <div class="form-control w-full max-w-xs">
                          <label class="label">
                            <span class="label-text">Hobby</span>
                          </label>
                          <input
                            {...register("hobby", {
                              required: {
                                value: true,
                                message: "Hobby is Required",
                              },
                            })}
                            type="text"
                            placeholder="Enter Hobby"
                            class="input input-bordered w-full max-w-xs"
                          />
                          <label class="label">
                            {errors.hobby?.type === "required" && (
                              <span className="text-red-500">
                                {errors.hobby.message}
                              </span>
                            )}
                          </label>
                        </div>

                        {/* submit */}
                        <div className="text-center mt-4">
                          <input
                            className="btn w-full max-w-xs bg-blue-800 text-white border-0"
                            type="submit"
                            value="Update"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditModal;
