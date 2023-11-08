export const Board = () => {
  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      {Array.from({ length: 16 }, (_, index) => (
        <div key={index} className="h-10 w-10 bg-slate-300"></div>
      ))}
    </div>
  );
};
