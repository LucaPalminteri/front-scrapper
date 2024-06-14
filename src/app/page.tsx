"use client";
import { Product } from "@/types/types";
import { useState, ChangeEvent } from "react";

export default function Home() {
  // State to store the input value
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle input change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle button click
  const handleButtonClick = async () => {
    setLoading(true);
    // Use the searchTerm variable here for further processing
    console.log("Search Term:", searchTerm);

    try {
      let data = await fetch("http://localhost:4000/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: searchTerm }),
      });

      setProducts(await data.json());

      setLoading(false);
    } catch (error) {}
  };

  return (
    <main className="flex flex-col items-center justify-between">
      <h1 className="text-5xl pt-8 font-bold">Ratita</h1>
      <h2>Compara precios de productos y servicios para ahorrar tiempo y dinero.</h2>
      <div className="m-8 flex gap-4">
        <input
          className="indent-2 rounded-md"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          name="searchInput"
          id="searchInput"
        />
        <button className="bg-black text-white p-2 rounded-md" disabled={loading} onClick={handleButtonClick}>
          Buscar
        </button>
      </div>

      {products.length > 0 && <div className="font-semibold">{products.length} productos encontrados</div>}

      <div className="max-w-xl flex flex-col gap-2 my-8">
        {loading && <p>Cargando...</p>}
        {!loading &&
          products.length > 0 &&
          products.map((product, index) => (
            <div key={index} className="flex gap-2 border bg-[#FFF] rounded-md">
              <img src={product.image} alt={product.title} className="rounded-l-md" />
              <div className="flex flex-col p-2">
                <p className="text-xl font-semibold ">{product.title}</p>
                <p className="text-lg font-bold text-[#388E3C]">{product.priceString}</p>
                {product.hasDiscount && (
                  <span className="uppercase bg-gray-800 self-start p-1 text-white rounded-md mt-auto">oferta</span>
                )}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
