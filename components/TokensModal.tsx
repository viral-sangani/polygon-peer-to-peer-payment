import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { tokensList, useData } from "../contexts/DataContext";

interface TokensModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const TokensModal: React.FC<TokensModalProps> = ({
  children,
  closeModal,
  isOpen,
}) => {
  const { updateSelectedToken } = useData();
  return (
    <>
      {children}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-700 border border-gray-600 shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Select Token
                </Dialog.Title>
                <div className="flex flex-col mt-4 space-y-1">
                  {tokensList.map((item) => {
                    return (
                      <div
                        className="flex flex-row items-center space-x-3 hover:bg-gray-600 py-2 px-3 rounded-2xl cursor-pointer"
                        onClick={() => {
                          updateSelectedToken(item);
                          closeModal();
                        }}
                      >
                        {item.logo ? (
                          <img
                            className="w-7 h-7 border rounded-full"
                            src={item.logo}
                          />
                        ) : (
                          <div className="w-7 h-7 border rounded-full text-white flex justify-center items-center font-bold">
                            {item.symbol[0]}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-lg leading-5 font-medium text-white">
                            {item.symbol}
                          </span>
                          <span className="text-xs leading-5 text-white">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TokensModal;
