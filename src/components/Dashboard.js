import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [buyers, setBuyers] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [selectedBuyer, setSelectedBuyer] = useState("0");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // API base URL from environment
  const API_URL = process.env.REACT_APP_SERVICE_URL;

  useEffect(() => {
    // Set default date range (last 30 days)
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);

    fetchBuyers();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBuyers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/DropDown/GetBuyer`);
      setBuyers(response.data);
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  const fetchData = async () => {
    if (!selectedBuyer || !startDate || !endDate) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/Report/MRC_GET_OrderClosingDetail_forAuditSummaryDashboard`,
        {
          params: {
            buyerID: selectedBuyer,
            startDate,
            endDate,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  // Column configuration
  const columns = [
    { id: "slNo", label: "SL No" },
    { id: "buyerName", label: "Buyer Name" },
    { id: "totalOurReference", label: "Total Our Reference", align: "right" },
    { id: "poqty", label: "PO QTY", align: "right" },
    { id: "shipmentQTY", label: "Shipment QTY", align: "right" },
    { id: "Short/Excess", label: "Short/Excess", align: "right" },
    { id: "confirmFOB", label: "Confirm FOB", align: "right" },
    { id: "netFOB", label: "Net FOB", align: "right" },
    {
      id: "Difference FOB(Confirm-Net)",
      label: "Difference FOB(Confirm-Net)",
      align: "right",
    },
    {
      id: "Fabric Cost (As per Cost Sheet)",
      label: "Fabric Cost (As per Cost Sheet)",
      align: "right",
    },
    {
      id: "Fabric Imported Value (USD)",
      label: "Fabric Imported Value (USD)",
      align: "right",
    },
    {
      id: "Not Imported Fabric/(Dificit) from Fabric Budget (USD)",
      label: "Not Imported Fabric/(Dificit) from Fabric Budget (USD)",
      align: "right",
    },
    {
      id: "Fabric (Not Imported/Dificit) %",
      label: "Fabric (Not Imported/Dificit) %",
      align: "right",
    },
    {
      id: "Trims Cost (As per Cost Sheet)",
      label: "Trims Cost (As per Cost Sheet)",
      align: "right",
    },
    {
      id: "Trims Imported Value (USD)",
      label: "Trims Imported Value (USD)",
      align: "right",
    },
    {
      id: "Not Imported Trims/(Dificit) from Trims Budget (USD)",
      label: "Not Imported Trims/(Dificit) from Trims Budget (USD)",
      align: "right",
    },
    {
      id: "Trims (Not Imported/Dificit) %",
      label: "Trims (Not Imported/Dificit) %",
      align: "right",
    },
    {
      id: "serviceCostAsPerCostSheet",
      label: "Service Cost (As per Cost Sheet)",
      align: "right",
    },
    {
      id: "Service Consumed (USD)",
      label: "Service Consumed (USD)",
      align: "right",
    },
    {
      id: "Service Cost Not Spend/(Dificit)",
      label: "Service Cost Not Spend/(Dificit)",
      align: "right",
    },
    {
      id: "Service Cost Not Spend/(Dificit) %",
      label: "Service Cost Not Spend/(Dificit) %",
      align: "right",
    },
  ];

  // Format numbers with commas
  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen mt-10">
      <h1 className="text-xl font-bold mb-4 text-gray-800">
        Post Costing Analysis
      </h1>

      {/* Filter Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-3 rounded-lg shadow mb-4 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Buyer
            </label>
            <select
              value={selectedBuyer}
              onChange={(e) => setSelectedBuyer(e.target.value)}
              className="w-full p-1.5 text-xs border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="0">Select Buyer</option>
              {buyers.map((buyer) => (
                <option key={buyer.id} value={buyer.id}>
                  {buyer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-1.5 text-xs border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-1.5 text-xs border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded text-xs transition duration-200 disabled:bg-gray-400 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin mr-2 h-3 w-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Data Table Container */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden text-sm">
        <div className="overflow-x-auto max-h-[60vh]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className={`px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider ${
                      column.width
                    } ${column.align === "right" ? "text-right" : ""}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-xs">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-3 py-6 text-center"
                  >
                    <div className="flex justify-center">
                      <svg
                        className="animate-spin h-6 w-6 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  </td>
                </tr>
              ) : tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-blue-700 truncate">
                      {row.buyerName}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600 text-right">
                      {formatNumber(row.totalOurReference)}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600 text-right">
                      {formatNumber(row.poqty)}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600 text-right">
                      {formatNumber(row.shipmentQTY)}
                    </td>
                    <td
                      className={`px-3 py-2 whitespace-nowrap text-xs text-right ${
                        row["Short/Excess"] > 0
                          ? "text-green-600 font-medium"
                          : row["Short/Excess"] < 0
                          ? "text-red-600 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {formatNumber(row["Short/Excess"])}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600 text-right">
                      {parseFloat(row.confirmFOB).toFixed(3)}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600 text-right">
                      {parseFloat(row.netFOB).toFixed(3)}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600 text-right">
                      {parseFloat(row["Difference FOB(Confirm-Net)"]).toFixed(
                        3
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatNumber(row["Fabric Cost (As per Cost Sheet)"])}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatNumber(row["Fabric Imported Value (USD)"])}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatNumber(
                        row[
                          "Not Imported Fabric/(Dificit) from Fabric Budget (USD)"
                        ]
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {parseFloat(
                        row["Fabric (Not Imported/Dificit) %"]
                      ).toFixed(2)}
                      %
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatNumber(row["Trims Cost (As per Cost Sheet)"])}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatNumber(row["Trims Imported Value (USD)"])}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatNumber(
                        row[
                          "Not Imported Trims/(Dificit) from Trims Budget (USD)"
                        ]
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {parseFloat(
                        row["Trims (Not Imported/Dificit) %"]
                      ).toFixed(2)}
                      %
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatNumber(row.serviceCostAsPerCostSheet)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatNumber(row["Service Consumed (USD)"])}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatNumber(row["Service Cost Not Spend/(Dificit)"])}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {parseFloat(
                        row["Service Cost Not Spend/(Dificit) %"]
                      ).toFixed(2)}
                      %
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-3 py-4 text-center text-xs text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
