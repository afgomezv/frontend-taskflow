import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { DashboardProject, User } from "@/types/index";
import { isManager } from "@/utils/policies";
import DeleteProjectModal from "./DeleteProjectModal";

type CardProjectProps = {
  project: DashboardProject;
  user: User;
};

export default function CardProject({ project, user }: CardProjectProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <ul
        role="list"
        className="divide-y divide-gray-100 border border-gray-100 bg-white shadow-lg"
      >
        <li className="flex justify-between gap-x-6 px-5 py-6">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto space-y-2">
              <div>
                {project.manager === user._id ? (
                  <p className="font-bold text-xs uppercase bg-ocean-deep/10 text-ocean-deep border-2 border-ocean-deep rounded-lg inline-block py-1 px-5">
                    Manager
                  </p>
                ) : (
                  <p className="font-bold text-xs uppercase bg-rose-flare/10 text-rose-flare border-2 border-rose-flare rounded-lg inline-block py-1 px-5">
                    Colaborador
                  </p>
                )}
              </div>
              <Link
                to={`/projects/${project._id}`}
                className="text-solar-amber cursor-pointer hover:underline text-3xl font-bold"
              >
                {project.projectName}
              </Link>
              <p className="text-sm text-gray-400 mt-2">
                <span className="font-bold">Cliente: </span>
                {project.clientName}
              </p>
              <p className="text-sm text-gray-400">{project.description}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-6">
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">opciones</span>
                <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    <Link
                      to={`/projects/${project._id}`}
                      className="block w-full px-3 py-1 text-sm leading-6 text-left text-gray-900 hover:bg-gray-100 cursor-pointer"
                    >
                      Ver Proyecto
                    </Link>
                  </Menu.Item>
                  {isManager(project.manager, user._id) && (
                    <>
                      <Menu.Item>
                        <Link
                          to={`/projects/${project._id}/edit`}
                          className="block w-full px-3 py-1 text-sm leading-6 text-left text-gray-900 hover:bg-gray-100 cursor-pointer"
                        >
                          Editar Proyecto
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          type="button"
                          className="block w-full px-3 py-1 text-sm leading-6 text-left text-red-500 hover:bg-red-50 cursor-pointer"
                          onClick={() => {
                            navigate(
                              location.pathname +
                                `?deleteProject=${project._id}`
                            );
                          }}
                        >
                          Eliminar Proyecto
                        </button>
                      </Menu.Item>
                    </>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
      </ul>
      <DeleteProjectModal />
    </>
  );
}
