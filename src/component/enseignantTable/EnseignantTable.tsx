"use client";

import Image from "next/image";
import { useState } from "react";

type EnseingantType = {
  id: string;
  nom: string;
  email: string;
  image: string;
  modules: string;
  classes: string;
  telephone: string;
  adresse: string;
};

const EnseignantTable = ({
  enseignants,
}: {
  enseignants: EnseingantType[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtrer les enseignants selon la recherche
  const filteredEnseignants = enseignants.filter(
    (enseignant) =>
      enseignant.nom.toLowerCase().includes(search.toLowerCase()) ||
      enseignant.email.toLowerCase().includes(search.toLowerCase()) ||
      enseignant.modules.toLowerCase().includes(search.toLowerCase()) ||
      enseignant.classes.toLowerCase().includes(search.toLowerCase()) ||
      enseignant.adresse.toLowerCase().includes(search.toLowerCase()) ||
      enseignant.telephone.includes(search)
  );

  // Pagination
  const totalPages = Math.ceil(filteredEnseignants.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEnseignants = filteredEnseignants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full mt-16 gap-10 flex flex-col justify-start items-center">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold mb-4">Liste des Enseignants</h1>
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Rechercher..."
            className="border rounded p-2 w-1/3"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="text-green-500 text-2xl" onClick={toggleModal}>
            +
          </button>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="p-2">Infos</th>
              <th className="p-2">ID_Enseignant</th>
              <th className="p-2">Modules</th>
              <th className="p-2">Classes</th>
              <th className="p-2">Téléphone</th>
              <th className="p-2">Adresses</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEnseignants.map((enseignant) => (
              <tr key={enseignant.id} className="border-b-2 border-b-gray-400">
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    {enseignant.image ? (
                      <img
                        src={enseignant.image}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <img
                        src="/icons/default-avatar.png"
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <div>{enseignant.nom}</div>
                      <div className="text-sm text-gray-500">
                        {enseignant.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-2">{enseignant.id}</td>
                <td className="p-2">{enseignant.modules}</td>
                <td className="p-2">{enseignant.classes}</td>
                <td className="p-2">{enseignant.telephone}</td>
                <td className="p-2">{enseignant.adresse}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Image
                      src="/icons/pencil.png"
                      alt="delete"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/icons/eye.png"
                      alt="delete"
                      width={20}
                      height={20}
                    />
                    <Image
                      src="/icons/delete.png"
                      alt="delete"
                      width={20}
                      height={20}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <div>
            Page {currentPage} sur {totalPages}
          </div>
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>
      {/* Overlay et formulaire modal pour Enseignant */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-white rounded-lg p-2 shadow-lg lg:px-8 lg:py-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-center">
              Créer un nouveau Enseignant
            </h2>
            <form>
              <div className="flex flex-col gap-1 mt-6">
                <div className="text-lg font-medium">
                  Informations d’hauthentification
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <div className="w-full h-[2px] bg-black"></div>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="">
                  <label className="block text-gray-700 mb-2">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    placeholder="Entrez un nom d'utilisateur"
                    className="w-[260px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="enseignant@gmail.com"
                    className="w-[260px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="">
                  <label className="block text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    placeholder="Entrez un mot de passe"
                    className="w-[260px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-6">
                <div className="text-lg font-medium">
                  Informations d’hauthentification
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <div className="w-full h-[2px] bg-black"></div>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="">
                  <label className="block text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    placeholder="Entrez un nom"
                    className="w-[260px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="">
                  <label className="block text-gray-700 mb-2">Prenom</label>
                  <input
                    type="text"
                    placeholder="Entrez un prénom"
                    className="w-[260px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="">
                  <label className="block text-gray-700 mb-2">
                    N° de téléphone
                  </label>
                  <input
                    type="tel"
                    placeholder="Entrez un numéro de téléphone"
                    className="w-[260px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="">
                  <label className="block text-gray-700 mb-2">Adresse</label>
                  <input
                    type="text"
                    placeholder="Entrez une adresse"
                    className="w-[260px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="">
                  <label className="block text-gray-700 mb-2">
                    Groupe Sanguin
                  </label>
                  <input
                    type="text"
                    placeholder="AB+"
                    className="w-[260px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="">
                  <label className="block text-gray-700 mb-2">
                    Date de naissance
                  </label>
                  <input
                    type="date"
                    placeholder="Choisir une date de naissance"
                    className="w-[260px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="flex justify-around items-center w-full mt-4">
                <div className="">
                  <label className="block text-gray-700 mb-2" htmlFor="sexe">
                    Sexe
                  </label>
                  <select
                    className="w-[260px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    id="sexe"
                  >
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/icons/add.png" alt="" width={30} height={30} />
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="image">
                      Ajouter une photo
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="hidden"
                      id="image"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-5">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                  Soumettre
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                >
                  Fermer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnseignantTable;
