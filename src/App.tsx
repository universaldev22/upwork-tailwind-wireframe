import { useState, ChangeEvent } from "react";
import { Card, ToggleSwitch } from "flowbite-react";
import {
  Briefcase,
  Gamepad,
  BarChart2,
  Cpu,
  Monitor,
  Server,
  MemoryStick,
  HardDrive,
  Zap,
} from "lucide-react";

// define the only valid extra keys
type ExtraKey = "white" | "rgb";
// map each extra key to a boolean
type Extras = Record<ExtraKey, boolean>;

export default function App() {
  const [budget, setBudget] = useState(1400);
  const [selectedUseCase, setSelectedUseCase] = useState("gaming");
  // annotate extras with our Extras type
  const [extras, setExtras] = useState<Extras>({
    white: false,
    rgb: false,
  });
  const [ramSize, setRamSize] = useState("Auto");

  const useCases = [
    {
      id: "workstation",
      name: "Workstation",
      Icon: Briefcase,
      description: "Content creation & rendering",
    },
    {
      id: "gaming",
      name: "Gaming",
      Icon: Gamepad,
      description: "High FPS gaming & VR",
    },
    {
      id: "office",
      name: "Office",
      Icon: BarChart2,
      description: "Productivity & web browsing",
    },
  ];

  const partsList = [
    { name: "CPU", model: "Intel Core i5-12600K", price: 279, Icon: Cpu },
    { name: "GPU", model: "RTX 3070", price: 499, Icon: Monitor },
    {
      name: "Motherboard",
      model: "B550 Gaming Plus",
      price: 129,
      Icon: Server,
    },
    { name: "RAM", model: "16GB DDR4-3600", price: 79, Icon: MemoryStick },
    {
      name: "Storage",
      model: "1TB NVMe + 2TB HDD",
      price: 129,
      Icon: HardDrive,
    },
    { name: "PSU", model: "850W 80+ Gold", price: 139, Icon: Zap },
  ];

  const categories = [
    { id: "entry", label: "Entry", range: "$500–$800", min: 500, max: 800 },
    {
      id: "mid",
      label: "Mid-Range",
      range: "$800–$1,500",
      min: 800,
      max: 1500,
    },
    { id: "high", label: "High-End", range: "$1,500+", min: 1500, max: 5000 },
  ];

  const activeCatId =
    categories.find((cat) => budget >= cat.min && budget < cat.max)?.id ||
    "mid";
  const totalCost = partsList.reduce((sum, p) => sum + p.price, 0);

  const handleBudgetChange = (e: ChangeEvent<HTMLInputElement>) =>
    setBudget(Number(e.target.value));

  // key is now typed as only "white" or "rgb"
  const toggleExtra = (key: ExtraKey) => {
    setExtras((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-white p-[36px] text-gray-900 md:p-[52px]">
      {/* Header */}
      <header className="mb-8 rounded-lg bg-gray-50 py-4 text-center">
        <h1 className="text-4xl font-bold text-blue-600">PC Builder</h1>
        <p className="mt-1 text-gray-700">
          Configure your perfect build with our intelligent part picker
        </p>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left Panel */}
        <div className="flex-1 space-y-6">
          {/* Budget Card */}
          <Card className="bg-white">
            <h2 className="text-lg font-medium">Budget</h2>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              ${budget.toLocaleString()}
            </p>
            <p className="mt-1 text-sm">Total Budget</p>

            <input
              type="range"
              min={500}
              max={5000}
              step={50}
              value={budget}
              onChange={handleBudgetChange}
              className="mt-4 h-2 w-full rounded-lg bg-gray-200 accent-blue-600"
            />
            <div className="mt-2 flex justify-between text-sm">
              <span>$500</span>
              <span>$5,000</span>
            </div>

            {/* Dynamic categories */}
            <div className="mt-4 flex border-t pt-4">
              {categories.map((cat) => {
                const sel = cat.id === activeCatId;
                return (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setBudget(Math.floor((cat.min + cat.max) / 2))
                    }
                    className={`flex-1 border py-3 text-center text-xs ${
                      sel
                        ? "border-blue-200 bg-blue-50 text-blue-600"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    <div className="font-medium">{cat.label}</div>
                    <div className="mt-1 text-xs">{cat.range}</div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Use Case Card */}
          <Card className="bg-white">
            <h2 className="mb-4 text-lg font-medium">Use Case</h2>
            <div className="flex">
              {useCases.map(({ id, name, Icon, description }) => {
                const sel = id === selectedUseCase;
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedUseCase(id)}
                    className={`flex-1 rounded border p-4 ${
                      sel
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-200 bg-white text-gray-700"
                    } flex flex-col items-center`}
                  >
                    <Icon className="mb-2 h-6 w-6" />
                    <span className="font-medium">{name}</span>
                    <span className="mt-1 text-xs">{description}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Extras & RAM */}
          <Card className="bg-white">
            <h2 className="mb-4 text-lg font-medium">Extras</h2>
            <div className="space-y-4">
              {[
                {
                  key: "white" as const,
                  label: "Full White PC",
                  sub: "White case and components",
                },
                {
                  key: "rgb" as const,
                  label: "RGB Lighting",
                  sub: "LED lighting effects",
                },
              ].map(({ key, label, sub }) => (
                <div className="flex items-center justify-between" key={key}>
                  <div>
                    <div className="font-medium">{label}</div>
                    <div className="text-sm text-gray-500">{sub}</div>
                  </div>
                  <ToggleSwitch
                    checked={extras[key]}
                    onChange={() => toggleExtra(key)}
                  />
                </div>
              ))}
            </div>

            <h3 className="mt-6 text-lg font-medium">RAM Size</h3>
            <div className="mt-2 flex flex-wrap gap-4">
              {["Auto", "16GB", "32GB", "64GB"].map((size) => {
                const sel = ramSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setRamSize(size)}
                    className={`rounded border px-4 py-2 ${
                      sel
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="flex w-full flex-col space-y-4 lg:w-1/3">
          <Card className="bg-white">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">PC Parts</h2>
              <span className="font-semibold text-blue-600">${totalCost}</span>
            </div>
            <div className="space-y-2">
              {partsList.map(({ name, model, price, Icon }) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-md border bg-white px-4 py-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-gray-100 p-2">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-medium">{name}</span>
                      <p className="text-sm text-gray-500">{model}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-blue-600">${price}</span>
                </div>
              ))}
            </div>
          </Card>
          <div className="flex items-center justify-between rounded-b-md border border-t-0 bg-white px-4 py-3">
            <span>Total Cost</span>
            <span className="font-semibold text-blue-600">${totalCost}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
