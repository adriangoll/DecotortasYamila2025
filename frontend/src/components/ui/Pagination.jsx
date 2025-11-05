// src/components/ui/Pagination.jsx
export default function Pagination({ page=1, totalPages=1, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex gap-2 justify-center mt-6">
      <button disabled={page<=1} onClick={() => onPageChange(page-1)} className="px-3 py-1 rounded border">Prev</button>
      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)} className={`px-3 py-1 rounded ${p===page ? 'font-bold underline' : 'border'}`}>{p}</button>
      ))}
      <button disabled={page>=totalPages} onClick={() => onPageChange(page+1)} className="px-3 py-1 rounded border">Next</button>
    </div>
  );
}
