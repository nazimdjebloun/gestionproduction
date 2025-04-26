"use client";
import React from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useParams } from "next/navigation";
import { usePVById } from "@/hooks/fetsh-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ViewPvValid = ({  }) => {
  const componentRef = useRef();
  const params = useParams();
  const pvId = params.id;

const { data: pvData, isPending, isError, refresh } = usePVById(pvId);
    


  // Format date to locale string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

const handlePrint = useReactToPrint({
  contentRef: componentRef,
  pageStyle: `
    @page {
      size: A4;
      margin: 1cm;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
      }
    }
  `,
  documentTitle: `PV_${pvData?.pv?.id_pv?.slice(0, 8) || ""}`,
});

  if (!pvData) return <div>Loading PV data...</div>;

  return (
    <div className="p-4 flex justify-center flex-col items-center w-full">
      <Button
        onClick={handlePrint}
        variant="default"
        className=" px-4 py-2 rounded mb-4 print:hidden "
      >
        Imprimer le PV
      </Button>
      <div ref={componentRef} className="w-[60%] print:w-full">
        <Card className="p-8 shadow-lg print:shadow-none print:p-0 print:border-0 print:rounded-none print:bg-white ">
          {/* Header */}
          <div className="text-center mb-8 border-b pb-4">
            <h1 className="text-2xl font-bold">PROCES-VERBAL DE RECEPTION</h1>
            <p className="">N° PV: {pvData.pv.id_pv}</p>
          </div>

          {/* PV Info */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Informations du PV</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p>
                  <strong>Date de création:</strong>{" "}
                  {formatDate(pvData.pv.date_creation)}
                </p>
                <p>
                  <strong>État:</strong> {pvData.pv.etat_pv}
                </p>
              </div>
              <div>
                <p>
                  <strong>Réserve:</strong> {pvData.pv.reserve || "Aucune"}
                </p>
              </div>
            </div>
          </div>

          {/* Dossier Info */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Informations du Dossier
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>N° Bon de Commande:</strong> {pvData.dossier.num_bc}
                </p>
                <p>
                  <strong>État du dossier:</strong>{" "}
                  {pvData.dossier.etat_dossier}
                </p>
              </div>
              <div>
                <p>
                  <strong>ID Dossier:</strong> {pvData.dossier.id_dossier}
                </p>
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Informations Client</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Nom:</strong> {pvData.client.nom_client}
                </p>
                <p>
                  <strong>Adresse:</strong> {pvData.client.adresse_client}
                </p>
              </div>
              <div>
                <p>
                  <strong>Téléphone:</strong> {pvData.client.tel_client}
                </p>
                <p>
                  <strong>Email:</strong> {pvData.client.email_client}
                </p>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Détails des Produits</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="">
                  <th className="border p-2">Produit</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Quantité</th>
                  <th className="border p-2">Détails</th>
                </tr>
              </thead>
              <tbody>
                {pvData.details.map((detail, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-background" : "bg-accent"}
                  >
                    <td className="border p-2">
                      {detail.produit.designation_produit}
                    </td>
                    <td className="border p-2">
                      {detail.produit.description_produit}
                    </td>
                    <td className="border p-2 text-center">
                      {detail.detail_commande.quantite}
                    </td>
                    <td className="border p-2">
                      {detail.detail_commande.details || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-4 border-t ">
            <div className="flex justify-between">
              <div className="text-center  flex flex-col justify-center items-center">
                <p className="font-semibold">Singature Client</p>
              </div>
              <div className="text-center ">
                <p className="font-semibold">Singature Chef departement</p>
              </div>
            </div>
            <p className="text-center text-sm mt-8 ">
              PV généré le {formatDate(new Date())}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ViewPvValid;



// "use client";

// import { useRef } from "react";
// import { useReactToPrint } from "react-to-print";
// import { useParams } from "next/navigation";
// import { usePVById } from "@/hooks/fetsh-data";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// export default function ViewPvValid() {
//   const componentRef = useRef();
//   const params = useParams();
//   const pvId = params.id;

//   const { data: pvData, isPending, isError } = usePVById(pvId);

// const handlePrint = useReactToPrint({
//   contentRef: componentRef,
//   documentTitle: `PV_${pvData?.pv?.id_pv?.slice(0, 8) || ""}`,
// });


//   if (isPending) return <div>Loading...</div>;
//   if (isError || !pvData) return <div>Erreur lors du chargement</div>;

//   return (
//     <div className="flex flex-col items-center p-4">
//       <Button onClick={handlePrint} className="mb-4 print:hidden">
//         Imprimer le PV
//       </Button>

//       {/* IMPORTANT: ref directly on a div */}
//       <div ref={componentRef} className="w-full">
//         <Card className="p-8 shadow-lg">
//           <h1 className="text-2xl font-bold text-center mb-8">PROCES-VERBAL</h1>
//           <p className="text-center mb-4">N° PV: {pvData.pv.id_pv}</p>
//           {/* Example content */}
//           <p>
//             Date:{" "}
//             {new Date(pvData.pv.date_creation).toLocaleDateString("fr-FR")}
//           </p>
//           <p>Client: {pvData.client.nom_client}</p>
//           {/* You can add your full content here */}
//         </Card>
//       </div>
//     </div>
//   );
// }
