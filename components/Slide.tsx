export default function Slide({ slide, onChange }: any) {
  return (
    <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 text-white p-4 rounded-xl shadow">
      
      <input
        value={slide.title}
        onChange={(e) => onChange("title", e.target.value)}
        className="bg-transparent font-bold text-lg w-full mb-2 outline-none"
      />

      <textarea
        value={slide.content}
        onChange={(e) => onChange("content", e.target.value)}
        className="bg-transparent w-full h-full outline-none"
      />
    </div>
  );
}