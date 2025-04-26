"use client"
import React, { useEffect } from "react";
import PvValideTable from "./_data/pv-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function page() {


  return (
    <div className="w-full ">
      <div className="flex justify-between w-full p-2">
        <h1 className="text-3xl">PV valider</h1>
      </div>
      <div>
        <PvValideTable />
      </div>
    </div>
  );
}
