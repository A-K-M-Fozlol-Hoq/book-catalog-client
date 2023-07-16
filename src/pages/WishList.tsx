import { useGetWishListQuery, useRemoveFromWishListMutation } from "@/redux/features/wishList/wishListApi";
import { useAppSelector } from "@/redux/hook";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface Book {
  book:{
    title: string;
    author: string;
    publicationDate: string;
    _id: string;
  },
}

const WishList: React.FC = () => {
  
  const [removeFromList, {  isError:removeIsError,  isSuccess:removeIsSuccess }] = useRemoveFromWishListMutation();
  const { user } = useAppSelector((state) => state.user);
  const { data:wishList, isLoading: getIsLoading } = useGetWishListQuery({email: user?.email, accessToken: sessionStorage.getItem('accessToken')});
  
  
  useEffect(()=>{
    if(removeIsError){
      toast("Failed to remove fromwish list", {
        autoClose: 2500,
        type: "error",
      });
    }

    if(removeIsSuccess){
      toast("Removed book from wish list successfully", {
        autoClose: 2500,
        type: "success",
      });
    }
    },[removeIsError, removeIsSuccess])

  const removeFromWishList = (book: Book) => {
    removeFromList({accessToken: sessionStorage.getItem("accessToken"), email: user?.email, bookId: book?.book?._id})
  };

  if(getIsLoading){
    return <p className='text-3xl font-bold mb-4 text-center'>Loading...</p>
  }

  if(!getIsLoading && !wishList?.data){
    return <p className='text-3xl font-bold mb-4 text-center'>No Books added at "wish list". Please add it from book details route</p>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Wish List</h2>
      {
        wishList?.data?.books?.length ?
        <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Book Title</th>
            <th className="px-4 py-2">Book Author</th>
            <th className="px-4 py-2">Book Publication Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishList?.data?.books?.map((book: Book, index: React.Key | null | undefined) => (
            <tr key={index}>
              <td className="border px-4 py-2">{book?.book?.title}</td>
              <td className="border px-4 py-2">{book?.book?.author}</td>
              <td className="border px-4 py-2">{book?.book?.publicationDate}</td>
              <td className="border px-4 py-2">
                <button
                  className="text-red-500"
                  onClick={() => removeFromWishList(book)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>:
      <p className='text-3xl font-bold mb-4 text-center'>You removed all books from "Currently Reading". Please add some books from book details route</p>
      }
      
    </div>
  );
};

export default WishList;
