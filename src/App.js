import { useState, useEffect } from "react";

// styles
import "./App.scss";

// api
import * as QIC from "./api/QIC";

// utilities
import { loadScript } from "./utilities";

// constants
import { BRAUZ_RA_PACKAGE_URL, GROUP_NUMBER } from "./constants";

function App() {
  // hooks
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const stores = QIC.getStores();
    setStores(stores);

    // 1. Import Brauz SDK
    loadScript(BRAUZ_RA_PACKAGE_URL, () => {
      // 3. Initialize Brauz service
      window.Brauz.initializeBrauzBookAStylist(GROUP_NUMBER);
      // or:
      // const { Brauz: { initializeBrauzBookAStylist = () => {} } = {} } = window;
      // initializeBrauzBookAStylist(GROUP_NUMBER);
    });
  }, []);

  // functions
  const onButtonClick = (id) => {
    // 4. Attach this function to your button(s) in step 2
    const {
      Brauz_open_book_a_stylist_dialog_with_selected_store = () => {},
    } = window;
    // the store ID from your end and store ID from our end (Brauz Command) must be the same
    Brauz_open_book_a_stylist_dialog_with_selected_store(id);
  };

  return (
    <div className="App">
      <h2>QIC x Brauz Integration</h2>

      <div className="stores-container">
        {stores.map((store, index) => {
          return (
            <div className="store-container" key={index}>
              <div className="image"></div>
              <div className="name">{store.name}</div>
              <div>{store.location}</div>
              <div>{store.opening_hours}</div>
              {/* 2. Build your own Book an Agent button(s) (HTML/CSS), you have full control on UI/UX of the button. You will be provided a function to open Book an Agent popup. */}
              <button onClick={() => onButtonClick(store.id)}>
                Book online
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
