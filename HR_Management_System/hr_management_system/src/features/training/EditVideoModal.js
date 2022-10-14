import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../utils/api";

export default function EditVideoModal({
  open,
  onClose,
  video,
  refreshKeyHandler,
}) {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [videoLink, setVideoLink] = useState(video.video);
  const history = useHistory();

  useEffect(() => {
    setTitle(video.title)
    setDescription(video.description)
    setVideoLink(video.video)
  }, [open])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    editVideo();
    onClose();
  };

  function editVideo() {
    console.log("id " + video.videoId);
    const editedVideo = {
      title: title,
      description: description,
      video: videoLink,
    };
    api.editVideo(video.videoId, editedVideo).then(response => alert(response.data))
  }

  return (
    video &&
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          onClose();
          // setRefreshKeyModal((oldKey) => oldKey + 1);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="bg-white relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-2"
                    >
                      Edit Video
                    </Dialog.Title>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit}>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700 mt-2"
                        >
                          Title
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="title"
                            name="title"
                            rows={1}
                            className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 mt-2"
                        >
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                        <label
                          htmlFor="link"
                          className="block text-sm font-medium text-gray-700 mt-2"
                        >
                          Link
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="link"
                            name="link"
                            rows={1}
                            className="mt-1 p-2 block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                            value={videoLink}
                            onChange={(e) => setVideoLink(e.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleSubmit}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
