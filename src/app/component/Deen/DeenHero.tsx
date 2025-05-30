/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import packaging from "@/assets/deenBox.png"
import styles from "@/app/styles.module.css"
import Link from "next/link";
export default function DeenHero() {
    return (
      <div className=" bg-white">
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:py-24 }`}>
          <div className="flex flex-col-reverse md:flex-row md:gap-12 justify-center items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-1 text-center md:text-start">
              <h1 className={`text-2xl md:text-4xl xl:text-5xl tracking-wide  text-gray-900  ${styles.fontRozha}`}>Deen Discoverers Box</h1>
  
              <div className="space-y-1">
                <p className={`text-xl md:text-xl xl:text-2xl text-gray-600  ${styles.poppins}`}>7-8 years</p>
  
                <div className="flex items-baseline justify-center md:justify-start  space-x-2">
                  <p className={`text-xl text-gray-70  ${styles.poppins}`}>Subscription cost per box |</p>
                  <p className={`text-2xl font-semibold text-gray-900 ${styles.fontPoppins}`}>$14.99</p>
                </div>
              </div>
              <Link href={"/name"}>
              
             <div className="mt-2 mb-1"> 
             <button className={`inline-flex items-center px-8 py-3 text-lg font-bold  uppercase tracking-widest text-white bg-red-400 hover:bg-red-500 rounded-full transition-colors duration-150  ${styles.fontPoppins}`}>
                Get Started
              </button>
             </div>   
              </Link>
  
              <p className={`text-sm text-[#181816] italic  ${styles.fontPoppins}`}>
                *Average cost to keep 3 of 5 books in each box is $38. Easy, free returns. Cancel anytime.
              </p>
            </div>
  
            {/* Right Column - Book Box Image */}
            <div>
              <div >
        
                    <div className="">
                      <Image
                        src={packaging}
                        alt="The Quiet Book"
                        width={723}
                        height={366}
                        className="object-cover rounded "
                      />
                    </div>
  
          
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  