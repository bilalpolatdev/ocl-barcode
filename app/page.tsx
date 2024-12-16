"use client";

import React, { useState } from "react";
import Barcode from "react-barcode";
import { printBarcodes } from "./utils/printBarcodes";

const BarcodeGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [barcodes, setBarcodes] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"single" | "triple">("single");
  const [isGenerated, setIsGenerated] = useState(false);
  const [viewChanged, setViewChanged] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleViewModeChange = (value: "single" | "triple") => {
    setViewMode(value);
    setViewChanged(true);
    setTimeout(() => {
      setViewChanged(false);
    }, 800);
  };

  const generateBarcodes = () => {
    const lines = inputValue
      .split("\n")
      .filter((line) => line.trim().length > 0);
    setBarcodes(lines);
    setIsGenerated(true);
    setViewChanged(true);
    setTimeout(() => {
      setViewChanged(false);
    }, 800);
  };

  const formatDisplayText = (text: string) => {
    if (text.length >= 2) {
      return `(${text.substring(0, 2)})${text.substring(2)}`;
    }
    return text;
  };

  const handlePrint = () => {
    printBarcodes({ barcodes, viewMode });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Barcode Generator
      </h1>

      <div
        className={`
          max-w-[calc(400px+10cm+2rem)] mx-auto
          flex gap-8 transition-all duration-500 ease-in-out
          ${isGenerated ? "justify-between" : "justify-center"}
        `}
      >
        {/* Form Bölümü */}
        <div
          className={`
            w-[400px] shrink-0 transition-all duration-500
            ${isGenerated ? "translate-x-0" : "translate-x-[2rem]"}
          `}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Görüntüleme Modu
              </label>
              <select
                value={viewMode}
                onChange={(e) =>
                  handleViewModeChange(e.target.value as "single" | "triple")
                }
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="single">Tekli Görüntüle</option>
                <option value="triple">3&apos;lü Görüntüle</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Barkod Verileri
              </label>
              <textarea
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Her satıra bir barkod verisi girin"
                className="w-full h-40 p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 placeholder-gray-400 bg-gray-50"
              />
            </div>

            <button
              onClick={generateBarcodes}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 text-base shadow-md"
            >
              Barkodları Oluştur
            </button>
          </div>
          {/* Yazdırma butonu */}
          {barcodes.length > 0 && (
            <button
              onClick={handlePrint}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 text-base shadow-md"
            >
              Barkodları Yazdır
            </button>
          )}
        </div>

        {/* Barkodlar Bölümü */}
        {isGenerated && (
          <div
            className={`
              w-[10cm] overflow-auto transition-all duration-500
              ${
                isGenerated
                  ? "translate-x-0 opacity-100"
                  : "translate-x-[-calc(200px+1rem)] opacity-0"
              }
            `}
          >
            <div className="grid gap-4" key={viewMode}>
              {viewMode === "single"
                ? barcodes.map((data, index) => (
                    <div
                      key={index}
                      id={`barcode-${data}`}
                      className={`bg-white rounded-lg shadow-lg w-[10cm] h-[5cm] overflow-hidden border border-gray-200 
                        ${
                          index < 10 || viewChanged
                            ? "animate-fade-slide opacity-0"
                            : ""
                        }`}
                      style={
                        index < 10 || viewChanged
                          ? { animationDelay: `${index * 100}ms` }
                          : undefined
                      }
                    >
                      <div className="flex flex-col items-center justify-center h-full p-2">
                        <div className="scale-[0.7]">
                          <Barcode
                            value={data}
                            format="CODE128B"
                            renderer="svg"
                            text={formatDisplayText(data)}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : Array.from({ length: Math.ceil(barcodes.length / 3) }).map(
                    (_, groupIndex) => {
                      const isInFirstFiveGroups = groupIndex < 5;
                      return (
                        <div
                          key={groupIndex}
                          className={`bg-white rounded-lg shadow-lg w-[10cm] h-[15cm] border border-gray-200 
                            ${
                              isInFirstFiveGroups || viewChanged
                                ? "animate-fade-slide opacity-0"
                                : ""
                            }`}
                          style={
                            isInFirstFiveGroups || viewChanged
                              ? { animationDelay: `${groupIndex * 200}ms` }
                              : undefined
                          }
                        >
                          <div className="h-full grid grid-rows-3 divide-y divide-gray-200">
                            {barcodes
                              .slice(groupIndex * 3, groupIndex * 3 + 3)
                              .map((data, index) => (
                                <div
                                  key={index}
                                  id={`barcode-${data}`}
                                  className="bg-white flex flex-col items-center justify-center overflow-hidden p-2"
                                >
                                  <div className="scale-[0.7]">
                                    <Barcode
                                      value={data}
                                      format="CODE128B"
                                      renderer="svg"
                                      text={formatDisplayText(data)}
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      );
                    }
                  )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeGenerator;
