// "use client";
// import { useFileById, useFileProducts } from "@/hooks/fetsh-data";
// import { useParams } from "next/navigation";
// import React, { useEffect } from "react";

// export default function FileView() {
//   const params = useParams();
//   const fileId = params.id;
//     const { data: file, isPending, isError, refresh } = useFileById(fileId);
//         const {
//           data: products,
//           productsIsPending,
//           productsIsError,
//           productsRefresh,
//         } = useFileProducts(fileId);


//   return <div>{file && file.non_client}</div>;
// }
"use client";
import { useEmployesByFileId, useFileById, useFileProducts, useMaterialByFileId } from "@/hooks/fetsh-data";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function FileView() {
const params = useParams();
const fileId = params.id;
    
const { data: file, isPending } = useFileById(fileId);
const { data: products, productsIsPending } =useFileProducts(fileId);
const { data: materials, materialsIsPending } = useMaterialByFileId(fileId);
// const { data: employees, employeesIsPending } = useEmployesByFileId(fileId);
           useEffect(() => {
             console.log("materials : ", materials);
           }, [materials]); 
    
        useEffect(() => {
          console.log("selected file : ", file);
        }, [file]);
        useEffect(() => {
              console.log("selected products : ", products);
            }, [products]);
    
    
  if (isPending || productsIsPending) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!file) {
    return <div className="flex justify-center p-8">File not found</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* File Information Card */}
      <Card>
        <CardHeader className="flex text-xl">
          <CardTitle>Production File Details</CardTitle>
          <CardDescription>
            <Badge
              variant={file.etat_fiche === "finie" ? "default" : "destructive"}
            >
              {file.etat_fiche}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
          <div className="flex justify-between">
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">Client</p>
              <p>{file.nom_client}</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">Atelier</p>
              <p>{file.nom_atelier}</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">Departement</p>
              <p>{file.nom_departement}</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">Numero BC</p>
              <p>{file.num_bc}</p>
            </div>
            <div className="space-y-2">
              {/* <p className="font-medium text-muted-foreground">Status</p> */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      {/* <Card className="p-0 overflow-hidden">
        {products && products.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Quantite</TableHead>
                <TableHead>Largeur</TableHead>
                <TableHead>Hauteur</TableHead>
                <TableHead>Detailes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-background">
              {products.map((product) => (
                <TableRow
                  key={product.id_detail_commande}
                  className="hover:bg-secondary/50"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {product.designation_produit}
                      {product.description_produit && (
                        <span className="text-xs text-muted-foreground">
                          ({product.description_produit})
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="min-w-[50px] justify-center"
                    >
                      {product.quantite || "-"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.largeur ? (
                      <span>{product.largeur} mm</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {product.epaisseur ? (
                      <span>{product.epaisseur} mm</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {product.details || (
                      <span className="text-muted-foreground">No details</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground">
            No products associated with this file
          </p>
        )}
      </Card> */}
      <Card className="p-4">
        <CardHeader className="p-0 pb-4">
          <CardTitle>Produits associser</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card
                  key={product.id_detail_commande}
                  className="hover:shadow-md transition-shadow bg-background"
                >
                  <CardContent className="p-4 space-y-3 ">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">
                        {product.designation_produit}
                      </h3>
                      <Badge variant="outline" className="ml-2">
                        {product.quantite || "0"}
                      </Badge>
                    </div>

                    {product.description_produit && (
                      <p className="text-sm text-muted-foreground">
                        {product.description_produit}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Largeur</p>
                        <p>{product.largeur ? `${product.largeur} mm` : "-"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Hauteur</p>
                        <p>
                          {product.epaisseur ? `${product.epaisseur} mm` : "-"}
                        </p>
                      </div>
                    </div>

                    {product.details && (
                      <div className="pt-2 border-t">
                        <p className="text-sm text-muted-foreground">
                          Details:
                        </p>
                        <p className="text-sm">{product.details}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Pas de produits associs avec cette fiche
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Materials Used</CardTitle>
        </CardHeader>
        <CardContent>
          {materials && materials.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map((material) => (
                  <TableRow
                    key={`${material.id_fiche_production}-${material.id_matiere}`}
                  >
                    <TableCell className="font-medium">
                      {material.designation_matiere}
                    </TableCell>
                    <TableCell>{material.quantite}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">
              No materials recorded
              {materials && console.log("Materials data:", materials)}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Employees Section */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Employees Worked</CardTitle>
        </CardHeader>
        <CardContent>
          {employees && employees.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Workshop</TableHead>
                  {file.etat_fiche === 'finie' && <TableHead>Hours Worked</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={`${employee.id_fiche_production}-${employee.id_employe}`}>
                    <TableCell className="font-medium">
                      {employee.nom_employe} {employee.prenom_employe}
                    </TableCell>
                    <TableCell>{employee.nom_atelier}</TableCell>
                    {file.etat_fiche === 'finie' && (
                      <TableCell>{employee.heures_travaillees || 'Not recorded'}</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">No employees recorded</p>
          )}
        </CardContent>
      </Card> */}
    </div>
  );
}