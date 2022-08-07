import { BsCart3 } from "react-icons/bs";
import { IoIosAlbums } from "react-icons/io";

import logo from "./images/fotorodohdz_black1350.png";
import img1 from "./images/estilo.jpg";
import img2 from "./images/estilo2.jpg";
import img3 from "./images/stile3.jpg";
//
export default function App() {
  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-gradient">
      <div className="relative w-5/6 h-5/6 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-teal-400">
        <div className="relative w-full h-full shadow-md before:absolute before:w-20 before:h-20 before:bg-black before:-top-10 before:-left-10 after:absolute after:w-20 after:h-20 after:bg-black after:-bottom-10 after:-left-10 after:-z-0">
          <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-teal-400 border-b-2 backdrop-blur-md h-14">
            <div className="flex items-center justify-center px-1 py-1 ml-2 text-sm bg-black rounded-full shadow-lg text-slate-100 ">
              <IoIosAlbums className="mx-1 text-lg font-bold" />
              <span className="mx-1 ml-0 text-xs font-semibold">Albums</span>
            </div>

            <div className="px-1 mx-6 border border-slate-50 shrink">
              <img className="w-96 shrink" src={logo} alt="" />
            </div>

            <div className="flex items-center justify-center px-1 py-1 mr-2 bg-black rounded-full shadow-lg text-slate-100 ">
              <BsCart3 className="mx-1 text-lg font-bold" />
              <span className="mx-1 ml-0 text-xs font-semibold">Buy</span>
            </div>
          </nav>

          <section className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-slate-50 top-14 ">
            <Cards />
          </section>
        </div>
      </div>
    </div>
  );
}

function Cards(props) {
  return (
    <div className="relative flex items-center justify-center w-64 shadow-lg bg-slate-50 h-72" >
    <div className="relative w-52 h-5/6">
      <div className="relative z-10 flex items-center justify-center border borderx-slate-500 h-3/5 backdrop-blur-md before:absolute before:w-1/2 before:h-1/2 before:bg-teal-400">
        <img className="absolute w-2/5 bottom-3/4 left-1/4" src={img1} alt="" />
        <img className="absolute w-2/5 top-5 left-1" src={img2} alt="" />
        <img className="absolute w-2/5 top-1/3 right-1" src={img3} alt="" />
      </div>

      <div className="relative bg-orange-500 h-2/5">

      </div>
    </div>
    </div>
  );
}
