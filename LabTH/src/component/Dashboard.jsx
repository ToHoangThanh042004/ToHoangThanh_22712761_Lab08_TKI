
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import axios from "axios";

// Main Dashboard Layout
// Overview Component
import ShoppingCart from "../assets/Button 1509.png";
import DollarSign from "../assets/Button 1529.png";
import UserPlus from "../assets/Button 1530.png";
import square from "../assets/Squares four 1.png";
function Overview() {
  const [items, setItems] = useState([]);
  const iconMap = {
    cart: <img src={ShoppingCart} alt="Cart" className="w-6 h-6" />,
    dollar: <img src={DollarSign} alt="Dollar" className="w-6 h-6" />,
    user: <img src={UserPlus} alt="User" className="w-6 h-6" />,
  };

  useEffect(() => {
    fetch("http://localhost:3001/overview")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="p-4">
      <img src={square} alt="" />
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item) => {
          let bgColor = "bg-white text-black";
          const title = item.title?.toLowerCase();
          if (title.includes("turnover")) bgColor = "bg-pink-500 text-white";
          else if (title.includes("profit")) bgColor = "bg-green-500 text-white";
          else if (title.includes("customer")) bgColor = "bg-blue-100 text-blue-900";

          return (
            <div key={item.id} className={`rounded-2xl p-4 shadow-sm border ${bgColor}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm">{item.title}</p>
                  <h3 className="text-2xl font-bold">
                    {item.unit}
                    {item.value.toLocaleString()}
                  </h3>
                  <p className="text-sm mt-1">{item.change}% period of change</p>
                </div>
                <div className="p-2 bg-white rounded-full">
                  {iconMap[item.icon?.toLowerCase()]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const baseClass = "px-4 py-2 text-left rounded-xl";

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-sm text-gray-700 grid grid-cols-[250px_1fr]">
      {/* Sidebar */}
      <aside className="bg-white p-4 flex flex-col gap-4 shadow">
        <div className="text-2xl font-bold mb-6 text-pink-600">Logo</div>
        <nav className="flex flex-col gap-3">
          <a href="/" className={`${baseClass} hover:text-pink-600`}>
            Dashboard
          </a>
          <a href="/projects" className={`${baseClass} hover:text-pink-600`}>
            Projects
          </a>
          <a href="/teams" className={`${baseClass} hover:text-pink-600`}>
            Teams
          </a>
          <a href="/analytics" className={`${baseClass} hover:text-pink-600`}>
            Analytics
          </a>
          <a href="/messages" className={`${baseClass} hover:text-pink-600`}>
            Messages
          </a>
          <a href="/integrations" className={`${baseClass} hover:text-pink-600`}>
            Integrations
          </a>
        </nav>
        <div className="mt-auto bg-indigo-100 p-3 rounded-xl text-center">
          <p className="font-semibold mb-2">V2.0 is available</p>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-full">Try now</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-6 grid grid-rows-[auto_auto_1fr] gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-pink-600">Dashboard</h1>
          <div className="flex gap-4 items-center">
            <input type="text" placeholder="Search..." className="border rounded-lg px-3 py-1" />
          </div>
        </div>

        {/* Placeholder for Main Content */}
        <div className="bg-white rounded-xl shadow p-4">
        <Overview />

          <p className="text-gray-700">Main content goes here...</p>
        </div>
      </main>
    </div>
  );
}
// End of Dashboard Layout
