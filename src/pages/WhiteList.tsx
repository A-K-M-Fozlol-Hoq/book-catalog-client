import React, { useState } from "react";

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<string[]>(["Book 1", "Book 2", "Book 3"]);
  const [newBook, setNewBook] = useState<string>("");

  const getWishlist = () => {
    // Simulate API call delay
    setTimeout(() => {
      setWishlist(["Book 1", "Book 2", "Book 3"]); // Replace with API data
    }, 500);
  };
  

  const handleAddToWishlist = () => {
    if (newBook.trim() !== "") {
      setWishlist([...wishlist, newBook]);
      setNewBook("");
    }
  };

  const removeFromWishlist = (book: string) => {
    // Simulate API call delay
    setTimeout(() => {
      setWishlist(wishlist.filter((b) => b !== book));
    }, 300);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
      <div className="flex mb-2">
        <input
          type="text"
          className="px-2 py-1 mr-2 border border-gray-400 rounded"
          placeholder="Enter book title"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddToWishlist}
        >
          Add to Wishlist
        </button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Book Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.map((book, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{book}</td>
              <td className="border px-4 py-2">
                <button
                  className="text-red-500"
                  onClick={() => removeFromWishlist(book)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
