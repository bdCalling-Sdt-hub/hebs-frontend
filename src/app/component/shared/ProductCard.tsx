/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useFavouriteBooksMutation,
  useGetAllFavouritesBooksQuery,
} from "@/redux/features/books/bookApi";
import { useAppSelector } from "@/redux/hooks";
import { message } from "antd";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const ProductCard = ({ product,handleAddProduct}: { product: any ,handleAddProduct:any}) => {
  // console.log("availability",availability);
  // console.log("status",product.status);
  const [favouriteBook] = useFavouriteBooksMutation();
  const user = useAppSelector(selectCurrentUser);
  // const router = useRouter();
  // get fav books
  const { data: favouriteBooks,refetch } = useGetAllFavouritesBooksQuery(user?.userId);


  // add favrt book
  const handleFavourite = async (bookId: string) => {
    // console.log("clicked",bookId);

    if (!user?.userId || !bookId) {
      message.error("User or Book ID is missing");
      return;
    }
const userId = user?.userId
// console.log("user id:",user?.userId);
    try {
      // Call the mutation and wait for the response
      const res = await favouriteBook({ userId:userId, bookId:bookId });
      // console.log("Mutation Response:", res);
   

      // Assuming the message is inside `res.data` based on your mutation
      if (res?.data?.message) {
        message.success(res.data.message);
        refetch()
        // setFavorites(true)
      } else {
        message.error("Message not found in the response");
      }
    } catch (error:any) {
      message.error(error);
    }
  };
// console.log("product id",product._id);
// console.log("fav book",favouriteBooks?.data?.books);

const checkIfProductIdExists=(productId:string)=> {
  return favouriteBooks?.data?.books?.some((product:any) => product._id === productId);  
}
const result = checkIfProductIdExists(product._id);
// console.log(result);
  return ( 
    <div>
      <div
        className="rounded-lg p-3 flex flex-col cursor-pointer"
        // onClick={() => router.push(`/bookStore/${product.id}`)}  
      >
        <div className="relative h-48 mb-3 rounded-md bg-[#fffbeb]">
          <Link href={`/bookStore/${product._id}`}>
            <Image
              src={product.coverImage || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            />
          </Link>
          <button
            onClick={() => handleFavourite(product._id)}
            className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
            disabled={result}
          >
            <HeartIcon
              size={20}
              className={
                // favouriteBooks?.data?.books?.includes(product._id)
                result
                  ? "fill-red-500 text-red-500"
                  : "text-gray-500"
              }
            />
          </button>
        </div>

        {/* Add to Bag Button */}
        <button
      onClick={() => {
  handleAddProduct(product);
  // setProduct(product);
}}

          className="w-full py-2 bg-[#ffd6d6] text-black rounded-md text-sm font-medium mb-2 hover:bg-[#ffbdbd] transition-colors"
        >
          Add to Bag
        </button>

        <h3 className="text-sm font-medium line-clamp-2 mb-1">
          {product.name}
        </h3>
        <p className="text-sm">${product.price.amount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
