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
    setBarcodes(lines);
  };

  const formatDisplayText = (text: string) => {
    if (text.length >= 2) {
      return `(${text.substring(0, 2)})${text.substring(2)}`;
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Barkod Oluşturucu
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Görüntüleme Modu
            </label>
            <select
              value={viewMode}
              onChange={(e) =>
                setViewMode(e.target.value as "single" | "triple")
              }
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="single">Tek Tek Görüntüle</option>
              <option value="triple">3'lü Görüntüle</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Barkod Verileri
            </label>
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Her satıra bir barkod verisi girin"
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
            />
          </div>

          <button
            onClick={generateBarcodes}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Barkodları Oluştur
          </button>
        </div>

        <div className="grid gap-2">
          {viewMode === "single"
            ? barcodes.map((data, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md w-[10cm] h-[5cm]"
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <Barcode
                      value={data}
                      format="CODE128B"
                      renderer="img"
                      text={formatDisplayText(data)}
                    />
                  </div>
                </div>
              ))
            : Array.from({ length: Math.ceil(barcodes.length / 3) }).map(
                (_, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="bg-white rounded-lg shadow-md w-[10cm] h-[15cm]"
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
                              format="CODE128B"
                              renderer="img"
                              text={formatDisplayText(data)}
                            />
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
