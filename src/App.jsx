import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradient, setGradient] = useState([]);

  useEffect(() => {
    generateGradient();
  }, [num, type]);

  const generateGradient = () => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const col1 = getHexColorCode();
      const col2 = getHexColorCode();
      const deg = Math.floor(Math.random() * 360);
      if (type === "linear") {
        colors.push({
          gradientCollection: `linear-gradient(${deg}deg, ${col1}, ${col2})`,
          css: `background: 'linear-gradient(${deg}deg, ${col1}, ${col2}) '`,
        });
      } else {
        colors.push({
          gradientCollection: `radial-gradient(circle, ${col1}, ${col2})`,
          css: `background: 'radial-gradient("circle" ${col1}, ${col2}) '`,
        });
      }
    }
    console.log(colors);

    setGradient(colors);
  };

  const onCopy = (css) => {
    navigator.clipboard.writeText(css);
    toast.success("Gradient Code Copied");
  };

  const getHexColorCode = () => {
    const rbg = 255 * 255 * 255;
    const random = Math.floor(Math.random() * rbg);
    const hexCode = random.toString(16);
    const colorHex = hexCode.padStart(6, 0);
    return `#${colorHex}`;
  };
  return (
    <>
      <div className="min-h-screen py-10">
        <div className="w-9/12 mx-auto space-y-12">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">Gradient Generator</h1>
            <div className="flex gap-4">
              <input
                className="border bg-white border-slate-300 rounded-2xl w-[100px] p-2"
                type="text"
                name=""
                id=""
                placeholder={num}
                onChange={(e) => setNum(Number(e.target.value))}
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border bg-white border-slate-300 rounded-2xl w-[100px] p-2"
                name=""
                id=""
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
              <button
                className="bg-rose-500 px-8 py-2 text-2xl font-semibold text-white rounded-2xl hover:bg-rose-700"
                onClick={generateGradient}
              >
                More Gradient
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
            {gradient.map((items, index) => (
              <div
                key={index}
                style={{ background: items.gradientCollection }}
                className="w-40 relative p-4 h-40 rounded-2xl"
              >
                <button
                  onClick={() => onCopy(items.css)}
                  className="bg-black/40 hover:text-black text-white absolute bottom-5 right-5 p-2 rounded-xl text-[10px]"
                >
                  COPY
                </button>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
