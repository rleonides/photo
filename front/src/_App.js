import React from "react";
import {saveAs} from 'file-saver';
import zip  from 'jszip';
import fondo from "./images/fondo.jpg";
import rudy from "./images/Rudy.jpg";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import store from "./client/store.js";
import Send from "./client/send";
//import { Provider, connect } from "react-redux";
import { SiGmail } from "react-icons/si";
import "./styles/gallery.css";
import "./AppStripe.css";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import {
  BsChevronDoubleRight,
  BsChevronDoubleLeft,
  BsChevronDoubleDown,
  BsChevronDoubleUp,
  BsX,
} from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { CgShoppingCart } from "react-icons/cg";
const promise = loadStripe(
  "pk_test_51JQK47EPLWeDUJKNpEiPwz6JrPWY9vaAfsyDNAI0X596FOlVjKhSVNBCZ7EljmBcgULtXZ9tF4bG2xGA9TbmtW0a00iC12PgmI"
);

async function download (){
  let img = zip();
  let n = 0;
  let buf = await Send({buy: store.getState().buy});
  for(let i of buf.images)
  img.file(`Photo-${++n}.jpg`, Buffer.from(i).toString('base64'), { base64: true });
  img.generateAsync({ type: "blob" })
      .then(function (content) {
          saveAs(content, "Photos.zip");
      });
 
  

}

window.onclick = myFunction;

// If the user clicks in the window, set the background color of <body> to yellow
function myFunction() {
  let head = document.querySelector(".head");
  if(head.offsetHeight > 1)
  {
      
  head.style.height =  "0px";
  store.dispatch({type:'WIN-CLICK', disp:{up:'down'}})
  //head.classList.remove("display")
 }
 let tabscont = document.querySelector(".tabs-container");
 if(tabscont.classList.contains('trasl'))
{  tabscont.classList.remove('trasl')
store.dispatch({type:'WIN-CLICK', disp:{side:'back'}})
}
//console.log(up)
//store.dispatch({type:'WIN-CLICK', disp:{up,side}})
}


let i = 0;
let number = 0;
function buycount() {
  let j = 0;
  i = number;
  for (let b of store.getState().buy) {
    j += b.urls.length;
  }
  number = j;
  return i !== number;
}





class Header extends React.Component {
  state = {
    down: false,
    side: false,
  };

  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  onDownClick = (e) => {
    
    let head = document.querySelector(".head");
    let c = document.querySelector(".container");
    let bar = document.querySelector(".bar");
    let b = window.innerHeight - bar.offsetHeight;
   
    if (head.offsetHeight < 10) {
      head.style.height = Math.min(c.offsetHeight, b) + "px";     
      store.dispatch({type:'WIN-CLICK', disp:{up:'up'}})
    } else {
      head.style.height = "0px";
      store.dispatch({type:'WIN-CLICK', disp:{up:"down"}})
    }
   // e.stopPropagation()
    //this.setState({ down: down });
  };

  onSideClick = (e) => {
    let tabscont = document.querySelector(".tabs-container");
    let t = tabscont.classList.toggle("trasl");
    let tab = document.querySelector(".tabs").offsetHeight;
    let b = window.innerHeight - tab;
      tabscont.style.overflow = t && b < 60 ? "scroll" : "";
      if(t)store.dispatch({type:'WIN-CLICK', disp:{side:"side"}})
      else store.dispatch({type:'WIN-CLICK', disp:{side:"back"}})
   // this.setState({ side: !this.state.side, down: this.state.down });
    //console.log(this.state);
    e.stopPropagation()
  };

  onBuyClick = (title) => {
   
    store.dispatch({
      type: "OPEN_THREAD",
      title: title,
    });
  };

  render() {
    let i = 0;
    for (let b of store.getState().buy) {
      i += b.urls.length;
    }
    let active = store.getState().active;

    return (
      <header>
        <div className="head">
          <div className="container">
            <div className="about">
              <h4 className="text-white">About</h4>
              <p className="text-muted">
                On this page you can buy the photos that capture those moments
                of joy, sacrifice and emotion that you or someone else have gone
                through. The images are taken with excellent quality by the hand
                of a professional photographer.
              </p>
            </div>

            <div className="contact">
              <h4 className="">Contact</h4>
              <ul className="list-unstyled">
                <li>
                  <span>
                    <SiGmail />
                  </span>
                  <a href="https://twitter.com/" className="text-white">
                    Mail
                  </a>
                </li>
                <li>
                  <span>
                    <FaFacebookSquare />
                  </span>

                  <a
                    href="https://www.facebook.com/rudy.resiete"
                    className="text-white"
                  >
                    Like on Facebook
                  </a>
                </li>
                <li>
                  <span>
                    <FaInstagramSquare />
                  </span>
                  <a
                    href="https://www.instagram.com/rodolfo_hdz_rdz/"
                    className="text-white"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bar">
          <div className="bar-1" onClick={this.onSideClick}>
            <span>
              {store.getState().windClick.side==='side' ? (
                <BsChevronDoubleLeft />
              ) : (
                <BsChevronDoubleRight />
              )}
            </span>
          </div>

          <div
            className={`bar-2 ${active === "buy" ? "active" : ""}`}
            onClick={() => {
              this.onBuyClick("buy");
            }}
          >
            <span className="count">{i}</span>
            <span>
              <CgShoppingCart />
            </span>
          </div>

          <div className="bar-3" onClick={this.onDownClick}>
            <span>
              {store.getState().windClick.up==='up' ? (
                <BsChevronDoubleUp />
              ) : (
                <BsChevronDoubleDown />
              )}
            </span>
          </div>
        </div>
      </header>
    );
  }
}

let SingleTabs = (props) => {
  return (
    <div className="tabs-container" onClick={ (e) =>(e.stopPropagation()) }>
      <div className="tabs">
        <div
          onClick={() => {
            props.onClick("All");
          }}
        >
          <div className={props.active === "All" ? "active" : ""}>
            <span>{"All"}</span>
          </div>
        </div>
        {props.titles.map((title, index) => (
          <div onClick={() => props.onClick(title)} key={index}>
            <div className={props.active === title ? "active" : ""}>
              <span>{title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

class Tabs extends React.Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  onClick = (title) => {
    store.dispatch({
      type: "OPEN_THREAD",
      title: title,
    });
  };
  render() {
    let titles = store.getState().threads.map((ele) => ele.title);
    let active = store.getState().active;
    return (
      <SingleTabs titles={titles} onClick={this.onClick} active={active} />
    );
  }
}

const Pic = (props) => {
  return (
    <div className={`pic ${props.purchased ? "purchased" : ""}`} key={props.index}>
      <img src={`/${props.url}`} alt="" />
      <div
        className={`buy-mark ${props.buy ? "active-buy" : ""}`}
        onClick={() => {
          props.markClick(props.title, props.url, props.buy);
        }}
      >
        <span> {props.buy ? <GrClose /> : "Buy"} </span>
      </div>
    </div>
  );
};

class Container extends React.Component {
 
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  markClick = (title, url, buy) => {
    store.dispatch({ type: "MARK-BUY", title: title, url: url, buy: buy });
  };

  onOpenPay = (n) => {
    buycount(); // reviso si ha variado de numero de fotos a comprar
    store.dispatch({
      type: "OPEN_PAY",
      promise: promise,
      number: n,
    });
  };

  render() {
    let arrPic = [];
    let buttonBuy = false;
    let state = store.getState();
    let threads = state.threads;
    let a = state.active;
    let buycont = 0;
    let notPurchased=0; 
    
    switch (a) {
      case "All": {
        threads.forEach((e) => {
          e.urls.forEach((u) => {
            arrPic.push({ title: e.title, url: u.url, buy: u.buy });
          });
        });
        break;
      }
      case "buy": {
        let i = 0;
        state.buy.forEach((e) => {
          e.urls.forEach((u) => {
            buycont++;
            let a = state.purchasedPhotos.find((e)=>e===u.url) 
            if(a) i++;
            let purchased = !!a;
            buttonBuy = !buttonBuy?!purchased&&true:true;
            arrPic.push({ title: e.title, url: u.url, buy: u.buy, purchased });
          });
        });
        notPurchased = buycont - i;
        break;
      }
      default: {
        let i = threads.find((t) => t.title === state.active);
        i.urls.forEach((u) => {
          arrPic.push({ title: i.title, url: u.url, buy: u.buy });
        });
      }
    }
   

    return (
      <div className="container-photos">
        <div
          className="top-content"
          style={{ backgroundImage: `url(${fondo})` }}
        >
          <div id="photo"  style={{ backgroundImage: `url(${rudy})` }}></div>
          <p>
            "La vida está formada por una secuencia de eventos que las imágenes
            en serie a veces reflejan mucho mejor" John Ingledew
          </p>
        </div>

        <div className="photo-gallery">
          {arrPic.map((e, index) => (
            <Pic
              key={index}
              url={e.url}
              buy={e.buy}
              title={e.title}
              markClick={this.markClick}
              purchased={e.purchased}
            />
          ))}
        </div>
        {a === "buy" && buycont > 0 ? (
          <div>
            <button
              className={`${!buttonBuy?'download-btn':''}`}
              type="submit"
              onClick={() => {
                buttonBuy?
                this.onOpenPay(notPurchased):
                download().then(() => { store.dispatch(
                  {
                    type: 'SUCCEED',
                    payload: store.getState().buy
                  }
                )});
                
                ;
              }}
            >
              {buttonBuy?'Buy':'Download'}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

class AppStripe extends React.Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  onClosePay = () => {
    buycount();
    store.dispatch({
      type: "CLOSE_PAY",
      status: "close",
      open: false,
      number: number,
    });
  };
  render() {
    let state = store.getState().pay;
    let open = state.open;
    return open ? (
      <div className="AppStripe">
        <span className="close" onClick={this.onClosePay}>
          <BsX />
        </span>
        <Elements stripe={state.loadStripe}>
          <CheckoutForm store={store} download ={download} />
        </Elements>
      </div>
    ) : (
      ""
    );
  }
}

const App = () => (
  <div>
    <Header />
    <Tabs />
    <Container />
    <AppStripe />
  </div>
);

/*  <div>
            <div id="photo" style={{ backgroundImage: `url(${img})` }}></div>
            <h2>Rudy's fotos</h2>
          </div>*/
export default App;
