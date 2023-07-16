import { useEditCurrentlyReadingMutation, useGetCurrentlyReadingQuery, useRemoveFromCurrentlyReadingMutation } from "@/redux/features/currentlyReading/currentlyReadingApi";
import { useAppSelector } from "@/redux/hook";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

enum ReadingStatus {
  Reading = "reading",
  Finished = "finished",
}

interface Book {
  book:{
    title: string;
    author: string;
    _id: string;
  },
  status: ReadingStatus;
}

const CurrentlyReading: React.FC = () => {
  
  const [editList, {  isError:editIsError,  isSuccess:editIsSuccess }] = useEditCurrentlyReadingMutation();
  const [removeFromList, {  isError:removeIsError,  isSuccess:removeIsSuccess }] = useRemoveFromCurrentlyReadingMutation();
  const { user } = useAppSelector((state) => state.user);
  const { data:currentlyReading, isLoading: getIsLoading } = useGetCurrentlyReadingQuery({email: user?.email, accessToken: sessionStorage.getItem('accessToken')});
  
  
  useEffect(()=>{
    if(removeIsError){
      toast("Failed to remove from currently reading", {
        autoClose: 2500,
        type: "error",
      });
    }

    if(removeIsSuccess){
      toast("Removed book from currently reading successfully", {
        autoClose: 2500,
        type: "success",
      });
    }
    },[removeIsError, removeIsSuccess])

    useEffect(()=>{
      if(editIsError){
        toast("Failed to edit currently reading", {
          autoClose: 2500,
          type: "error",
        });
      }
  
      if(editIsSuccess){
        toast("Change updated successfully", {
          autoClose: 2500,
          type: "success",
        });
      }
      },[editIsError, editIsSuccess])

  const removeFromCurrentlyReading = (book: Book) => {
    removeFromList({accessToken: sessionStorage.getItem("accessToken"), email: user?.email, bookId: book?.book?._id})
    // setCurrentlyReading(currentlyReading.filter((b) => b !== book));
  };

  const handleStatusChange = (book: Book, newStatus: ReadingStatus) => {
    console.log(book, newStatus);
    const data ={
      email: user?.email, bookId: book?.book?._id, status: newStatus
    }
    editList({accessToken: sessionStorage.getItem('accessToken'), data})
  };

  if(getIsLoading){
    return <p className='text-3xl font-bold mb-4 text-center'>Loading...</p>
  }

  if(!getIsLoading && !currentlyReading?.data){
    return <p className='text-3xl font-bold mb-4 text-center'>No Books added at "Currently Reading". Please add it from book details route</p>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Currently Reading</h2>
      {
        currentlyReading?.data?.books?.length ?
        <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Book Title</th>
            <th className="px-4 py-2">Book Author</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentlyReading?.data?.books?.map((book: Book, index: React.Key | null | undefined) => (
            <tr key={index}>
              <td className="border px-4 py-2">{book?.book?.title}</td>
              <td className="border px-4 py-2">{book?.book?.author}</td>
              <td className="border px-4 py-2">
                <select
                  value={book.status}
                  onChange={(e) => handleStatusChange(book, e.target.value as ReadingStatus)}
                  className="bg-white border border-gray-400 rounded px-2 py-1"
                >
                  <option value={ReadingStatus.Reading}>reading</option>
                  <option value={ReadingStatus.Finished}>finished</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="text-red-500"
                  onClick={() => removeFromCurrentlyReading(book)}
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

export default CurrentlyReading;
