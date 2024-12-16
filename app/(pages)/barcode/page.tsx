"use client";

import React, { useState } from "react";
import Barcode from "react-barcode";

const BarcodeGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [barcodes, setBarcodes] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"single" | "triple">("single");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const generateBarcodes = () => {
    const lines = inputValue
      .split("\n")
      .filter((line) => line.trim().length > 0);

    const formattedLines = lines.map((line) => {
      if (line.length >= 2) {
        return `(${line.substring(0, 2)})${line.substring(2)}`;
      }
      return line;
    });
    setBarcodes(formattedLines);
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Barkod Oluşturucu
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            <select
              value={viewMode}
              onChange={(e) =>
                setViewMode(e.target.value as "single" | "triple")
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            >
              <option value="single">Tek Tek Görüntüle</option>
              <option value="triple">3'lü Görüntüle</option>
            </select>
          </div>
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Her satıra bir barkod verisi girin"
            className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
          />
          <button
            onClick={generateBarcodes}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Barkodları Oluştur
          </button>
        </div>

        <div className="grid gap-6">
          {viewMode === "single"
            ? // Tek tek görüntüleme
              barcodes.map((data, index) => (
                <div
                  key={index}
                  className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center justify-center"
                  style={{ width: "10cm", height: "5cm" }}
                >
                  <Barcode value={data} displayValue={false} format="CODE128" />
                  <div className="text-gray-800 font-mono text-[20px] -mt-1">
                    {data}
                  </div>
                </div>
              ))
            : // 3'lü görüntüleme
              Array.from({ length: Math.ceil(barcodes.length / 3) }).map(
                (_, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="bg-white p-2 rounded-lg shadow-md"
                    style={{ width: "10cm", height: "15cm" }}
                  >
                    <div className="h-full grid grid-rows-3">
                      {barcodes
                        .slice(groupIndex * 3, groupIndex * 3 + 3)
                        .map((data, index) => (
                          <div
                            key={index}
                            className="bg-white flex flex-col items-center justify-center"
                          >
                            <Barcode
                              value={data}
                              displayValue={false}
                              format="CODE128"
                            />
                            <div className="text-gray-800 font-mono text-[20px] -mt-1">
                              {data}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )
              )}
        </div>
      </div>
    </div>
  );
};

export default BarcodeGenerator;
