import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import toast from "react-hot-toast";

const DeleteModal = ({ closeModal, openModal, isOpen, user }) => {
  const { _id, name, email, phone, hobby } = user;
  const deleteHundeler = (id) => {
    fetch(`http://localhost:5000/user/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Student Delete SuccessFull");
          closeModal();
        } else {
          toast.error("Student Delete UnsuccessFull! Please try again");
        }
      });
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    Are You Sure Delete {name} Student ?
                  </Dialog.Title>

                  <div className="flex justify-center gap-3 mt-5">
                    <button
                      onClick={() => closeModal()}
                      className="px-8 py-2 bg-blue-50 rounded-lg"
                    >
                      NO
                    </button>
                    <button
                      onClick={() => deleteHundeler(_id)}
                      className="px-8 py-2 bg-red-50 rounded-lg"
                    >
                      Yes
                    </button>
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

export default DeleteModal;
