import { createStore,combineReducers } from "redux";

const api = async () => {
  const url = "/api/ini";
  return fetch(url, {
    method: "get",
    headers: {
      accept: "application/json",
    },
  })
    .then(checkStatus)
    .then((res) => res.json())
    .catch((e) => e);
};

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    const error = new Error(`HTTP Error ${res.statusText}`);
    error.status = res.statusText;
    error.response = res;
    throw error;
  }
}

const reducer = combineReducers({
  active: activeReducer,
  threads: threadsReducer,
  buy: buyReducer,
  pay: payReducer,
  windClick:  windClickReducer,
  purchasedPhotos: purchasedPhotosReducer,
});

function purchasedPhotosReducer(state = [], action){
  switch (action.type) {
    case "INIT":
      return action.payload.purchasedPhotos;
      case "SUCCEED": {
       // 
        let purchasedPhotos=[];
        let rdz=action.payload;
        rdz.forEach((e)=>{
          e.urls.forEach((f)=>{
             purchasedPhotos.push(f.url)
          })
        })
        let s = new Set([...state,...purchasedPhotos]);
        
        localStorage.rdz_keys= JSON.stringify([...s]);
        return [...s];

      }
          
      default: {
        return state;
      }
}
}

function windClickReducer(state = {}, action)
{
   if(action.type === 'WIN-CLICK'){
     return {side: action.disp.side||state.side,
       up:action.disp.up||state.up}
   }
   else return state
}

function payReducer(state = {}, action) {
  switch (action.type) {
    case "OPEN_PAY": {
      return {
        loadStripe: action.promise,
        status: "open",
        open: true,
        number: action.number,
      };
    }
    case "CLOSE_PAY":
      return {
        loadStripe: "",
        status: action.status,
        open: false,
        number: action.number,
      };
    case "SUCCEED": {
      return {
        loadStripe: "",
        status: "close",
        open: false,
        number: 0,
      };
    }
    default: {
      return state;
    }
  }
}

function activeReducer(state = "All", action) {
  if (action.type === "OPEN_THREAD") {
    return action.title;
  } else if(action.type === "SUCCEED")
  { return "All"} else {
    return state;
  }
}

function threadsReducer(state = [], action) {
  switch (action.type) {
    case "INIT":
      return action.payload.threads;
    case "MARK-BUY": {
      let titleIndex = state.findIndex((t) => action.title === t.title);
      let u = state[titleIndex].urls;
      // console.log(u)
      let urlIndex = u.findIndex((t) => action.url === t.url);
      let oldUrl = u[urlIndex];
      let newUrl = [
        ...u.slice(0, urlIndex),
        { url: oldUrl.url, buy: !oldUrl.buy },
        ...u.slice(urlIndex + 1, u.length),
      ];
      return [
        ...state.slice(0, titleIndex),
        { title: state[titleIndex].title, urls: newUrl },
        ...state.slice(titleIndex + 1, state.length),
      ];
    }
    case "SUCCEED": {
      let newstate = [];
      for (let t of state) {
        let newurls = [];
        for (let u of t.urls) {
          newurls.push({ url: u.url, buy: false });
        }
        newstate.push({ title: t.title, urls: newurls });
      }

      return newstate;
    }

    default: {
      return state;
    }
  }
}

function buyReducer(state = [], action) {
  let a = action.type;
  switch (a) {
    case "MARK-BUY": {
      let titleIndex = state.findIndex((t) => action.title === t.title);
     
      if (titleIndex !== -1) {
        let u = state[titleIndex].urls;
        //console.log(u)
        let urlIndex = u.findIndex((t) => action.url === t.url);
        if (urlIndex !== -1) {
          let newUrl = [
            ...u.slice(0, urlIndex),
            // { url: oldUrl.url, buy: !oldUrl.buy },
            ...u.slice(urlIndex + 1, u.length),
          ];
          return [
            ...state.slice(0, titleIndex),
            { title: state[titleIndex].title, urls: newUrl },
            ...state.slice(titleIndex + 1, state.length),
          ];
        } else {
          return [
            ...state.slice(0, titleIndex),
            {
              title: state[titleIndex].title,
              urls: u.concat({ url: action.url, buy: true }),
            },
            ...state.slice(titleIndex + 1, state.length),
          ];
        }
      } else {
        return state.concat({
          title: action.title,
          urls: [{ url: action.url, buy: true }],
        });
      }
    }
    case "SUCCEED": {
      return [];
    }
    default: {
      return state;
    }
  }
}

let initial = {
  active: "All",
  threads: [],
  buy: [],
};
const store = createStore(reducer);

api()
  .then((respob) => {
    let threads = [];
    let purchasedPhotos = localStorage.rdz_keys? JSON.parse(localStorage.rdz_keys):[];
    console.log(purchasedPhotos);
    for (let t of respob.threads) {
      //console.log(t.urls)
      let u = t.urls.map((element) => {
        return { url: element, buy: false };
      });
      threads.push({ title: t.title, urls: u });
    }
   // initial = { ...initial, threads };
    //console.log( threads[0].urls)
    store.dispatch({ type: "INIT", payload: {threads, purchasedPhotos} });
    //console.log(store.getState());
  })
  .catch((e) => console.log(e));

/*

function actionSearch() {
    return (dispatch) => {
      search(art_name).then(
        (art) => dispatch({ type: "SEARCH", art }),
        (err) => dispatch({ type: "ERROR", err })
      );
    };
  }*/

export default store;
//console.log(store.getState());
