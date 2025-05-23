"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays, Trash2, PlusCircle } from "lucide-react";

const AvailabilitySelector = ({ onChange }: { onChange: (availability: any[]) => void }) => {
  const [weekendSelected, setWeekendSelected] = useState(false);
  const [weekdays, setWeekdays] = useState<string[]>([]);
  const [customRanges, setCustomRanges] = useState<{ from: Date | null; to: Date | null }[]>([]);

  const toggleWeekday = (day: string) => {
    setWeekdays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addCustomRange = () => {
    setCustomRanges([...customRanges, { from: null, to: null }]);
  };

  const updateCustomRange = (index: number, key: "from" | "to", value: Date | null) => {
    const updated = [...customRanges];
    updated[index][key] = value;
    setCustomRanges(updated);
  };

  const removeCustomRange = (index: number) => {
    const updated = [...customRanges];
    updated.splice(index, 1);
    setCustomRanges(updated);
  };

  const emitAvailability = () => {
    const availability: any[] = [];

    if (weekendSelected) availability.push({ type: "weekend" });
    if (weekdays.length > 0) availability.push({ type: "week", days: weekdays });

    customRanges.forEach((range) => {
      if (range.from && range.to) {
        availability.push({ from: range.from.toISOString(), to: range.to.toISOString() });
      }
    });

    onChange(availability);
  };

  return (
    <div className="space-y-6 border border-gray-300 p-6 rounded-xl shadow-sm">
      <h3 className="text-2xl font-semibold text-gray-800">Disponibilidade</h3>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={weekendSelected}
          onChange={(e) => setWeekendSelected(e.target.checked)}
          className="accent-green-600 w-5 h-5"
        />
        <label className="text-gray-700 text-base font-medium">Disponível nos fins de semana</label>
      </div>

      <div>
        <p className="font-medium text-gray-800 mb-2">Dias da semana:</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {["monday", "tuesday", "wednesday", "thursday", "friday"].map((day) => (
            <label key={day} className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg shadow-sm hover:bg-green-50 cursor-pointer">
              <input
                type="checkbox"
                checked={weekdays.includes(day)}
                onChange={() => toggleWeekday(day)}
                className="accent-green-600"
              />
              <span className="capitalize text-sm text-gray-700">{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-medium text-gray-800">Datas específicas:</p>
        {customRanges.map((range, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <CalendarDays className="text-gray-500" />
              <DatePicker
                selected={range.from}
                onChange={(date) => updateCustomRange(index, "from", date)}
                selectsStart
                startDate={range.from}
                endDate={range.to}
                placeholderText="Início"
                className="border px-3 py-2 rounded-md w-full"
              />
              <span className="mx-1 text-gray-400">→</span>
              <DatePicker
                selected={range.to}
                onChange={(date) => updateCustomRange(index, "to", date)}
                selectsEnd
                startDate={range.from}
                endDate={range.to}
                placeholderText="Fim"
                className="border px-3 py-2 rounded-md w-full"
              />
            </div>
            <button
              type="button"
              onClick={() => removeCustomRange(index)}
              className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Remover</span>
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addCustomRange}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <PlusCircle className="w-5 h-5" />
          Adicionar intervalo de datas
        </button>
      </div>

      <button
        type="button"
        onClick={emitAvailability}
        className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 px-6 rounded-lg font-semibold shadow"
      >
        Confirmar Disponibilidade
      </button>
    </div>
  );
};

export default AvailabilitySelector;
