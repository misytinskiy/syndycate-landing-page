"use client";

import { useEffect } from "react";

const IntercomMessenger = () => {
  useEffect(() => {
    window.intercomSettings = {
      app_id: "vjvfq7i6",
    };

    const script = document.createElement("script");
    script.src = "https://widget.intercom.io/widget/vjvfq7i6";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (window.Intercom) {
        window.Intercom("shutdown");
      }
    };
  }, []);

  return null;
};

export default IntercomMessenger;
