import inside1 from "@/assets/5pillers.png"
import inside2 from "@/assets/commonInside.png"
import Image from "next/image";
import styles from "@/app/styles.module.css"
const InsideLittleCaliphs = () => {
    return (   
<div className="bg-[#FFF7F3] py-16 text-center">
<div className="relative z-10">
<h2 className={`text-4xl  text-black tracking-wider  ${styles.fontRozha}`}>
       Inside the Little Caliphs       <span className="relative inline-block mr-3">
             Box
             <span className="absolute left-0 bottom-0 w-full h-7 md:h-[15px] bg-yellow-200 -z-10"></span>
           </span>
     </h2>
</div>
     <p className={`text-black mt-2 max-w-lg mx-auto  ${styles.fontPoppins}`}>
       Peek inside a sample box—your reader’s bundle will be personalized just for them.
     </p>
     <div className="flex flex-row lg:flex-row justify-center items-center gap-2 mt-12 p-3">  
       {/* Left Group */}
       <div className="flex flex-col items-center text-center lg:w-[500px] ">
 
   <div >
   <Image src={inside1} alt="Bilal Cooks Daal" width={512} height={512}   />
   </div>
         <p className={`${styles.fontInter}`}>
         Five hand-picked books, including engaging picture books, activity books, and easy readers.
            </p>
       </div>
       
       {/* Right Group */}
   
         <div className="flex flex-col items-center text-center lg:w-[500px]">
            <Image
              src={inside2}
              alt="Bilal Cooks Daal"
              width={512}
              height={512}
             className="w-[600px] md:w-[470px]"
            />
            <p className={`${styles.fontInter} md:ml-20 md:mt-16 mt-5 lg:mt-0`}>
              Stickers, frameable artwork, and surprise extras.
            </p>
          </div>
 
   
     </div>
   </div>
    );
};

export default InsideLittleCaliphs;

