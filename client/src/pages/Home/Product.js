import React from "react";

export const Product = ({p}) => <li>
  <h2>{p.name}</h2>
  <div className="fakeimg" style={{ height: 200 }}>
    Image
  </div>
  <p>
   {p.description}
  </p>
  <br />
</li>;
