"use client";
import React from "react";
import PvTable from "./_data/pv-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePVs } from "@/hooks/fetsh-data";

export default function page() {
  return (
    <div className="w-full ">
      <div className="flex justify-between w-full p-2">
        <h1 className="text-3xl">PV</h1>
        <Link href="./pv/pvvalider" prefetch={true}>
          <Button variant={"outline"}>
            {/* <Plus /> */}
            Affiche les PV valider
          </Button>
        </Link>
      </div>
      <div>
        <PvTable />
      </div>
    </div>
  );
}
