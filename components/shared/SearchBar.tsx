import Button from "@/components/ui/Button";

export default function SearchBar() {
  return (
    <form style={{ display: "flex", gap: "8px", marginTop: "16px", maxWidth: "520px" }}>
      <input
        type="text"
        placeholder="Cari lokasi, tipe, atau harga..."
        style={{ flex: 1, padding: "10px 12px", border: "1px solid #94a3b8", borderRadius: "8px" }}
      />
      <Button type="submit">Cari</Button>
    </form>
  );
}
